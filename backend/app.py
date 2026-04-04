from __future__ import annotations

import re
from datetime import datetime, time
from pathlib import Path
from typing import Any

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "labs_dataset_sample.csv"


def parse_price_range(value: Any) -> tuple[int | None, int | None]:
	match = re.search(r"(\d+)\s*-\s*(\d+)", str(value))
	if not match:
		return None, None
	return int(match.group(1)), int(match.group(2))


def normalize_text(value: Any) -> str:
	return re.sub(r"[^a-z0-9]+", " ", str(value).lower()).strip()


def parse_time(value: Any) -> time | None:
	try:
		return datetime.strptime(str(value), "%H:%M").time()
	except ValueError:
		return None


def is_open_now(opening_time_value: Any, closing_time_value: Any, current_time: time | None = None) -> bool:
	opening_time = parse_time(opening_time_value)
	closing_time = parse_time(closing_time_value)
	if opening_time is None or closing_time is None:
		return False

	current_time = current_time or datetime.now().time()
	if opening_time <= closing_time:
		return opening_time <= current_time <= closing_time
	return current_time >= opening_time or current_time <= closing_time


def load_labs() -> pd.DataFrame:
	if not DATASET_PATH.exists():
		raise FileNotFoundError(f"Dataset not found: {DATASET_PATH}")

	frame = pd.read_csv(DATASET_PATH).fillna("")
	numeric_columns = ["latitude", "longitude", "rating", "reviews_count"]
	for column in numeric_columns:
		frame[column] = pd.to_numeric(frame[column], errors="coerce")

	price_bounds = frame["price_range"].apply(parse_price_range)
	frame["min_price"] = price_bounds.apply(lambda item: item[0])
	frame["max_price"] = price_bounds.apply(lambda item: item[1])
	frame["tests_available_list"] = frame["tests_available"].apply(
		lambda value: [item.strip() for item in str(value).split(",") if item.strip()]
	)
	frame["home_collection_flag"] = frame["home_collection"].astype(str).str.lower().eq("yes")
	return frame


LABS_FRAME = load_labs()

app = FastAPI(title="NirogyaSathi Lab Recommendation API")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get("/")
def health_check() -> dict[str, str]:
	return {"status": "ok", "message": "Lab recommendation API is running"}


@app.get("/labs")
def get_labs(
	search: str | None = None,
	min_price: int | None = None,
	max_price: int | None = None,
	min_rating: float | None = None,
	home_collection: str | None = None,
	open_now: bool = False,
	sort_by: str = "highest_rating",
) -> dict[str, Any]:
	filtered = LABS_FRAME.copy()

	if home_collection is not None and home_collection.lower() not in {"yes", "no"}:
		home_collection = None

	if search:
		normalized_search = normalize_text(search)
		search_tokens = [token for token in normalized_search.split() if token]

		def matches_tests(value: list[str]) -> bool:
			joined_tests = normalize_text(", ".join(value))
			if normalized_search and normalized_search in joined_tests:
				return True
			return any(token in joined_tests for token in search_tokens)

		filtered = filtered[filtered["tests_available_list"].apply(matches_tests)]

	if min_price is not None:
		filtered = filtered[filtered["max_price"].fillna(-1) >= min_price]

	if max_price is not None:
		filtered = filtered[filtered["min_price"].fillna(10**9) <= max_price]

	if min_rating is not None:
		filtered = filtered[filtered["rating"].fillna(0) >= min_rating]

	if home_collection is not None:
		home_collection_value = home_collection.lower() == "yes"
		filtered = filtered[filtered["home_collection_flag"] == home_collection_value]

	if open_now:
		filtered = filtered[
			filtered.apply(
				lambda row: is_open_now(row["opening_time"], row["closing_time"]),
				axis=1,
			)
		]

	if sort_by == "lowest_price":
		filtered = filtered.sort_values(by=["min_price", "rating", "reviews_count"], ascending=[True, False, False])
	elif sort_by == "highest_rating":
		filtered = filtered.sort_values(by=["rating", "reviews_count", "min_price"], ascending=[False, False, True])
	else:
		filtered = filtered.sort_values(by=["rating", "reviews_count"], ascending=[False, False])

	results: list[dict[str, Any]] = []
	for index, (_, row) in enumerate(filtered.iterrows(), start=1):
		tests = row["tests_available_list"]
		rating_value = float(row["rating"]) if pd.notna(row["rating"]) else 0.0
		results.append(
			{
				"lab_id": int(row["lab_id"]),
				"lab_name": row["lab_name"],
				"city": row["city"],
				"rating": round(rating_value, 1),
				"reviews_count": int(row["reviews_count"]) if pd.notna(row["reviews_count"]) else 0,
				"price_range": row["price_range"],
				"min_price": int(row["min_price"]) if pd.notna(row["min_price"]) else None,
				"max_price": int(row["max_price"]) if pd.notna(row["max_price"]) else None,
				"tests_available": tests,
				"home_collection": bool(row["home_collection_flag"]),
				"opening_time": row["opening_time"],
				"closing_time": row["closing_time"],
				"distance_km": round(1.2 + (index * 0.7), 1),
				"top_rated": rating_value >= 4.5,
			}
		)

	return {
		"count": len(results),
		"sort_by": sort_by,
		"results": results,
	}
