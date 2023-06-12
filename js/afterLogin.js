//頁面淡入效果
$(".animsition").animsition({
  inClass: "fade-in",
  outClass: "fade-out",
  inDuration: 300,
  outDuration: 1000,
  loading: false,
  loadingParentElement: "body", //animsition wrapper element
  loadingClass: "animsition-loading",
  browser: [
    "animation-duration",
    "-webkit-animation-duration",
    "-o-animation-duration",
  ],

  overlay: false,

  overlayClass: "animsition-overlay-slide",
  overlayParentElement: "body",
});

document.onreadystatechange = subSomething;

function subSomething() {
  if (document.readyState == "complete") {
    $("#loader").hide();
  }
}

$(document).ready(function () {
  star();
  sendCountToday();
  summaryBtn();
  closeSummaryBtn();
  averageTime();
  personal();
  totalSend();
  base();
  sendState();
  rowCarousel(3000, "active", 2);
  getCurrentMonth();
  downColumnChart();
  bindMap(mapData);
  searchInputWidth();
  carInfoBtn();
  closeCarInfoBtn();
  // workTimeChart();
  // logisticsSummary();
  // pieChart();
  // todaySendColumnChart();
  // monthSendChartAreaChart();
});

//底圖星空
function star() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  const hue = 217;
  const stars = [];
  let count = 0;
  const maxStars = 1300; //星星数量

  const canvas2 = document.createElement("canvas");
  const ctx2 = canvas2.getContext("2d");
  canvas2.width = 100;
  canvas2.height = 100;
  const half = canvas2.width / 2;
  const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, "#CCC");
  gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
  gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
  gradient2.addColorStop(1, "transparent");

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

  // End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      const hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    const max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
  }

  let Star = function () {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 1000000;
    //星星移动速度
    this.alpha = random(2, 10) / 1000;

    count++;
    stars[count] = this;
  };

  Star.prototype.draw = function () {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    const twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  };

  for (var i = 0; i < maxStars; i++) {
    new Star();
  }

  function animation() {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.5; //尾巴
    ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }

    window.requestAnimationFrame(animation);
  }

  animation();
}

//右上時間
function getCurrentTime() {
  moment.locale("zh-tw");
  const now = moment().format("YYYY-MM-DD dddd HH:mm:ss");
  $("#currentTime").html(now);
}
setInterval(getCurrentTime, 1000);

//月運單量統計圖-月份
function getCurrentMonth() {
  moment.locale("zh-tw");
  const mouth = moment().format(" (YYYY年MM月)");
  $("#currentMonth").html(mouth);
}

//今日運單數量
function sendCountToday() {
  const normalCount = sendCountData.normalCount;
  const snapCount = sendCountData.snapCount;
  const abnormalCount = sendCountData.abnormalCount;
  $(".normalCount").html(normalCount + "單");
  $(".snapCount").html(snapCount + "單");
  $(".abnormalCount").html(abnormalCount + "單");

  const sum = normalCount + snapCount + abnormalCount;
  const normalCountMath = Math.round((normalCount / sum) * 100);
  const snapCountMath = Math.round((snapCount / sum) * 100);
  const abnormalCountMath = Math.round((abnormalCount / sum) * 100);

  $(".normalPercent").html(normalCountMath + "%");
  $(".snapPercent").html(snapCountMath + "%");
  $(".abnormalPercent").html(abnormalCountMath + "%");

  $(".normalBar > span")
    .width(normalCountMath + "%")
    .css("background-color", "#1eb6fe");
  $(".snapBar > span")
    .width(snapCountMath + "%")
    .css("background-color", "#ffd220");
  $(".abnormalBar > span")
    .width(abnormalCountMath + "%")
    .css("background-color", "#FF0E0D");
}

