import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Landing } from "./pages/Landing";
import { SymptomChecker } from "./pages/SymptomChecker";
import { DoctorRecommendation } from "./pages/DoctorRecommendation";
import { DoctorProfile } from "./pages/DoctorProfile";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MedicalRecords } from "./pages/MedicalRecords";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "symptoms", Component: SymptomChecker },
      { path: "doctors", Component: DoctorRecommendation },
      { path: "doctors/:id", Component: DoctorProfile },
      { path: "profile", Component: UserProfile },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "records", Component: MedicalRecords },
      { path: "*", Component: NotFound },
    ],
  },
]);