import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col items-center gap-6">
        {/* Icon / accent */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <img
            className="h-8"
            src="/images/icons/file-exclamation-point-icon.svg"
          />
        </div>

        <h1 className="h1">Page not found</h1>

        <p className="body-lg text-muted max-w-md">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="flex gap-4 mt-4">
          <Link to="/" className="btn-primary">
            Go home
          </Link>

          <Link to="/sessions" className="btn-secondary">
            View sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
