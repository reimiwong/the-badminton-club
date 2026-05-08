import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUs";
import Team from "./pages/Team"
import News from "./pages/News"

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}
