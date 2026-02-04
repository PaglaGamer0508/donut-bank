import React from "react";
import { Fraunces, Manrope } from "next/font/google";
import Link from "next/link";

const fraunces = Fraunces({
  weight: ["700", "800"],
  subsets: ["latin"],
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const page: React.FC = ({}) => {
  return (
    <div
      className={`${manrope.className} mt-[74px] min-h-[calc(100vh-74px)] bg-[#f7f6f1] text-slate-900`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-20 pt-16 md:pt-24">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
            DonutBank User Guide
          </span>
          <h1
            className={`${fraunces.className} text-4xl md:text-5xl leading-tight`}
          >
            The user guide is coming soon.
          </h1>
          <p className="max-w-xl text-base md:text-lg text-slate-600">
            We are crafting a step-by-step guide to help users learn how to use
            DonutBank inside the app, from accounts to transfers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Getting Started",
              body: "Set up your DonutBank account and create your first sub-account.",
            },
            {
              title: "Move Donut Coins",
              body: "Deposit, withdraw, and send Donut Coins with confidence.",
            },
            {
              title: "Track Activity",
              body: "Review transactions and understand your balance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              <span className="mt-4 inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                Upcoming
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-600">
            Want to explore the sandbox now?
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
