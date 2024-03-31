export const PSANP = (data: any) => {
  let AT = data["ArrivalTime"];
  let BT = data["BurstTime"];
  let Priority = data["Priority"];
  let tempProcess = [];
  let CT = [];
  let TAT = [];
  let WT = [];
  let temp = [];
  let ganntChart = [];
  let order = [];

  for (let i = 0; i < AT.length; i++) {
    temp.push([i + 1, AT[i], BT[i], Priority[i]]);
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

    // sort the queue based on priority
    queue.sort((a, b) => {
      return b[3] - a[3];
    });

    let processId = queue[0][0];
    let timeTaken = queue[0][2];

    queue.shift();

    time += timeTaken;

    ganntChart.push([processId, time]);

    let tempTime = timeTaken;
    let totalTime = timeTaken;
    while (tempTime > 0) {
      tempTime -= 1;
      tempProcess.push([processId, ((totalTime - tempTime) * 100) / totalTime]);
    }

    CT.push([processId, time]);
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
    priority: Priority,
  };
};
