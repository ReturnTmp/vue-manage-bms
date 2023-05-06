// mock数据模拟
import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          科幻: Mock.Random.float(100, 800, 0, 0),
          悬疑: Mock.Random.float(100, 800, 0, 0),
          爱情: Mock.Random.float(100, 800, 0, 0),
          哲学: Mock.Random.float(100, 800, 0, 0),
          逻辑: Mock.Random.float(100, 800, 0, 0),
        })
      );
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: "科幻",
            value: 2999,
          },
          {
            name: "悬疑",
            value: 5999,
          },
          {
            name: "爱情",
            value: 1500,
          },
          {
            name: "哲学",
            value: 1999,
          },
          {
            name: "逻辑LU",
            value: 2200,
          },
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: 5,
            active: 200,
          },
          {
            date: "周二",
            new: 10,
            active: 500,
          },
          {
            date: "周三",
            new: 12,
            active: 550,
          },
          {
            date: "周四",
            new: 60,
            active: 800,
          },
          {
            date: "周五",
            new: 65,
            active: 550,
          },
          {
            date: "周六",
            new: 53,
            active: 770,
          },
          {
            date: "周日",
            new: 33,
            active: 170,
          },
        ],
        // 折线图
        orderData: {
          date: [
            "202301",
            "202302",
            "202303",
            "202304",
            "202305",
            "202306",
            "202307",
          ],
          data: List,
        },
        tableData: [
          {
            name: "哲学",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: Mock.Random.float(100, 800, 0, 0),
          },
          {
            name: "爱情",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: Mock.Random.float(100, 800, 0, 0),
          },
          {
            name: "悬疑",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: Mock.Random.float(100, 800, 0, 0),
          },
          {
            name: "科幻",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: Mock.Random.float(100, 800, 0, 0),
          },
          {
            name: "逻辑",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: Mock.Random.float(100, 800, 0, 0),
          },
        ],
      },
    };
  },
};
