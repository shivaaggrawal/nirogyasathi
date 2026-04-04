import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors font-medium"
          >
            <Home className="size-5" />
            Go Home
          </Link>
          <Link
            to="/doctors"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-primary/20 text-primary rounded-xl hover:bg-muted transition-colors font-medium"
          >
            <Search className="size-5" />
            Find Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}