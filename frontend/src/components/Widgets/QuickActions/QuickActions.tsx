import { FiPlus, FiBarChart2, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <Link
            to="/invest"
            aria-label="new-investment"
            className="border rounded-lg p-4 hover:bg-gray-50 flex flex-col items-center text-center"
          >
            <FiPlus className="h-8 w-8 text-teal-500 mb-2" />
            <h3 className="font-medium mb-1">New Investment</h3>
            <p className="text-gray-600 text-sm">Add funds to your ISA</p>
          </Link>

          <Link
            to="/portfolio"
            aria-label="view-portfolio"
            className="border rounded-lg p-4 hover:bg-gray-50 flex flex-col items-center text-center"
          >
            <FiBarChart2 className="h-8 w-8 text-teal-500 mb-2" />
            <h3 className="font-medium mb-1">View Portfolio</h3>
            <p className="text-gray-600 text-sm">Track your performance</p>
          </Link>

          <Link
            to="/settings"
            aria-label="settings"
            className="border rounded-lg p-4 hover:bg-gray-50 flex flex-col items-center text-center"
          >
            <FiSettings className="h-8 w-8 text-teal-500 mb-2" />
            <h3 className="font-medium mb-1">Account Settings</h3>
            <p className="text-gray-600 text-sm">Manage your profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
