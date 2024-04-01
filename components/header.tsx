"use client";

import Link from "next/link";
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
  } else if (algorithm == "psanp") {
    algorithmName = "Priority";
    mode = "Non-Preemptive";
    criteria = "Priority";
  } else if (algorithm === "psap") {
    algorithmName = "Priority";
    mode = "Preemptive";
    criteria = "Priority";
  } else if (algorithm === "rr") {
    algorithmName = "Round Robin";
    mode = "Preemptive";
    criteria = "Time Quantum + Arrival Time";
  } else if (algorithm === "hrrn") {
    algorithmName = "Highest Response Ratio Next";
    mode = "Non-Preemptive";
    criteria = "Response Ratio";
  }

  return (
    <>
      <div className="flex items-center mt-8 w-full mx-auto">
        <div className="text-white h-8 w-8 font-semibold ml-24">
          <Link href="/">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#ffffff"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#ffffff"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </g>
            </svg>
          </Link>
        </div>
        <div className="flex justify-evenly text-white font-custom text-xl w-full">
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
      </div>
    </>
  );
};

export default Header;
