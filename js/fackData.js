const sendCountData = {
  normalCount: 80,
  snapCount: 20,
  abnormalCount: 5,
};

const averageTimeData = {
  orderWithCar: 33,
  carWithLoad: 180,
  unload: 120,
  loadRecovery: 133,
  unloadRecovery: 244,
};

const personalData = {
  principal: 5,
  guard: 6,
  dispatch: 20,
  finance: 3,
  driver: 36,
  toolCenter: 15,
  uninstall: 26,
  recycle: 10,
};

const totalSendData = {
  totalTount: 368082,
};

const baseData = {
  onTheWay: 32,
  numOfTrip: 65,
  orderToday: 100,
};

const sendStateData = [
  {
    orderNum: "LNT01223548",
    usageTime: 135, //分鐘
    fullLoad: 50,
  },
  {
    orderNum: "LNT01752246",
    usageTime: 50, //分鐘
    fullLoad: 80,
  },
  {
    orderNum: "LNT04248525",
    usageTime: 155, //分鐘
    fullLoad: 20,
  },
];

const monthSendCount = [
  { name: "1", y: 27 },
  { name: "2", y: 28 },
  { name: "3", y: 21 },
  { name: "4", y: 34 },
  { name: "5", y: 29 },
  { name: "6", y: 28 },
  { name: "7", y: 45 },
  { name: "8", y: 51 },
  { name: "9", y: 39 },
  { name: "10", y: 60 },
  { name: "11", y: 28 },
  { name: "12", y: 32 },
  { name: "13", y: 27 },
  { name: "14", y: 28 },
  { name: "15", y: 21 },
  { name: "16", y: 34 },
  { name: "17", y: 45 },
  { name: "18", y: 51 },
  { name: "19", y: 39 },
  { name: "20", y: 60 },
  { name: "21", y: 28 },
  { name: "22", y: 32 },
  { name: "23", y: 29 },
  { name: "24", y: 28 },
];

const mapData = [
  {
    lat: 25.054740068580298,
    lng: 121.3670690732039,
    start: "配件A場",
    end: "A公司",
    fullLoad: "95%",
    useTime: "2小時15分",
    no: "ZC202212091718",
  },
  {
    lat: 25.05135303408112,
    lng: 121.359102487282,
    start: "配件B場",
    end: "B公司",
    fullLoad: "85%",
    useTime: "1小時15分",
    no: "ZC202212091818",
  },
];

const todaySend = [
  {
    name: 'A廠',
    y: 15
  },
  {
    name: 'B廠',
    y: 10
  },
  {
    name: 'AC廠',
    y: 17
  }
]

// const workTimeData = [
//   { name: 'work', x:"星期一", y: 7, stack:1 },
//   { name: 'work', x:"星期二", y: 8, stack:1 },
//   { name: 'work', x:"星期三", y: 2, stack:1 },
//   { name: 'work', x:"星期四", y: 4, stack:1 },
//   { name: 'work', x:"星期五", y: 9, stack:1 },
//   { name: 'work', x:"星期六", y: 8, stack:1 },
//   { name: 'work', x:"星期日", y: 5, stack:1 },
//   { name: 'standard', x:"星期一", y: 7, stack:2 },
//   { name: 'standard', x:"星期二", y: 8, stack:2 },
//   { name: 'standard', x:"星期三", y: 2, stack:2 },
//   { name: 'standard', x:"星期四", y: 4, stack:2 },
//   { name: 'standard', x:"星期五", y: 9, stack:2 },
//   { name: 'standard', x:"星期六", y: 8, stack:2 },
//   { name: 'standard', x:"星期日", y: 5, stack:2 },
//   { name: 'nowork', x:"星期一", y: 7, stack:1 },
//   { name: 'nowork', x:"星期二", y: 8, stack:1 },
//   { name: 'nowork', x:"星期三", y: 2, stack:1 },
//   { name: 'nowork', x:"星期四", y: 4, stack:1 },
//   { name: 'nowork', x:"星期五", y: 9, stack:1 },
//   { name: 'nowork', x:"星期六", y: 8, stack:1 },
//   { name: 'nowork', x:"星期日", y: 5, stack:1 },
// ];
