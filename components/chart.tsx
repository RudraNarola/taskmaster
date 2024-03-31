import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Chart = ({
  ganntChart,
  syncTime,
}: {
  ganntChart: [];
  syncTime: number;
}) => {
  const [queue, setQueue] = useState([]);
  const [parent, animate] = useAutoAnimate({ duration: 500 });

  useEffect(() => {
    let index = 0;
    let time = 0;

    const interval = setInterval(() => {
      time++;
      const processId = ganntChart[index][0];
      const timeTaken = ganntChart[index][1];

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

  return (
    <>
      <div className="mx-16 bg-black/30 text-white mt-6 rounded-lg  p-6 ">
        <div className="flex gap-4 w-full">
          <h3 className="text-gray-200 font-custom text-xl w-auto">
            Gannt Chart:{" "}
          </h3>
          <div className="flex flex-wrap w-full gap-y-3" ref={parent}>
            {queue.map((item, index) => (
              <span className="flex justify-center items-center border text-2xl border-gray-300 text-gray-300 px-2 py-1">{`P${item}`}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
