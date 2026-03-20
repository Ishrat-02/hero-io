import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllApps from "./pages/AllApps";
import AppDetails from "./pages/AppDetails";
import Installation from "./pages/Installation";
import ErrorPage from "./pages/ErrorPage";

// Updates browser tab title per page
function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/":            "HeroIO — App Discovery Platform",
      "/apps":        "All Apps — HeroIO",
      "/installation":"My Installation — HeroIO",
    };
    document.title = titles[location.pathname] || "HeroIO";
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A1A2E",
            color: "#E2E8F0",
            border: "1px solid #2D2D4E",
          },
        }}
      />
      <PageTitle />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/apps"        element={<AllApps />} />
          <Route path="/apps/:id"    element={<AppDetails />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="*"            element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
