import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeTabluarData(data: any) {
  let lines = data.split("\n");
  lines = lines.map((line) => line.trim());
  lines = lines.filter((line, index) => index !== 0);
  let ArrivalTime = [],
    BurstTime = [];

  console.log("lines", lines);

  lines.forEach((line) => {
    const [arrival, burst] = line.split(",");
    ArrivalTime.push(parseInt(arrival));
    BurstTime.push(parseInt(burst));
  });
  return { ArrivalTime, BurstTime };
}

// Arrival Time, Burst Time
// 0,4
// 1,5
// 2,2
// 3,1
// 4,6
// 6,3
