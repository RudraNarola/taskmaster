import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Separator } from "./ui/separator";

const Chart = ({
  ganntChart,
  syncTime,
  RQ,
  algorithm,
  minAT,
}: {
  ganntChart: any;
  syncTime: number;
  RQ?: [];
  algorithm: string;
  minAT: number;
}) => {
  const [queue, setQueue] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);
  const [parent, animate] = useAutoAnimate({ duration: 500 });
  const [parent1, animate1] = useAutoAnimate({ duration: 500 });

  if (algorithm === "srtf" || algorithm === "rr" || algorithm === "psap") {
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

        if (RQ) {
          setReadyQueue((prev) => {
            let newArr = [...prev];
            newArr = RQ[index];
            return newArr;
          });
        }
        index += 1;

        if (index === ganntChart.length) {
          clearInterval(interval);
        }
      }, syncTime);

      return () => {
        clearInterval(interval);
      };
    }, []);
  } else {
    useEffect(() => {
      let index = 0;

      let time = +minAT;
      console.log(time);

      const interval = setInterval(() => {
        const processId = ganntChart[index][0];
        const timeTaken = ganntChart[index][1];

        time += 1;

        if (time === timeTaken) {
          setQueue((prev) => {
            let newArr = [...prev];
            newArr.push(processId);
            return newArr;
          });

          index += 1;
        }

        if (index === ganntChart.length) {
          clearInterval(interval);
        }
      }, syncTime);

      return () => {
        clearInterval(interval);
      };
    }, []);
  }
  return (
    <>
      <div className=" flex flex-col gap-6 mx-auto w-[80%] bg-black/30 text-white mt-7 rounded-lg p-6 ">
        {readyQueue && readyQueue.length > 0 ? (
          <>
            <div className="flex gap-4 w-full">
              <h3 className="text-orange-500 font-custom text-xl w-40">
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
          <h3 className="text-orange-500 font-custom text-xl w-40">
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