//各階段平均用時統計
function averageTime() {
  const orderWithCar = Math.round(averageTimeData.orderWithCar / 60);
  const carWithLoad = Math.round(averageTimeData.carWithLoad / 60);
  const unload = Math.round(averageTimeData.unload / 60);
  const loadRecovery = Math.round(averageTimeData.loadRecovery / 60);
  const unloadRecovery = Math.round(averageTimeData.unloadRecovery / 60);

  $(".orderWithCarCount").html(orderWithCar);
  $(".orderWithCarUnit").html("分鐘");
  $(".carWithLoadCount").html(carWithLoad);
  $(".carWithLoadUnit").html("分鐘");
  $(".unloadCount").html(unload);
  $(".unloadUnit").html("分鐘");
  $(".loadRecoveryCount").html(loadRecovery);
  $(".loadRecoveryUnit").html("分鐘");
  $(".unloadRecoveryCount").html(unloadRecovery);
  $(".unloadRecoveryUnit").html("分鐘");
}

//人員信息
function personal() {
  $(".principalCount").html(personalData.principal + " 人");
  $(".guardCount").html(personalData.guard + " 人");
  $(".dispatchCount").html(personalData.dispatch + " 人");
  $(".financeCount").html(personalData.finance + " 人");
  $(".driverCount").html(personalData.driver + " 人");
  $(".toolCenterCount").html(personalData.toolCenter + " 人");
  $(".uninstallCount").html(personalData.uninstall + " 人");
  $(".recycleCount").html(personalData.recycle + " 人");
}

//總計運單數
function totalSend() {
  $(".totalNum").attr("total", totalSendData.totalTount);

  totalNum($(".totalNum"), 1000);
}

//基本信息
function base() {
  $(".onTheWay > .circle > span").attr("total", baseData.onTheWay);
  $(".numOfTrip > .circle > span").attr("total", baseData.numOfTrip);
  $(".orderToday > .circle > span").attr("total", baseData.orderToday);
  // console.log(".onTheWay =", $(".onTheWay > .circle > span"));

  totalNum($(".onTheWay > .circle > span"), 1);
  totalNum($(".numOfTrip > .circle > span"), 1);
  totalNum($(".orderToday > .circle > span"), 1);
}

//動態數字
function totalNum(obj, speed) {
  var singalNum = 0;
  var timer;
  var totalNum = obj.attr("total");

  if (totalNum) {
    timer = setInterval(function () {
      singalNum += speed;
      if (singalNum >= totalNum) {
        singalNum = totalNum;
        clearInterval(timer);
      }
      obj.html(singalNum);
    }, 1);
  }
}

//運單狀態-動態長li
function sendState() {
  sendStateData.forEach((item) => {
    const cloneLi = $("#rowCarousel > ul > li")
      .eq(0)
      .clone()
      .appendTo($("#rowCarousel > ul"))
      .removeClass("d-none");
    cloneLi.find(".orderNum").html(item.orderNum);

    const hour = Math.trunc(item.usageTime / 60) + "小時";
    const min = (item.usageTime % 60) + "分";
    const marge = hour + min;
    cloneLi.find(".usageTime").html(marge);

    if (item.fullLoad >= 70) {
      // console.log("item.fullLoad >= 70 =", item.fullLoad);
      cloneLi
        .find(".percentBar > span")
        .width(item.fullLoad + "%")
        .css("background-color", "#32ffc7");
      cloneLi
        .find(".percentNum")
        .html(item.fullLoad + "%")
        .css("color", "#32ffc7");
    } else if (item.fullLoad < 70 && item.fullLoad >= 30) {
      // console.log("item.fullLoad < 70 && item.fullLoad >= 30 =", item.fullLoad);
      cloneLi
        .find(".percentBar > span")
        .width(item.fullLoad + "%")
        .css("background-color", "#1eb6fe");
      cloneLi
        .find(".percentNum")
        .html(item.fullLoad + "%")
        .css("color", "#1eb6fe");
    } else {
      // console.log("else =", item.fullLoad);
      cloneLi
        .find(".percentBar > span")
        .width(item.fullLoad + "%")
        .css("background-color", "#ff0e0d");
      cloneLi
        .find(".percentNum")
        .html(item.fullLoad + "%")
        .css("color", "#ff0e0d");
    }
  });
}

