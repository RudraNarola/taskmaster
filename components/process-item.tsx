"use client";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

export const ProcessItem = ({ value }: { value: number }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-white">P1:</div>
        <Progress value={value} className="" />
      </div>
    </>
  );
};
