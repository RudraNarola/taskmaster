import { useEffect, useState } from "react";
import { ProcessItem } from "./process-item";
import { cn } from "@/lib/utils";

export const Processes = ({ n, process }: { n: number; process: [] }) => {
  const dummyArray = Array(n).fill(null);
  const arr = Array(n).fill(0);
  const [values, setValues] = useState(arr);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const temp = process[index];
      const processId = temp[0];
      const processValue = temp[1];

      console.log(processId, processValue);

      setValues((prev) => {
        let newArr = [...prev];
        newArr[processId - 1] = processValue;
        return newArr;
      });

      index += 1;
      if (index === process.length) {
        clearInterval(interval);
      }
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-8 bg-black/30 mt-6 mx-8 rounded-lg h-[80%] px-8 py-3 font-custom",
        `grid-rows-${Math.ceil(n / 4)}`
      )}
    >
      {dummyArray.map((_, index) => (
        <ProcessItem key={index} value={values[index]} no={index} />
      ))}
    </div>
  );
};
