import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/booking" element={<div>Booking</div>} />
      <Route path="/coaches" element={<div>Coaches</div>} />
      <Route path="/news" element={<div>News</div>} />
      <Route path="/membership" element={<div>Membership</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
    </Routes>
  );
}