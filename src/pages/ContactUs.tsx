export default function ContactUs(){
    return (
    <section>
      {/* HERO */}
      <div className="flex flex-col items-center text-center pt-18 pb-30">
        <h1 className="w-fit text-5xl font-bold">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <h3 className="w-fit mt-3 text-muted text-xl max-w-3xl">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </h3>
      </div>

      {/* MISSION */}
      <div>
        <div>
        <h2>Contact Information</h2>
<p>Visit us, call us, or drop us an email. We're here to help with any questions about our club, facilities, or programs.</p>
        </div>

      </div>



      {/* CTA */}
      <section className="bg-[linear-gradient(135deg,_#009E60_0%,_#22C55E_100%)] py-18">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 text-center">
          <h2 className="text-white text-4xl font-bold">Join Our Community</h2>

          <h3 className="text-white/90 text-xl max-w-4xl mx-auto text-center">
            Whether you're picking up a racket for the first time or training
            for competition, there's a place for you here.
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-white text-primary rounded-xl px-8 py-4 transition hover:scale-[1.02] hover:shadow-md">
              Explore Membership Options
            </button>
          </div>
        </div>
      </section>
    </section>
    );
}