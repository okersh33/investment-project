import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";

export const Sidebar = () => {
  const userAuth = useUserAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="bg-teal-700 w-64 min-h-screen flex-shrink-0 sticky top-0">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold">Ancore</h2>
        </div>

        <nav className="space-y-2 flex-grow">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-md ${
              currentPath === "/"
                ? "text-white bg-teal-800 font-medium"
                : "text-teal-100 hover:bg-teal-800"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/invest"
            className={`block px-4 py-2 rounded-md ${
              currentPath === "/invest"
                ? "text-white bg-teal-800 font-medium"
                : "text-teal-100 hover:bg-teal-800"
            }`}
          >
            Invest
          </Link>
          <Link
            to="/portfolio"
            className={`block px-4 py-2 rounded-md ${
              currentPath === "/portfolio"
                ? "text-white bg-teal-800 font-medium"
                : "text-teal-100 hover:bg-teal-800"
            }`}
          >
            Portfolio
          </Link>
          <Link
            to="/settings"
            className={`block px-4 py-2 rounded-md ${
              currentPath === "/settings"
                ? "text-white bg-teal-800 font-medium"
                : "text-teal-100 hover:bg-teal-800"
            }`}
          >
            Settings
          </Link>
        </nav>

        <div className="mt-auto">
          <button
            onClick={userAuth.logout}
            className="w-full px-4 py-2 rounded-md text-teal-100 hover:bg-teal-800 text-left cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};
