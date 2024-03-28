"use client";
import { useState } from "react";
import { ProcessItem } from "./process-item";
import { Button } from "./ui/button";
import { useData } from "../store/useData";

const Main = () => {
  const [value, setValue] = useState(10);

  const { data } = useData();

  let algorithm: string = "";

  // what i need is a function that will take the data and then process it
  // and then return array of values for each process item]

  if (algorithm === "fcfs") {
    // do fcfs
    const FCFS = (data: any) => {
      let AT = data["ArrivalTime"];
      let BT = data["BurstTime"];
    };
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
      <div className="grid grid-cols-4 grid-rows-8 gap-x-4 bg-gray-500/60 mt-6 mx-8 rounded-lg h-[80%] px-8 py-3 font-custom">
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
        <ProcessItem value={value} />
      </div>
    </>
  );
};

export default Main;
