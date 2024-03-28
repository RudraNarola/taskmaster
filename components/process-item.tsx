"use client";
import { Progress } from "./ui/progress";

export const ProcessItem = ({ no, value }: { value: number; no: number }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-white">{`P${no + 1}`}:</div>
        <Progress value={value} className="animate-in" />
      </div>
    </>
  );
};
