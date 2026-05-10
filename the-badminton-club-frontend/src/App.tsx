import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SessionsPage from "./pages/Sessions";
import ContactUs from "./pages/ContactUs";
import Team from "./pages/Team";
import News from "./pages/News";
import ScrollToTop from "./utils/ScrollToTop";
import SignIn from "./pages/SignIn"
import SessionDetail from "./pages/SessionsDetail";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/sessions/:id" element={<SessionDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}