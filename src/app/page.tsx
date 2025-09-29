import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-surface-a0 text-gray-900">
        {/* Navbar */}
        <header className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-a0">Stash</h1>
          <nav className="space-x-4">
            <Link
              href="pricing"
              className="text-primary-a0 hover:text-primary-a10"
            >
              Pricing
            </Link>
            <Link
              href="signup"
              className="px-4 py-2 rounded-lg bg-primary-a0  text-dark-a0 hover:bg-primary-a20"
            >
              Sign Up
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 py-24">
          <h2 className="text-5xl font-extrabold tracking-tight text-dark-a0">
            Your files, your <span className="text-primary-a0">Stash</span>
          </h2>
          <p className="mt-6 text-lg max-w-xl text-gray-600">
            A simple, secure, and fast way to store and share your files in the
            cloud.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="signup"
              className="px-6 py-3 rounded-lg bg-primary-a0 text-white font-medium hover:bg-primary-a20"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="px-8 py-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-primary-a10 text-xl font-semibold">
                Secure Storage
              </h3>
              <p className="mt-2 text-dark-a0/50">
                Your files are encrypted and safely stashed away.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl text-primary-a10 font-semibold">
                Access Anywhere
              </h3>
              <p className="mt-2 text-dark-a0/50">
                Use Stash from any device, anytime, anywhere.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl text-primary-a10 font-semibold">
                Fast Sharing
              </h3>
              <p className="mt-2 text-dark-a0/50">
                Share files instantly with friends or colleagues.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
