"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Header = ({ algorithm }: { algorithm: string }) => {
  let algorithmName: string = "";
  let mode: string = "";
  let criteria: string = "";

  if (algorithm === "fcfs") {
    algorithmName = "First Come First Serve";
    mode = "Non-Preemptive";
    criteria = "Arrival Time";
  } else if (algorithm === "sjf") {
    algorithmName = "Shortest Job First";
    mode = "Non-Preemptive";
    criteria = "Burst Time";
  } else if (algorithm === "srtf") {
    algorithmName = "Shortest Remaining Time First";
    mode = "Preemptive";
    criteria = "Burst Time";
  } else if (algorithm === "psa") {
    algorithmName = "Priority";
    mode = "Preemptive";
    criteria = "Priority";
  } else if (algorithm === "rr") {
    algorithmName = "Round Robin";
    mode = "Preemptive";
    criteria = "Time Quantum + Arrival Time";
  }

  return (
    <>
      <div className="flex justify-around text-white font-custom text-xl mt-8 w-full">
        <div>
          <span className="text-orange-500">Algorithm: </span>
          {algorithmName}
        </div>
        <div>
          <span className="text-orange-500">Mode: </span>
          {mode}
        </div>
        <div>
          <span className="text-orange-500"> Criteria: </span>
          {criteria}
        </div>
      </div>
    </>
  );
};

export default Header;
