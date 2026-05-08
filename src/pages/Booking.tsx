export default function Booking() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md flex flex-col items-center gap-6">

        {/* ICON */}
        <div className="bg-primary rounded-2xl p-3 shadow-md">
          <img src="/images/icons/lock-icon.svg" className="w-9 h-9" />
        </div>

        {/* TEXT */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Sign in to book
          </h1>

          <p className="text-muted text-sm sm:text-base">
            Access your booking dashboard and reserve court time
          </p>
        </div>

        {/* FORM */}
        <form
          className="
            w-full
            bg-white
            flex flex-col gap-4
            p-6 sm:p-8
            rounded-xl

            shadow-[0_8px_25px_rgba(0,0,0,0.06)]
            hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]

            transition-all duration-300
          "
        >

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email Address</label>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-primary">
              <img src="/images/icons/login-mail-icon.svg" className="w-4 h-4 opacity-60" />
              <input
                type="email"
                placeholder="you@example.com"
                className="outline-none flex-1"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-primary">
              <img src="/images/icons/login-lock-icon.svg" className="w-4 h-4 opacity-60" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm mt-1 gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              <span>Remember me</span>
            </label>

            <a href="#" className="text-primary hover:underline">
              Forgot password
            </a>
          </div>

          {/* BUTTON */}
          <button
            className="
              bg-primary text-white w-full rounded-lg py-2 font-medium

              transition-all duration-200
              hover:opacity-90
              hover:-translate-y-0.5
              active:scale-[0.98]
            "
          >
            Sign in
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-sm text-black/40 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center">
          <span>Don't have an account?</span>

          <a
            href="#"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <img src="/images/icons/login-person-icon.svg" className="w-4 h-4" />
            Create account
          </a>
        </div>

      </div>
    </div>
  );
}