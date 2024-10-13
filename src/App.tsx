// src/App.tsx

import React, { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./components/common/Loading";
import Layout from "./pages/Layout";
import { useAppContext } from "./context/AppContext";
import SlowLoader from "./components/SlowLoader";
import { appHealth } from "./apis";
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
  const [mounted, setMounted] = useState<boolean>(false);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const testAppHealth = async () => {
      try {
        await appHealth();
      } catch (e) {
        console.log(e);
        dispatch({ type: "SET_APP_SETUP", payload: true });
      } finally {
        setMounted(true);
      }
    };
    testAppHealth();
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        {!state.appSetup && mounted ? (
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
        ) : (
          <SlowLoader />
        )}
      </Suspense>
    </Router>
  );
};

export default App;
