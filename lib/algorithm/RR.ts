export const RR = (data: any, tq: number) => {
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
  let readyQueue = [];
  readyQueue.push(temp[index]);
  index++;

  while (readyQueue.length > 0) {
    let currProcess = readyQueue.shift();
    let processId = currProcess[0];
    let timeTaken = currProcess[2];

    if (timeTaken <= tq) {
      // order.push(processId);
      time += timeTaken;
      timeTaken = 0;
      CT.push([processId, time]);
    } else {
      timeTaken -= tq;
      time += tq;
      while (index < temp.length && temp[index][1] <= time) {
        readyQueue.push(temp[index]);
        index++;
      }
      readyQueue.push([processId, currProcess[1], timeTaken]);
    }

    let totalTime = BT[processId - 1];
    tempProcess.push([processId, ((totalTime - timeTaken) * 100) / totalTime]);

    ganntChart.push([processId, time]);
  }

  CT.sort((a, b) => {
    return a[0] - b[0];
  });

  let newCT = [];
  let newOrder = [];

  for (let i = 0; i < temp.length; i++) {
    order.push(CT[i][0]);
    newCT.push(CT[i][1]);
  }

  for (let i = 0; i < temp.length; i++) {
    TAT.push(newCT[i] - temp[i][1]);
    WT.push(TAT[i] - temp[i][2]);
  }

  return {
    process: tempProcess,
    TAT,
    WT,
    CT: newCT,
    AT,
    BT,
    ganntChart,
    order,
  };
};
