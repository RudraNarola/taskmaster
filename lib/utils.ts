import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeTabluarData(data: any, aglorithm: string) {
  let lines = data.split("\n");
  lines = lines.map((line) => line.trim());
  lines = lines.filter((line, index) => index !== 0);
  let ArrivalTime = [],
    BurstTime = [],
    Priority = [];

  if (aglorithm === "psanp" || aglorithm === "psap") {
    lines.forEach((line) => {
      if (line == "") return;
      const [arrival, burst, priority] = line.split(",");
      ArrivalTime.push(parseInt(arrival));
      BurstTime.push(parseInt(burst));
      Priority.push(parseInt(priority));
    });
    return { ArrivalTime, BurstTime, Priority };
  }

  lines.forEach((line) => {
    if (line == "") return;
    const [arrival, burst] = line.split(",");
    ArrivalTime.push(parseInt(arrival));
    BurstTime.push(parseInt(burst));
  });
  return { ArrivalTime, BurstTime };
}
