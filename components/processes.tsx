import { useEffect, useState } from "react";
import { ProcessItem } from "./process-item";
import { cn } from "@/lib/utils";
import { TableData } from "./table-data";

export const Processes = ({
  n,
  result,
  syncTime,
}: {
  n: number;
  result: {
    process: [];
    WT: [];
    AT: [];
    TAT: [];
    CT: [];
    BT: [];
    ganntChart: [];
    order: [];
    priority?: [];
  };
  syncTime: number;
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const dummyArray = Array(n).fill(null);
  const arr = Array(n).fill(0);
  const [values, setValues] = useState(arr);

  const noOfCols = parseInt(
    Math.min(6, Math.max(2, Math.ceil(n / 6))).toString()
  );
  const noOfRows = parseInt(Math.ceil(n / 4).toString());

  console.log("process", result.process);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const temp = result.process[index];
      const processId = temp[0];
      const processValue = temp[1];

      setValues((prev) => {
        let newArr = [...prev];
        newArr[processId - 1] = processValue;
        return newArr;
      });

      index += 1;
      if (index === result.process.length) {
        setTimeout(() => {
          setIsCompleted(true);
        }, 500);
        clearInterval(interval);
      }
    }, syncTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isCompleted) {
    return (
      <>
        <TableData
          WT={result.WT}
          AT={result.AT}
          CT={result.CT}
          TAT={result.TAT}
          BT={result.BT}
          order={result.order}
          priority={result.priority}
        />
      </>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-x-8 gap-y-8  bg-black/30 mt-6 mx-16 rounded-lg px-8 py-6 font-custom"
        // `grid-rows-${Math.ceil(n / 4)}`,
        // "grid-cols-7"
        // `grid-cols-${noOfCols}`
      )}
      style={{
        gridTemplateColumns: `repeat(${noOfCols}, 1fr)`,
        gridTemplateRows: `repeat(${noOfRows}, 1fr)`,
      }}
    >
      {dummyArray.map((_, index) => (
        <ProcessItem key={index} value={values[index]} no={index} />
      ))}
    </div>
  );
};
