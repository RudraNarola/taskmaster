let AT = [0, 1, 2, 3, 4, 5, 6];
let BT = [4, 2, 3, 5, 1, 4, 6];
let Priority = [2, 4, 6, 10, 8, 12, 9];
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

  console.log(queue);

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
