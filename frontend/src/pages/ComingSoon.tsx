import { Link } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { FiClock } from "react-icons/fi";

interface ComingSoonProps {
  page: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ page }) => {
  const featureDescriptions: Record<string, string> = {
    Portfolio:
      "See how your investments are performing with our tracking tools.",
    Settings: "Manage your account preferences and security settings.",
  };

  const description =
    featureDescriptions[page] ||
    "This feature is in development and coming soon.";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header page={page} />

        <main className="flex-grow p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              <div className="bg-teal-600 p-6 text-white">
                <div className="flex justify-center mb-3">
                  <FiClock className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {page} Coming Soon
                </h2>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6 text-center">{description}</p>

                <div className="border-t border-b border-gray-200 py-6 my-6">
                  <p className="text-sm text-gray-600">
                    We're currently building the {page} feature and expect to
                    launch it in the next update. Thanks for your patience.
                  </p>
                </div>

                <div className="text-center mt-8">
                  <Link
                    to="/"
                    className="inline-block bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
