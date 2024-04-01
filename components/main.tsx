"use client";
import { useEffect, useState } from "react";
import { ProcessItem } from "./process-item";
import { Button } from "./ui/button";
import { useData } from "../store/useData";
import { FCFS } from "@/lib/algorithm/FCFS";
import { Processes } from "./processes";
import Chart from "./chart";
import Link from "next/link";
import { SJF } from "@/lib/algorithm/SJF";
import { PSANP } from "@/lib/algorithm/PSANP";
import { PSAP } from "@/lib/algorithm/PSAP";
import { SRTF } from "@/lib/algorithm/SRTF";
import { RR } from "@/lib/algorithm/RR";
import { HRRN } from "@/lib/algorithm/HRRN";

const TIME = 500;

const Main = ({ algorithm, tq }: { algorithm: string; tq?: number }) => {
  const { data } = useData();

  const n = data["ArrivalTime"].length;

  if (n === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-white">No data found</div>
        <Link href="/">
          <Button className="ml-4 bg-orange-500 hover:bg-orange-600">
            Go to input page
          </Button>
        </Link>
      </div>
    );
  }

  let result;

  if (algorithm === "fcfs") {
    result = FCFS(data);
  } else if (algorithm === "sjf") {
    result = SJF(data);
  } else if (algorithm === "psanp") {
    result = PSANP(data);
  } else if (algorithm === "psap") {
    result = PSAP(data);
  } else if (algorithm === "srtf") {
    result = SRTF(data);
  } else if (algorithm === "rr") {
    result = RR(data, tq);
  } else if (algorithm === "hrrn") {
    result = HRRN(data);
  }
  console.log("gantt", result.ganntChart);
  let minAT = Math.min(...data["ArrivalTime"]);
  console.log("Minimum time", minAT);

  return (
    <>
      <Processes n={n} result={result} syncTime={TIME} />
      <Chart
        ganntChart={result.ganntChart}
        syncTime={TIME}
        RQ={result.RQ}
        algorithm={algorithm}
        minAT={minAT}
      />
    </>
  );
};

export default Main;
