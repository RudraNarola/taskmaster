import { SortAsc } from "lucide-react";

// Shortest Job First Algorithm
export const SJF = (data: any) => {
  let AT = data["ArrivalTime"];
  let BT = data["BurstTime"];
  let tempProcess = [];
  let CT = [];
  let TAT = [];
  let WT = [];
  let temp = [];
  let ganntChart = [];
  let order = [];

  for (let i = 0; i < AT.length; i++) {
    temp.push([i + 1, AT[i], BT[i]]);
  }

  temp.sort((a, b) => {
    return a[1] - b[1];
  });

  let time = temp[0][1];
  let index = 0;

  let queue = [];
  while (index < temp.length || queue.length > 0) {
    while (index < temp.length && temp[index][1] <= time) {
      queue.push(temp[index]);
      index++;
    }

    // sort the queue based on burst time
    queue.sort((a, b) => {
      return a[2] - b[2];
    });

    let processId = queue[0][0];
    let timeTaken = queue[0][2];

    queue.shift();

    time += timeTaken;

    order.push(processId);
    ganntChart.push([processId, time]);

    let tempTime = timeTaken;
    let totalTime = timeTaken;
    while (tempTime > 0) {
      tempTime -= 1;
      tempProcess.push([processId, ((totalTime - tempTime) * 100) / totalTime]);
    }

    CT.push(time);
  }

  for (let i = 0; i < temp.length; i++) {
    TAT.push(CT[i] - temp[i][1]);
    WT.push(TAT[i] - temp[i][2]);
  }

  return {
    process: tempProcess,
    TAT,
    WT,
    CT,
    AT,
    BT,
    ganntChart,
    order,
  };
};
