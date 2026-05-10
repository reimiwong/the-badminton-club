// src/pages/BookingSuccess.tsx
import { useNavigate, useLocation } from "react-router-dom";

interface BookingSuccessState {
  sessionTitle: string;
  date: string;        // ISO string
  startTime: string;   // e.g., "18:00"
  endTime: string;     // e.g., "19:30"
  location: string;    // e.g., "Court 1-2"
  totalPaid: number;   // e.g., 25
}

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as BookingSuccessState | undefined;

  if (!state) return <p className="p-6">No booking information available.</p>;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-32 pb-20 px-6">
      <div className="flex flex-col items-center gap-4">
        {/* Check Icon */}
        <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center">
          <img src="/images/icons/green-confirmation-icon.svg" />
            
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
        <p className="text-gray-500 text-center">
          Your session has been successfully booked
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mt-8 p-6 flex flex-col gap-4">
        {/* Session */}
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-500">Session</span>
          <span className="font-semibold">{state.sessionTitle}</span>
        </div>

        {/* Date & Time */}
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-500">Date & Time</span>
          <span className="font-semibold">{`${state.date}, ${state.startTime}-${state.endTime}`}</span>
        </div>

        {/* Location */}
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-500">Location</span>
          <span className="font-semibold">{state.location}</span>
        </div>

        {/* Total Paid */}
        <div className="flex justify-between pt-2">
          <span className="text-gray-500">Total Paid</span>
          <span className="font-semibold text-primary">£{state.totalPaid}</span>
        </div>
      </div>

      {/* Confirmation Text */}
      <div className="bg-green-50 text-primary mt-6 px-4 py-3 rounded-lg text-center max-w-md">
        A confirmation email has been sent to your registered email address with all the details.
      </div>

      {/* Back Button */}
      <button
        className="mt-6 w-full max-w-md bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}