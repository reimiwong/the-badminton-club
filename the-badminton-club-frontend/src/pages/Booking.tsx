import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import { useAuth } from "../context/AuthContext";

interface Session {
  id: number;
  title: string;
  type: string;
  date: string;
  coach?: string | null;
  price: number;
}

// Dummy hook for authentication status
// Replace with your real auth hook or context


export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
 const { isAuthenticated } = useAuth();

  const session: Session | undefined = (location.state as { session?: Session })?.session;

  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
    }
  }, [isAuthenticated]);

  if (!session) return <p className="p-6">No session selected.</p>;

  const total = session.price;

  const handleConfirmPayment = () => {
    navigate("/booking-success", {
      state: {
        sessionTitle: session.title,
        date: new Date(session.date).toLocaleDateString(),
        startTime: new Date(session.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: new Date(new Date(session.date).getTime() + 90 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        location: "Court 1-2",
        totalPaid: session.price,
      },
    });
  };

return (
  <div className="container mx-auto max-w-[900px] bg-background px-6 pt-20 md:pt-24 pb-14 md:pb-20">
    {/* SignIn Modal */}
 

<SignInModal
  isOpen={showSignInModal && !isAuthenticated}
  onClose={() => setShowSignInModal(false)}
/>


    <div className="max-w-7xl mx-auto p-6 md:p-12">
      {/* Back Button + Heading */}
      <div className="flex flex-col mb-6 gap-8">
        <button
          className="flex items-center gap-2 text-sm text-gray-600 font-semibold hover:text-primary hover:underline transition-colors duration-200 mb-2 cursor-pointer"
          onClick={() => navigate(`/sessions/${session.id}`)}
        >
          <img className="w-4 h-4 rotate-180" src="/images/icons/green-arrow-icon.svg" alt="" />
          Back to sessions
        </button>
        <h3 className="h3">Complete Your Booking</h3>
      </div>

      {/* Form + Order Summary */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8">
        {/* PAYMENT FORM */}
        <form className="w-full rounded-3xl bg-surface border border-border p-6 sm:p-8 flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]">
  {/* Payment Header */}
  <div className="flex gap-4 items-center mb-2">
    <img
      className="p-3 bg-primary/10 rounded-xl"
      src="/images/icons/green-card-icon.svg"
      alt=""
    />
    <div>
      <h3 className="font-semibold text-lg">Payment Details</h3>
      <div className="flex items-center gap-2 text-sm text-muted">
        <img src="/images/icons/gray-lock-icon.svg" alt="" />
        <span>Secure payment processing</span>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-200 mt-6 mb-4" />

  <div className="flex flex-col flex-1 justify-between">
    {/* FORM FIELDS */}
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
          />
        </div>
      </div>
    </div>

    {/* CONFIRM BUTTON */}
    <div className="mt-8">
      <button
        type="button"
        onClick={handleConfirmPayment}
        disabled={!isAuthenticated}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-[0_10px_25px_rgba(0,158,96,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,158,96,0.35)] active:scale-[0.985] disabled:opacity-60"
      >
        {isAuthenticated ? "Confirm Payment" : "Sign in to continue"}
        <img
          src="/images/icons/right-arrow-icon.svg"
          alt=""
          className="w-4 h-4 transition-transform duration-200"
        />
      </button>
    </div>
  </div>
</form>


        {/* ORDER SUMMARY */}
        <div className="w-full max-w-[400px] rounded-3xl bg-surface border border-border p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
          <div className="flex flex-col">
            <div className="flex flex-col py-3">
              <span className="text-muted text-sm">Session</span>
              <span className="font-semibold text-base">{session.title}</span>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col py-3">
              <span className="text-muted text-sm">Date</span>
              <span className="font-semibold text-base">{new Date(session.date).toLocaleDateString()}</span>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col py-3">
              <span className="text-muted text-sm">Time</span>
              <span className="font-semibold text-base">{new Date(session.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col py-3">
              <span className="text-muted text-sm">Coach</span>
              <span className="font-semibold text-base">{session.coach || "-"}</span>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="border-t border-gray-200 mb-2" />
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">£{session.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Processing Fee</span>
              <span className="font-semibold">£0.00</span>
            </div>
            <div className="border-t border-gray-200 my-2" />
            <div className="flex justify-between py-2">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg text-green-600">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}