let tq = 2;

let AT = [0, 1, 2, 3, 4, 6];
let BT = [4, 5, 2, 1, 6, 3];
let tempProcess = [];
let CT = [];
let TAT = [];
let WT = [];
let temp = [];
let ganntChart = [];
let order = [];

let RQ = [];
let tempRQ = [];

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

tempRQ.push(temp[0][0]);
RQ.push(tempRQ);

while (readyQueue.length > 0) {
  tempRQ = [];
  let currProcess = readyQueue.shift();
  let processId = currProcess[0];
  let timeTaken = currProcess[2];

  if (timeTaken <= tq) {
    time += timeTaken;
    timeTaken = 0;
    CT.push([processId, time]);

    while (index < temp.length && temp[index][1] <= time) {
      readyQueue.push(temp[index]);
      index++;
    }
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

  for (let i = 0; i < readyQueue.length; i++) {
    tempRQ.push(readyQueue[i][0]);
  }

  RQ.push(tempRQ);
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

console.log(RQ);

console.log(RQ.length, ganntChart.length, tempProcess.length);
