import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container-custom text-center">
        <h1 className="text-2xl font-semibold text-dark-700 mb-4">
          404
        </h1>
        <p className="text-zinc-600 mb-8">Page not found.</p>
        <Link to="/" className="text-accent hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