//行輪播
function rowCarousel(time, active, num) {
  // console.log("this =", $(this))
  const carouselUl = $("#rowCarousel > ul");
  const firstCarouselUl = carouselUl.eq(0);
  const ulHeight = carouselUl.height();
  let ulChildHeight = carouselUl.children().eq(1).height();
  const ulChildHeightTemp = ulChildHeight;
  // const carouselUlTime = time
  let carouselNum = num;

  firstCarouselUl.clone().insertAfter(firstCarouselUl);

  const carouselLi = carouselUl.find("li");
  // console.log("carouselLi =", carouselLi);
  // if (carouselLi.attr("class") != "d-none") {
  // console.log("carouselLi.eq(carouselNum) =", carouselLi.eq(carouselNum));

  carouselLi.eq(carouselNum).addClass(active);

  let timeId = setInterval(up, time);

  $("#rowCarousel").hover(
    function () {
      clearInterval(timeId);
    },
    function () {
      timeId = setInterval(up, time);
    }
  );

  function up() {
    // console.log("up() =", true);
    firstCarouselUl.animate({ marginTop: "-" + ulChildHeight });
    carouselLi.removeClass(active);
    carouselNum += 1;
    carouselLi.eq(carouselNum).addClass(active);
    // console.log("ulHeight =", ulHeight);
    // console.log("ulChildHeight =", ulChildHeight);
    if (ulHeight == ulChildHeight) {
      firstCarouselUl.animate(
        { marginTop: "-" + ulChildHeight },
        "normal",
        over
      );
    } else {
      ulChildHeight += ulChildHeightTemp;
    }
  }
  function over() {
    firstCarouselUl.css("margin-top", 0);
    ulChildHeight = ulChildHeightTemp;
    carouselNum = 2;
    carouselLi.removeClass(active);
    carouselLi.eq(carouselNum).addClass(active);
  }
  // }
}

//月運單量統計圖chart
function downColumnChart() {
  Highcharts.chart("downColumnChart", {
    chart: {
      type: "column",
      backgroundColor: "rgba(0, 0, 0, 0)",
      height: "27%",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: [
      {
        type: "category",
        crosshair: true,
        labels: {
          style: {
            color: "#ffffff",
          },
        },
      },
    ],
    yAxis: [
      {
        labels: {
          style: {
            color: "#ffffff",
          },
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 0,
      },
    ],
    tooltip: {
      shared: true,
      pointFormat: "本月{point.name}號運單數：{point.y}",
    },
    series: [
      {
        data: monthSendCount,
        color: {
          linearGradient: {
            x1: 1,
            x2: 1,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#397DD0"],
            [1, "#52F9FD"],
          ],
        },
        borderColor: "none",
        borderRadius: "3%",
      },
    ],
  });
}

//地圖
function bindMap(data) {
  const greenIcon = L.icon({
    iconUrl: "../img/s_ico4.png", //設定 icon 圖片路徑
    //shadowUrl:  'images/marker-icon.png', // 設定陰影圖片路徑
    // iconUrl: '<i class="fa-solid fa-location-dot"></i>',

    iconSize: [40, 30], // 資料為陣列，設定寬度與高度
    iconAnchor: [20, 20], // 資料為陣列，設定 icon 的 X 軸與 Y 軸偏移量
    shadowSize: [50, 64], // 資料為陣列，設定陰影圖片的寬度與高度
    shadowAnchor: [4, 62], // 資料為陣列，設定陰影圖片的 X 軸與 Y 軸偏移量
    popupAnchor: [0, -20], // 資料為陣列，設定彈跳視窗的 X 軸與 Y 軸偏移量
    className: "iconDot", //自定義
  });

  //設定地圖中心和放大級別
  let center = [25.054740068580298, 121.36706907320396]; //[51.505, -0.09];
  const map = L.map("stateMap", { zoomControl: false }).setView(center, 15);

  //載入圖資
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className: "map-tiles",
  }).addTo(map);

  for (let i = 0; i < data.length; i++) {
    center = [data[i].lat, data[i].lng];
    L.marker(center, { icon: greenIcon })
      .addTo(map)
      .bindPopup(
        data[i].no +
          "<br/>起點：" +
          data[i].start +
          "<br/>終點：" +
          data[i].end +
          "<br/>滿載率：" +
          data[i].fullLoad +
          "<br/>已使用時間：" +
          data[i].useTime,
        { className: "statePopup" }
      );
  }

  const searchLayer = L.layerGroup().addTo(map);
  //... adding data in searchLayer ...
  map.addControl(
    new L.Control.Search({
      layer: searchLayer,
      position: "topright",
      initial: false,
      textPlaceholder: "請搜尋車輛",
      marker: false,
    })
  );

  setInterval(() => {
    map.invalidateSize();
  }, 500);
}

