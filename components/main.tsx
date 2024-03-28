"use client";
import { useEffect, useState } from "react";
import { ProcessItem } from "./process-item";
import { Button } from "./ui/button";
import { useData } from "../store/useData";
import { FCFS } from "@/lib/algorithm/FCFS";
import { Processes } from "./processes";

const Main = ({ algorithm }: { algorithm: string }) => {
  const { data } = useData();
  const n = data["ArrivalTime"].length;

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

  return <Processes n={n} process={result.process} />;
};

export default Main;
