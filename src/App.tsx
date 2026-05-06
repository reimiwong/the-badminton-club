import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/coaches" element={<div>Coaches</div>} />
        <Route path="/news" element={<div>News</div>} />
        <Route path="/membership" element={<div>Membership</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Route>
    </Routes>
  );
}
