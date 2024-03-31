export const FCFS = (data: any) => {
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
  for (let i = 0; i < temp.length; i++) {
    time += temp[i][2];
    let processId = temp[i][0];
    let tempTime = temp[i][2];
    let totalTime = temp[i][2];

    ganntChart.push([processId, time]);
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
