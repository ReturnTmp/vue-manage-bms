<template>
  <div>
    <el-row class="header-row">
      <el-card
        class="image-card"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img src="../../assets/images/logo.png" class="image" />
        <div style="padding: 14px">
          <span>图书管理系统</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-card>

      <el-card class="introduce-card">
        <div slot="header" class="clearfix">
          <span>项目介绍</span>
        </div>
        <div class="text item">
          <!-- <h3>简介</h3>
          <p class="introduce-p">
            无虞智能安全保障系统聚焦于电力生产作业，致力将操作票制度智能化，
            改进传统操作票制度的低效沟通的问题；能够第一时间发现安全隐患并发出警报，
            避免电力生产中因人为失误而造成的事故；通过人工智能提升电力生产作业的准确性和效率，
            提供更为安全和高效的监护机制。
          </p>
          <h3>优势</h3>
          <ul>
            <li>高效的电子操作票制度</li>
            <li>高精度的人工智能检测</li>
            <li>完善的监控报警机制</li>
          </ul> -->
        </div>
      </el-card>

      <el-card class="produce-card">
        <div slot="header" class="clearfix">
          <span>开发日志</span>
        </div>
        <!-- <div class="text item">
          <p>2.12 实现用户管理模块</p>
          <p>2.24 实现操作票开具下发模块</p>
          <p>3.6 实现实时监控模块</p>
          <p>3.10 实现项目介绍模块</p>
          <p>3.28 实现算法检测模块</p>
          <p>4.7 实现现场端模块</p>
        </div> -->
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style lang="less" scoped>
span {
  text-align: center;
  line-height: 48px;
  font-family: "TitleFont", sans-serif;
  font-size: 20px;
}
.header-row {
  display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  gap: 10px;
}
.introduce-card {
  width: 100%;
}
.text.item {
  font-family: "AlimamaFont", sans-serif;
  font-size: 15px;
  h3 {
    font-size: 16px;
    font-weight: 600;
  }
  p,
  li {
    line-height: 25px;
    text-indent: 20px;
  }
}
.produce-card {
  width: 100%;
  height: 100%;
}

.image-card {
  width: 60%;
  height: 100%;
  img {
    width: 100px;
    margin: auto;
  }
  span {
    text-align: center;
    margin-left: 40px;
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