//改變搜尋框長度
function searchInputWidth() {
  $("#searchtext5").attr("size", 8);
}

//展開物流匯總看板頁面
function summaryBtn() {
  $(".summaryBtn").click(function (e) {
    e.preventDefault();
    console.log("summaryBtn");
    pieChart();
    todaySendColumnChart();
    monthSendChartAreaChart();
    summaryPieChartLabel()
    $(".filterbg").show();
    $(".summary").show();
    $(".summary").width("3px");
    $(".summary").animate({ height: "86vh" }, 400, function () {
      $(".summary").animate({ width: "80%" }, 400);
    });

    setTimeout(function () {
      pieChart();
      todaySendColumnChart();
      monthSendChartAreaChart();
      summaryPieChartLabel()
      $(".summaryBox").show();
      $(".summaryClose").css("display", "block");
    }, 800);
  });
}

//收合物流匯總看板頁面
function closeSummaryBtn() {
  $(".summary > .summaryClose").click(function (e) {
    e.preventDefault();
    console.log("closeCarInfoBtn");
    $(".summaryClose").css("display", "none");
    $(".summaryBox").hide();

    $(".summary").animate({ width: "3px" }, 400, function () {
      $(".summary").animate({ height: 0 }, 400);
    });
    setTimeout(function () {
      $(".filterbg").hide();
      $(".summary").hide();
      $(".summary").width(0);
    }, 800);
  });
}

//展開車輛資訊頁面
function carInfoBtn() {
  $(".carInfoBtn").click(function (e) {
    e.preventDefault();
    console.log("carInfoBtn");
    workTimeChart();
    calcWidth();
    $(".filterbg").show();
    $(".carInfo").show();
    $(".carInfo").width("3px");
    $(".carInfo").animate({ height: "86vh" }, 400, function () {
      $(".carInfo").animate({ width: "80%" }, 400);
    });

    setTimeout(function () {
      workTimeChart();
      calcWidth();
      $(".infoBox").show();
      $(".carClose").css("display", "block");
    }, 800);
  });
}

//收合車輛資訊頁面
function closeCarInfoBtn() {
  $(".carInfo > .carClose").click(function (e) {
    e.preventDefault();
    console.log("closeCarInfoBtn");
    $(".carClose").css("display", "none");
    $(".infoBox").hide();

    $(".carInfo").animate({ width: "3px" }, 400, function () {
      $(".carInfo").animate({ height: 0 }, 400);
    });
    setTimeout(function () {
      $(".filterbg").hide();
      $(".carInfo").hide();
      $(".carInfo").width(0);
    }, 800);
  });
}

//工時chart
function workTimeChart() {
  Highcharts.chart("timeChart", {
    chart: {
      type: "bar",
      backgroundColor: "#061F3E",
      height: "45%",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
      labels: {
        style: {
          color: "#ffffff",
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: "#ffffff",
        },
      },
      title: {
        enabled: false,
      },
      ceiling: 24,
      gridLineColor: "#1f3652",
      lineWidth: 1,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        borderColor: "none",
      },
    },
    series: [
      {
        name: "work",
        data: [5, 3, 4, 7, 2, 7, 5],
        stack: 1,
        color: "#32FFC7",
      },
      {
        name: "nowork",
        data: [5, 2, 3, 3, 1, 3, 0],
        stack: 1,
        color: "#1F3652",
      },
      {
        name: "standard",
        data: [3, 4, 4, 2, 5, 4, 8],
        stack: 0,
        color: "#1DD0FD",
      },
      {
        name: "work",
        data: [5, 3, 4, 7, 2, 0, 0],
        stack: 1,
        color: "#32FFC7",
      },
      {
        name: "nowork",
        data: [5, 3, 4, 7, 2, 3, 7],
        stack: 1,
        color: "#1F3652",
      },
    ],
  });
}

