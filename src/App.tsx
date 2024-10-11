// src/App.tsx

import React, { ReactNode, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./components/common/Loading";
import Layout from "./pages/Layout";
import { useAppContext } from "./context/AppContext";
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const ProtectedPage: React.FC<{ element: ReactNode }> = ({ element }) => {
  const { state } = useAppContext();

  const isAuthenticated = Boolean(state.userDetails);

  if (isAuthenticated) return element;

  return <Navigate to="/auth" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<ProtectedPage element={<Dashboard />} />}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
