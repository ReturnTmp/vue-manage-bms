<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">{{ username }}</p>
            <!-- <p class="access">超级管理员</p> -->
          </div>
        </div>
        <div class="login-info">
          <!-- <p>上次登录时间：<span>2021-7-19</span></p> -->
          <!-- <p>上次登录地点：<span>武汉</span></p> -->
        </div>
      </el-card>
      <el-card v-if="authority == 1" style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val.label"
            :width="val.width"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col v-if="authority == 1" style="margin-top: 20px" :span="16">
      <div class="num">
        <!-- <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card> -->
      </div>
      <el-card style="height: 280px">
        <h3>月度分析</h3>
        <echart
          class="echart"
          :chartData="echartData.order"
          style="height: 280px"
        />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <h3>新增用户</h3>
          <echart
            class="echart"
            :chartData="echartData.user"
            style="height: 240px"
          />
        </el-card>
        <el-card style="height: 260px">
          <h3>饼状分析</h3>
          <echart
            class="echart pie"
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          />
        </el-card>
      </div>
    </el-col>
    <!-- <dialog-drawer></dialog-drawer> -->
  </el-row>
</template>
<script>
import { getData } from "@/api/data.js";
// import * as echarts from "echarts";
import Echart from "@/components/ECharts.vue";
import DialogDrawer from "@/components/DialogDrawer.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Echart,
    DialogDrawer,
  },
  data() {
    return {
      userImg: require("@/assets/images/profile.jpg"),
      tableData: [],
      tableLabel: {
        name: {
          label: "类别",
          width: "50",
        },
        todayBuy: {
          label: "种数",
          width: "60",
        },
        monthBuy: {
          label: "数量",
          width: "70",
        },
        totalBuy: {
          label: "本月借阅",
          width: "80",
        },
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    console.log(this.username);
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
  methods: {},
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      authority: (state) => state.user.authority,
    }),
  },
};
</script>

<style lang="less" scoped>
h3 {
  font-family: "IntroduceFont" !important;
}
.echart {
  margin-top: -30px;
}
.pie {
  margin-top: -10px;
}
</style>
