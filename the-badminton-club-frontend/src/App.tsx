import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SessionsPage from "./pages/Session";
import ContactUs from "./pages/ContactUs";
import Team from "./pages/Team";
import News from "./pages/News";
import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/session" element={<SessionsPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  );
}