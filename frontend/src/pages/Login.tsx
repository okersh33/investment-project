import { FormEvent, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import ancoreLogo from "../assets/Ancore.png";
import { motion, AnimatePresence } from "framer-motion";
import { Feedback } from "../components/Feedback/Feedback";
import { Button } from "../components/Button/Button";

export const Login = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const userAuth = useUserAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        await userAuth.register(user);
      } else {
        await userAuth.login(user.email);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const renderTabs = () => (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        type="button"
        className={`py-2 px-4 w-1/2 text-center cursor-pointer ${
          !isRegistering
            ? "text-teal-600 border-b-2 border-teal-500 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setIsRegistering(false)}
      >
        Sign In
      </button>
      <button
        type="button"
        className={`py-2 px-4 w-1/2 text-center cursor-pointer ${
          isRegistering
            ? "text-teal-600 border-b-2 border-teal-500 font-medium"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setIsRegistering(true)}
      >
        Create Account
      </button>
    </div>
  );

  const renderLogo = () => (
    <div>
      <img src={ancoreLogo} alt="Ancore Logo" className="mx-auto mb-4 h-60" />
    </div>
  );

  const renderAuthError = () => (
    <Feedback type="error" message={userAuth.error ?? "Error logging in"} />
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {renderLogo()}
        {renderTabs()}

        <AnimatePresence mode="wait">
          <motion.div
            key={isRegistering ? "register" : "login"}
            initial={{ opacity: 0.9, x: isRegistering ? -5 : 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900"
                    placeholder="Email address"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prev) => ({
                        email: e.target.value,
                        name: prev.name,
                      }))
                    }
                  />
                </div>

                {isRegistering && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900"
                      placeholder="Full name"
                      value={user.name}
                      onChange={(e) =>
                        setUser((prev) => ({
                          email: prev.email,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={
                      isRegistering ? "new-password" : "current-password"
                    }
                    className="rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {userAuth.error && renderAuthError()}

              <div>
                <Button
                  type="submit"
                  disabled={userAuth.isLoading}
                  isLoading={userAuth.isLoading}
                  fullWidth
                >
                  {isRegistering ? "Create Account" : "Sign In"}
                </Button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
