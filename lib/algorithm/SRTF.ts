export const SRTF = (data: any) => {
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

    time += 1;
    timeTaken -= 1;

    if (timeTaken == 0) {
      queue.shift();
      CT.push([processId, time]);
    } else {
      queue[0][2] = timeTaken;
    }

    let totalTime = BT[processId - 1];

    tempProcess.push([processId, ((totalTime - timeTaken) * 100) / totalTime]);

    ganntChart.push([processId, time]);
  }

  CT.sort((a, b) => {
    return a[0] - b[0];
  });

  let newCT = [];

  for (let i = 0; i < temp.length; i++) {
    order.push(CT[i][0]);
    newCT.push(CT[i][1]);
  }

  for (let i = 0; i < temp.length; i++) {
    TAT.push(newCT[i] - temp[i][1]);
    WT.push(TAT[i] - BT[i]);
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
