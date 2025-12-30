import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="max-h-screen flex items-center justify-center px-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-20">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-primary  text-white px-6 py-2 rounded-md  transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
