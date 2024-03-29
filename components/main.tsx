"use client";
import { useEffect, useState } from "react";
import { ProcessItem } from "./process-item";
import { Button } from "./ui/button";
import { useData } from "../store/useData";
import { FCFS } from "@/lib/algorithm/FCFS";
import { Processes } from "./processes";
import Chart from "./chart";
import Link from "next/link";

const Main = ({ algorithm }: { algorithm: string }) => {
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
    // do sjf
  } else if (algorithm === "rr") {
    // do rr
  } else if (algorithm === "psa") {
    // do psa
  } else if (algorithm === "srtf") {
    // do srtf
  }

  return (
    <>
      <Processes n={n} result={result} />
      <Chart />
    </>
  );
};

export default Main;
