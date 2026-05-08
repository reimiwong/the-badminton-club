export default function Booking() {
  return (
    <div className="min-h-screen bg-background px-4 py-20">

      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-10">

        {/* ICON */}
        <div
          className="
            rounded-3xl bg-primary p-4
            shadow-[0_12px_35px_rgba(0,158,96,0.28)]
            transition-all duration-300
            hover:-translate-y-1
          "
        >
          <img
            src="/images/icons/lock-icon.svg"
            alt=""
            aria-hidden="true"
            className="w-10 h-10"
          />
        </div>

        {/* TEXT */}
        <div className="text-center space-y-4">
          <h1 className="h1">
            Sign in to book
          </h1>

          <p className="text-body-lg text-muted max-w-sm mx-auto">
            Access your booking dashboard, manage reservations, and reserve court time.
          </p>
        </div>

        {/* FORM */}
        <form
          className="
            w-full
            rounded-3xl
            bg-surface
            border border-border
            p-6 sm:p-8
            flex flex-col gap-5
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            transition-all duration-300
            hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]
          "
        >

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="label text-text">
              Email Address
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-xl
                border border-border
                bg-background
                px-4 py-3
                transition-all duration-200
                focus-within:border-primary
                focus-within:ring-4
                focus-within:ring-primary/10
              "
            >
              <img
                src="/images/icons/login-mail-icon.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 opacity-60"
              />

              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full bg-transparent
                  outline-none
                  text-body
                  placeholder:text-muted
                "
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="label text-text">
              Password
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-xl
                border border-border
                bg-background
                px-4 py-3
                transition-all duration-200
                focus-within:border-primary
                focus-within:ring-4
                focus-within:ring-primary/10
              "
            >
              <img
                src="/images/icons/login-lock-icon.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 opacity-60"
              />

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full bg-transparent
                  outline-none
                  text-body
                  placeholder:text-muted
                "
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between gap-4 pt-1 text-sm flex-wrap">

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4"
              />

              <span className="text-muted">
                Remember me
              </span>
            </label>

            <a
              href="#"
              className="text-primary font-medium hover:opacity-80 hover:underline"
            >
              Forgot password?
            </a>

          </div>

          {/* BUTTON */}
          <button
  className="
    mt-2
    flex items-center justify-center gap-2
    rounded-xl
    bg-primary
    px-5 py-3.5
    font-semibold text-white
    shadow-[0_10px_25px_rgba(0,158,96,0.28)]
    transition-all duration-200

    cursor-pointer

    hover:-translate-y-0.5
    hover:shadow-[0_16px_40px_rgba(0,158,96,0.35)]
    active:scale-[0.985]
  "
>
            Sign in

            <img
              src="/images/icons/right-arrow-icon.svg"
              alt=""
              aria-hidden="true"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

        </form>

        {/* FOOTER */}
        <div className="flex flex-col items-center gap-2 text-center text-sm">

          <span className="text-muted">
            Don&apos;t have an account?
          </span>

          <a
            href="#"
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-primary/10
              px-4 py-2
              text-primary font-medium
              transition-all duration-200
              hover:bg-primary/15
              hover:-translate-y-0.5
            "
          >
            <img
              src="/images/icons/login-person-icon.svg"
              alt=""
              aria-hidden="true"
              className="w-4 h-4"
            />

            Create account
          </a>

        </div>

      </div>
    </div>
  );
}