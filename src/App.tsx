// src/App.tsx

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";
import Layout from "./pages/Layout";
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
