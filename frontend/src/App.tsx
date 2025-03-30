import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserAuth } from "./hooks/useUserAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Invest } from "./pages/Invest";
import { ComingSoon } from "./pages/ComingSoon";

export const App = () => {
  const userAuth = useUserAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userAuth.user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invest"
          element={
            <ProtectedRoute>
              <Invest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <ComingSoon page="Portfolio" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ComingSoon page="Settings" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
