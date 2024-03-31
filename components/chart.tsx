import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Separator } from "./ui/separator";

const Chart = ({
  ganntChart,
  syncTime,
  RQ,
}: {
  ganntChart: [];
  syncTime: number;
  RQ?: [];
}) => {
  const [queue, setQueue] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);
  const [parent, animate] = useAutoAnimate({ duration: 500 });
  const [parent1, animate1] = useAutoAnimate({ duration: 500 });

  console.log("Ready queue", RQ);

  useEffect(() => {
    let index = 0;
    let time = 0;

    const interval = setInterval(() => {
      const processId = ganntChart[index][0];
      const timeTaken = ganntChart[index][1];

      setQueue((prev) => {
        let newArr = [...prev];
        newArr.push(processId);
        return newArr;
      });

      setReadyQueue((prev) => {
        let newArr = [...prev];
        newArr = RQ[index];
        return newArr;
      });

      index += 1;

      if (index === ganntChart.length) {
        clearInterval(interval);
      }
    }, syncTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className=" flex flex-col gap-6 mx-16 bg-black/30 text-white mt-6 rounded-lg  p-6 ">
        {readyQueue.length > 0 ? (
          <>
            <div className="flex gap-4 w-full">
              <h3 className="text-gray-200 font-custom text-xl w-auto">
                Ready Queue:{" "}
              </h3>
              <div className="flex flex-wrap w-full gap-y-3" ref={parent1}>
                {readyQueue.map((item) => (
                  <span className="flex justify-center items-center border  text-xl border-gray-300 text-gray-300 px-2.5 h-10">{`P${item}`}</span>
                ))}
              </div>
            </div>
            <Separator />
          </>
        ) : null}

        <div className="flex gap-4 w-full items-center">
          <h3 className="text-gray-200 font-custom text-xl w-auto">
            Gannt Chart:{" "}
          </h3>
          <div className="flex flex-wrap w-full gap-y-3" ref={parent}>
            {queue.map((item, index) => (
              <span className="flex justify-center items-center border  text-xl border-gray-300 text-gray-300 px-2.5 h-10">{`P${item}`}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