//
function calcWidth() {
  console.log(
    "$('#timeChart .highcharts-plot-background')",
    $("#timeChart .highcharts-root > .highcharts-plot-background").attr(
      "height"
    )
  );
  const barHeight = $(
    "#timeChart .highcharts-root > .highcharts-plot-background"
  ).attr("height");

  $(".totalTable > .totalData").css("height", barHeight);
}

//改變PieChart label color
function summaryPieChartLabel() {
  console.log("logisticsSummary");
  $(".highcharts-data-labels > .highcharts-data-label-color-0 > text").addClass('nowork')
}

//圓形進度條(駕駛、車輛、單量)chart
function pieChart() {
  const pieChartOption = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "rgba(0, 0, 0, 0)",
      // height: "50%",
      margin: [0, 0, 0, 0],
    },
    credits: {
      enabled: false,
    },
    title: {
      align: "center",
      verticalAlign: "middle",
      style: {
        color: "#ffffff",
        fontWeight: "bold",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontWeight: "bold",
            fontSize: "2rem",
          },
        },
        startAngle: 0,
        endAngle: 360,
        center: ["50%", "50%"],
        size: "50%",
        borderWidth: 0,
      },
    },
  };

  Highcharts.chart(
    "driversChart",
    Highcharts.merge(pieChartOption, {
      title: {
        text: "Browser<br>shares<br>January<br>2022",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            style: {
              color: "#ffd220",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "90%",
          data: [
            {
              color: "#11284E",
              y: 75,
            },
            {
              color: "#ffd220",
              y: 5,
            },
          ],
        },
      ],
    })
  );

  Highcharts.chart(
    "carsChart",
    Highcharts.merge(pieChartOption, {
      title: {
        text: "Browser<br>shares<br>January<br>2022",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            style: {
              color: "#32ffc7",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "90%",
          data: [
            {
              color: "#11284E",
              y: 55,
            },
            {
              color: "#32ffc7",
              y: 45,
            },
          ],
        },
      ],
    })
  );

  Highcharts.chart(
    "sendsChart",
    Highcharts.merge(pieChartOption, {
      title: {
        text: "Browser<br>shares<br>January<br>2022",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            style: {
              color: "#1eb6fe",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "90%",
          data: [
            {
              color: "#11284E",
              y: 25,
            },
            {
              color: "#1eb6fe",
              y: 75,
            },
          ],
        },
      ],
    })
  );
}

//今日各廠運單chart
function todaySendColumnChart() {
  Highcharts.chart("todaySendChart", {
    chart: {
      type: "column",
      backgroundColor: "rgba(0, 0, 0, 0)",
      // height: "48%",
      // width: '65%',
      margin: [10, 50, 150, 50],
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: [
      {
        type: "category",
        crosshair: true,
        labels: {
          style: {
            color: "#ffffff",
          },
        },
      },
    ],
    yAxis: [
      {
        labels: {
          style: {
            color: "#ffffff",
          },
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 1,
        lineColor: "#ffffff",
      },
    ],
    tooltip: {
      shared: true,
      pointFormat: "本月{point.name}號運單數：{point.y}",
    },
    series: [
      {
        data: todaySend,
        color: {
          linearGradient: {
            x1: 1,
            x2: 1,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#397DD0"],
            [1, "#52F9FD"],
          ],
        },
        borderColor: "none",
      },
    ],
  });
}

//本月運單統計chart
function monthSendChartAreaChart() {
  Highcharts.chart("monthSendChart", {
    chart: {
      type: "area",
      backgroundColor: "rgba(0, 0, 0, 0)",
      // height: "48%",
      // width: '65%',
      margin: [10, 50, 150, 50],
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        },
      },
      accessibility: {
        rangeDescription: "Range: 1 to 30.",
      },
      tickColor: "none",
    },
    yAxis: {
      title: {
        enabled: false,
      },
      gridLineColor: "#1f3652",
      lineWidth: 1,
      lineColor: "#1f3652",
    },
    tooltip: {
      pointFormat:
        "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}",
    },
    plotOptions: {
      area: {
        pointStart: 1,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "USA",
        data: [
          0, 0, 2, 9, 13, 50, 170, 299, 438, 60, 53, 9, 73, 13, 66, 97, 81, 04,
          17, 71, 18, 22, 85, 5, 50, 308, 308,
        ],
      },
    ],
  });
}
