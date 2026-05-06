export default function Booking() {
  return (
    <div className="flex justify-center items-center m-auto mt-40 px-4">
      <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md">
        
        {/* ICON */}
        <div className="bg-primary rounded-2xl p-3 shadow-md">
          <img src="./lock-icon.svg" className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-bold text-center">
          Sign in to book
        </h1>
        <h2 className="text-center text-muted">
          Access your booking dashboard and reserve court time
        </h2>

        {/* FORM */}
        <form
          className="
            flex flex-col w-full
            bg-white gap-4 p-8 rounded-xl

            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            transition-all duration-300
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          "
        >
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email Address</label>

            <div
              className="
                flex items-center gap-2
                border rounded-lg px-3 py-2 mt-1

                transition-all
                focus-within:ring-2
                focus-within:ring-primary
                focus-within:border-transparent
              "
            >
              <img src="./login-mail-icon.svg" className="w-4 h-4 opacity-60" />
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

            <div
              className="
                flex items-center gap-2
                border rounded-lg px-3 py-2 mt-1

                transition-all
                focus-within:ring-2
                focus-within:ring-primary
                focus-within:border-transparent
              "
            >
              <img src="./login-lock-icon.svg" className="w-4 h-4 opacity-60" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center text-sm mt-1">
            <label className="flex gap-2 items-center cursor-pointer select-none">
              <input type="checkbox" className="accent-primary" />
              <span>Remember me</span>
            </label>

            <a
              href="#"
              className="text-primary hover:underline hover:opacity-80"
            >
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
              active:translate-y-0 active:scale-[0.99]
            "
          >
            Sign in
          </button>
        </form>

        {/* FOOTER */}
        <div className="flex gap-2 text-black/40 text-sm items-center">
          <p>Don't have an account?</p>

          <a
            href="#"
            className="
              flex items-center gap-1 text-primary

              hover:underline
              hover:opacity-80
            "
          >
            <img src="./login-person-icon.svg" className="w-4 h-4" />
            Create account
          </a>
        </div>
      </div>
    </div>
  );
}