import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/apiFetch";

interface Session {
  id: number;
  title: string;
  type: string;
  date: string;
  coach?: string | null;
  price: number;
}

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [touched, setTouched] = useState({
  name: false,
  number: false,
  expiry: false,
  cvv: false,
});
  const touchField = (field: keyof typeof touched) => {
  setTouched((prev) => ({ ...prev, [field]: true }));
};

  const cleanedCardNumber = cardNumber.replace(/\s/g, "");

  const isCardNameValid = cardName.trim().length >= 2;
  const isCardNumberValid = /^\d{16}$/.test(cleanedCardNumber);
const isExpiryValid = (() => {
  const match = expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
  return !!match;
})();
  const isCvvValid = /^\d{3,4}$/.test(cvv);

  const isFormValid =
    isCardNameValid && isCardNumberValid && isExpiryValid && isCvvValid;

  const session: Session | undefined = (location.state as { session?: Session })
    ?.session;

  const [showSignInModal, setShowSignInModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) throw new Error("VITE_API_URL is not defined");

  if (!session) return <p className="p-6">No session selected.</p>;

  const total = session.price;

  /* =========================
     CONFIRM BOOKING
  ========================= */

 const handleConfirmPayment = async () => {
  // 1. auth first (fast fail)
  if (!auth.isAuthenticated) {
    setShowSignInModal(true);
    return;
  }

  // 2. reveal validation errors
  setTouched({
    name: true,
    number: true,
    expiry: true,
    cvv: true,
  });

  // 3. block invalid form
  if (!isFormValid) return;

  // 4. API call
  try {
    const res = await apiFetch(
      `${API_URL}/api/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id }),
      },
      auth
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Booking failed");
      return;
    }

    navigate("/booking-success", {
      state: {
        sessionTitle: session.title,
        date: new Date(session.date).toLocaleDateString(),
        startTime: new Date(session.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: new Date(
          new Date(session.date).getTime() + 90 * 60000
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        location: "Court 1-2",
        totalPaid: session.price,
      },
    });
  } catch {
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="container mx-auto max-w-[900px] bg-background px-6 pt-20 md:pt-24 pb-14 md:pb-20">
      {/* SignIn Modal */}

      <SignInModal
        isOpen={showSignInModal && !auth.isAuthenticated}
        onClose={() => setShowSignInModal(false)}
      />

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Back Button + Heading */}
        <div className="mb-6">
          <button
            className="link flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            onClick={() => navigate("/sessions")}
          >
            <img
              className="w-4 h-4 scale-x-[-1]"
              src="/images/icons/green-arrow-icon.svg"
            />
            Back to sessions
          </button>
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
                    value={cardName}
                    onBlur={() => touchField("name")}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                  {touched.name && !isCardNameValid && (
                    <p className="text-red-500 text-sm">
                      Name must be at least 2 characters
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                    value={cardNumber}
                    onBlur={() => touchField("number")}
                    onChange={(e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 16);
  setCardNumber(value);
}}
                  />
                  {touched.number && !isCardNumberValid && (
                    <p className="text-red-500 text-sm">
                      Card number must be 16 digits
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                      value={expiry}
                      onBlur={() => touchField("expiry")}
                      onChange={(e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 4);

  if (value.length >= 3) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }

  setExpiry(value);
}}
                    />
                    {touched.expiry && !isExpiryValid && (
                      <p className="text-red-500 text-sm">
                        Invalid expiry (MM/YY)
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full rounded-xl border border-border px-4 py-3 text-body outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                      onBlur={() => touchField("cvv")}
                      value={cvv}
                      onChange={(e) =>
  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
}
                    />
                    {touched.cvv && !isCvvValid && (
                      <p className="text-red-500 text-sm">
                        CVV must be 3–4 digits
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONFIRM BUTTON */}
              <div className="mt-8">
               <button
  type="button"
  disabled={!isFormValid}
  onClick={() => {
    if (!auth.isAuthenticated) {
      setShowSignInModal(true);
    } else {
      handleConfirmPayment();
    }
  }}
  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white ..."
>
                  {auth.isAuthenticated
                    ? "Confirm Payment"
                    : "Sign in to continue"}
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
            {/* HEADER */}
            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

            {/* DETAILS */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-muted text-sm">Session</span>
                  <p className="font-semibold text-base">{session.title}</p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-muted text-sm">Date</span>
                  <p className="font-semibold text-base">
                    {new Date(session.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-muted text-sm">Time</span>
                  <p className="font-semibold text-base">
                    {new Date(session.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-muted text-sm">Coach</span>
                  <p className="font-semibold text-base">
                    {session.coach || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-6 h-px bg-border" />

            {/* PRICING */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">£{session.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Processing fee</span>
                <span className="font-medium">£0.00</span>
              </div>
            </div>

            {/* TOTAL (VISUAL EMPHASIS BLOCK) */}
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/10 p-4 flex justify-between items-center">
              <span className="font-semibold text-lg">Total</span>

              <span className="font-bold text-lg text-primary">
                £{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
