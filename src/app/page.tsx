import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import {
  ArrowRight,
  Banknote,
  Coins,
  KeyRound,
  Layers,
  Send,
  Wallet,
} from "lucide-react";
import type { CSSProperties } from "react";

const fraunces = Fraunces({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${manrope.className} relative mt-[74px] overflow-hidden bg-[#f7f6f1] text-slate-900`}
      style={
        {
          "--accent": "#22c55e",
          "--accent-soft": "#dcfce7",
          "--ink": "#0f172a",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(34,197,94,0.28)_0%,_rgba(34,197,94,0.08)_40%,_transparent_70%)] blur-2xl" />
        <div className="absolute -left-24 top-52 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.18)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(34,197,94,0.18)_0%,_transparent_70%)] blur-2xl" />
      </div>

      <main className="relative px-6 md:px-12 lg:px-20 pb-24">
        <section className="grid gap-10 pt-12 md:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6 animate-hero-in">
            <span className="w-fit rounded-full bg-[color:var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink)]">
              Dummy Payment Gateway
            </span>
            <h1
              className={`${fraunces.className} text-4xl md:text-5xl lg:text-6xl leading-tight text-[color:var(--ink)]`}
            >
              Build and test a full Donut Coin money flow with DonutBank.
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl">
              DonutBank is a sandboxed, in-app experience for creating bank
              accounts, organizing sub-accounts, and moving Donut Coins between
              people and applications, including connecting external apps with
              API keys and sub-account tokens.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:translate-y-[-1px] hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/applications"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-150 hover:border-[color:var(--accent)]"
              >
                Browse Applications
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
              <span>Bank Accounts</span>
              <span>Sub-Accounts</span>
              <span>Transactions</span>
              <span>API Keys</span>
            </div>
          </div>

          <div className="relative animate-hero-in-delay">
            <div className="absolute -right-6 top-8 hidden h-24 w-24 rounded-3xl border border-green-100/70 bg-green-100/60 shadow-xl backdrop-blur md:block animate-soft-float" />
            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  DonutBank Overview
                </p>
                <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--ink)]">
                  Live Sandbox
                </span>
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Create a bank account",
                    body: "Start with a main account and a Donut Coin balance.",
                  },
                  {
                    title: "Spin up sub-accounts",
                    body: "Create dedicated sub-accounts for teams or projects.",
                  },
                  {
                    title: "Send and receive",
                    body: "Move Donut Coins, then review every transaction.",
                  },
                  {
                    title: "Connect apps",
                    body: "Generate API keys and sub-account tokens for apps.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                <span>Donut Coins only</span>
                <span>No real money involved</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/70 p-8 shadow-lg">
            <h2
              className={`${fraunces.className} text-2xl md:text-3xl text-[color:var(--ink)]`}
            >
              A clean, professional sandbox for money workflows.
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600">
              DonutBank is a dummy payment gateway built around Donut Coins. It
              lets you try real product flows, like creating accounts, managing
              balances, and sending money, without touching real currency.
            </p>
            <p className="mt-4 text-sm md:text-base text-slate-600">
              Everything lives inside the DonutBank app: dashboard views,
              sub-accounts, transaction history, and a developer area for
              applications, API keys, and sub-account tokens.
            </p>
          </div>
          <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-white/70 to-[color:var(--accent-soft)] p-8 shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              What you can do
            </h3>
            <div className="mt-6 grid gap-4">
              {["Create a primary DonutBank account", "Deposit and withdraw Donut Coins", "Send money to saved quick-send accounts", "Track all transactions in one place"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Core Features
            </p>
            <h2
              className={`${fraunces.className} text-3xl md:text-4xl text-[color:var(--ink)]`}
            >
              Everything you need to explore the DonutBank workflow.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Bank Account Dashboard",
                description:
                  "See balances, recent activity, and quick links in one place.",
                icon: Wallet,
              },
              {
                title: "Sub-Accounts",
                description:
                  "Create focused sub-accounts with their own balances and cards.",
                icon: Layers,
              },
              {
                title: "Quick Send",
                description:
                  "Save frequent recipients and send Donut Coins faster.",
                icon: Send,
              },
              {
                title: "Deposit and Withdraw",
                description:
                  "Move Donut Coins in and out of your main balance.",
                icon: Coins,
              },
              {
                title: "Transactions",
                description:
                  "Review every transfer and drill into transaction details.",
                icon: Banknote,
              },
              {
                title: "Applications + API Keys",
                description:
                  "Create applications, manage API keys, and generate tokens.",
                icon: KeyRound,
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`group rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl animate-stagger-${
                  index + 1
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-[color:var(--ink)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-lg">
            <h2
              className={`${fraunces.className} text-2xl md:text-3xl text-[color:var(--ink)]`}
            >
              How DonutBank flows work
            </h2>
            <div className="mt-6 grid gap-4">
              {[
                "Create a bank account and view your balance",
                "Add sub-accounts for specific needs",
                "Deposit, withdraw, and send Donut Coins",
                "Track every transaction in the activity feed",
                "Create app tokens linked to sub-accounts",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--accent)] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[color:var(--ink)] p-8 text-white shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              For Developers
            </h3>
            <p
              className={`${fraunces.className} mt-4 text-2xl md:text-3xl leading-tight`}
            >
              Applications, API keys, and sub-account tokens.
            </p>
            <p className="mt-4 text-sm text-white/80">
              Create applications, add your website URL, and generate API keys.
              Users can create a sub-account token for your app, so your app can
              spend against their Donut Coin balance inside the DonutBank
              sandbox.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard/application"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
              >
                Manage Applications
              </Link>
              <Link
                href="/applications"
                className="rounded-full border border-white/50 px-5 py-2 text-sm font-semibold text-white"
              >
                Public Directory
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-white/70 bg-gradient-to-r from-white/80 via-white to-[color:var(--accent-soft)] p-8 text-center shadow-lg">
          <h2
            className={`${fraunces.className} text-2xl md:text-3xl text-[color:var(--ink)]`}
          >
            Documentation and guides are on the way.
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            We are preparing deeper walkthroughs for the DonutBank sandbox.
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Sign in to get started
          </Link>
        </section>
      </main>
    </div>
  );
}
