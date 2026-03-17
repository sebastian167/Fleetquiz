import { Suspense } from "react";
import FleetQuizGame from "@/components/FleetQuizGame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delta Fleet Quiz — Match Ship Numbers to Aircraft Types",
  description:
    "Test your Delta Air Lines fleet knowledge! Match ship numbers to their aircraft types in this timed quiz game with leaderboards. Covers 1041 aircraft across 10 types.",
  keywords: "Delta Air Lines, fleet quiz, ship numbers, aircraft types, aviation quiz, leaderboard",
};

export default function Home(): JSX.Element {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">✈️</div>
          <p className="text-white/60 animate-pulse">Loading Fleet Quiz...</p>
        </div>
      </div>
    }>
      <FleetQuizGame />
    </Suspense>
  );
}
