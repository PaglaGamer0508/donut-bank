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
            DonutBank Developer Docs
          </span>
          <h1
            className={`${fraunces.className} text-4xl md:text-5xl leading-tight`}
          >
            Developer documentation is on the way.
          </h1>
          <p className="max-w-xl text-base md:text-lg text-slate-600">
            We are preparing a full set of docs that show how to implement
            DonutBank as a dummy payment gateway in your app.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "API Reference",
              body: "Endpoints for bank accounts, sub-accounts, tokens, and transactions.",
            },
            {
              title: "Integration Guides",
              body: "Connect your app using API keys and sub-account tokens.",
            },
            {
              title: "App Implementation",
              body: "How to wire DonutBank into your checkout or spend flow.",
            },
            {
              title: "Security + Testing",
              body: "Best practices for safely testing with Donut Coins.",
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
            Want to explore now?
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
