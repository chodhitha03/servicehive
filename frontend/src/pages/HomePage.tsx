import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/ui/ThemeToggle";

export const HomePage = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex flex-col font-sans selection:bg-gray-200">
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-gray-900 dark:bg-white text-[10px] font-bold text-white dark:text-black flex items-center justify-center">
            SH
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">ServiceHive</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login" className="text-sm font-medium text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Sign in
          </Link>
          <Link to="/register">
            <Button className="h-8 px-4 text-xs">Get started</Button>
          </Link>
        </div>
      </div>
    </header>

    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 pt-40 pb-20 text-center animate-fade-in">
        <div className="mb-8 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black px-4 py-1.5 text-xs font-medium text-gray-400">
          Introducing ServiceHive v2.0 &rarr;
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black sm:text-7xl">
          Lead management, refined.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-500 sm:text-xl">
          A purely focused command center for modern sales teams. Clean pipelines, strict follow-ups, and absolute clarity. Built for teams who value speed over clutter.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link to="/register" className="w-full sm:w-auto">
            <Button className="h-12 px-8 text-sm w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]">Start for free</Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="secondary" className="h-12 px-8 text-sm w-full sm:w-auto">
              Open workspace
            </Button>
          </Link>
        </div>

        <div className="mt-24 w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 top-1/2" />
          <div className="flex h-12 items-center border-b border-gray-200 dark:border-white/10 px-4 bg-gray-50/40">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-gray-200" />
            </div>
          </div>
          <div className="p-8 grid gap-4 text-left relative">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-40 rounded bg-gray-100 dark:bg-white/10" />
              <div className="h-8 w-24 rounded bg-gray-50 dark:bg-black" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-100 dark:border-white/5 p-4 bg-gray-50 dark:bg-black">
                <div className="h-10 w-10 rounded bg-gray-100 dark:bg-white/10" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-white/10" />
                </div>
                <div className="h-6 w-20 rounded-full bg-gray-50 dark:bg-black" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-8">
            Trusted by forward-thinking teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 opacity-50 grayscale">
            {["Acme Corp", "GlobalTech", "Quantum", "Nexus"].map((brand) => (
              <span key={brand} className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white dark:text-black">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black sm:text-4xl">Everything you need. Nothing you don't.</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-500">We stripped away the noise so you can focus on closing.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Lightning fast",
              desc: "Keyboard-centric design means you move through your pipeline without ever touching a mouse."
            },
            {
              title: "Zero clutter",
              desc: "A strictly minimalist interface that surfaces only the data you need, exactly when you need it."
            },
            {
              title: "Smart queues",
              desc: "Automatically organizes your daily tasks based on lead temperature and follow-up urgency."
            },
            {
              title: "Powerful search",
              desc: "Find any contact, note, or company instantly with our global command menu."
            },
            {
              title: "Data clarity",
              desc: "Export exactly what you see. Clean CSVs for your reporting, instantly."
            },
            {
              title: "Role access",
              desc: "Secure out of the box. Distinct permissions for reps, managers, and admins."
            }
          ].map((feature, i) => (
            <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-black">
              <div className="mb-4 h-10 w-10 rounded bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                <div className="h-4 w-4 bg-white/60 rounded-sm" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white dark:text-black">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive */}
      <section className="border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row items-center gap-16 px-6">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black sm:text-4xl">
              Stop fighting your CRM.
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-500 leading-relaxed">
              Traditional CRMs are bloated databases that require hours of training. ServiceHive is an operating system for your sales process. 
              We've opinionated the workflow so your team doesn't have to guess what to do next.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Capture leads instantly",
                "Assign ownership automatically",
                "Track every interaction seamlessly"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-900 dark:text-white dark:text-black">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-gray-100 dark:bg-white/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#0a0a0a]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square w-full max-w-md mx-auto rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl absolute inset-0 -z-10" />
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black p-2 shadow-2xl">
              <div className="rounded-lg border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-white/10">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-100 dark:bg-white/10 rounded-full" />
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center px-6 relative z-10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black sm:text-5xl">
            Ready for clarity?
          </h2>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-500">
            Join the teams that are closing faster with a strictly organized pipeline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/register">
              <Button className="h-12 px-8 text-base">Create your account</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black py-12">
      <div className="mx-auto w-full max-w-6xl px-6 grid gap-8 md:grid-cols-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 rounded-sm bg-gray-900 dark:bg-white text-[8px] font-bold text-white dark:text-black flex items-center justify-center">
              SH
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black">ServiceHive</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs">
            The minimalist lead management operating system for professional sales teams.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white dark:text-black mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <li><Link to="/register" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Features</Link></li>
            <li><Link to="/register" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Pricing</Link></li>
            <li><Link to="/register" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white dark:text-black mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ServiceHive Inc. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
);
