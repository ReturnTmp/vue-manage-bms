<template>
  <div style="height: 300px">
    <el-steps :active="0" align-center>
      <el-step
        title="步骤1"
        description="将 10kV××线***开关的“远方/就地”切换开关切换至就地位置，
查确已在就地位置。"
      ></el-step>
      <el-step
        title="步骤2"
        description="拉出 10kV××线***手车开关至试验位置，查确已到位。"
      ></el-step>
      <el-step
        title="步骤3"
        description="取下 10kV××线***手车的二次插头，查确已取下。"
      ></el-step>
      <el-step
        title="步骤4"
        description="拉出 10kV××线***手车开关至检修位置，查确已到位。"
      ></el-step>
    </el-steps>
    <div class="video-container">
      <el-card class="video-card">
        <video
          autoplay
          controls
          loop
          class="detect-video"
          src="../../assets/video/yan-video/佩戴安全帽.mp4"
        ></video>
      </el-card>
      <el-card class="detect-card">
        <div slot="header" class="clearfix">
          <span>监控日志</span>
        </div>
        <div
          v-for="o in detectLogViewList"
          :key="o.key"
          :class="'text item ' + (o.hasFailed ? 'fail' : '')"
        >
          {{ "步骤 " + o.key + " " + o.value }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.timer = setInterval(() => {
      if (this.detectLogViewList.length === this.detectLogList.length) {
        !this.hasFault &&
          this.$notify.success({
            title: "成功",
            message: "工作人员着装检查成功",
          });
        clearInterval(this.timer);
        return;
      }
      this.next();

      this.detectLogViewList = this.detectLogList.slice(0, this.active);
      if (this.detectLogViewList[this.detectLogViewList.length - 1].hasFailed) {
        this.errorNotification(
          this.detectLogViewList[this.detectLogViewList.length - 1].value
        );
        this.hasFault = true;
      }
    }, 2500);
  },
  data() {
    return {
      timer: null,
      active: 0,
      hasFault: false,
      detectLogViewList: [],
      detectLogList: [
        {
          key: 1,
          value: "检测防护服",
          hasFailed: false,
        },
        {
          key: 2,
          value: "检测手套",
          hasFailed: false,
        },
        {
          key: 3,
          value: "检测安全帽",
          hasFailed: false,
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.active++ >= this.detectLogList.length) this.active = 0;
    },
    errorNotification(message) {
      this.$notify.error({
        title: "错误",
        message: message,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.video-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 20px;
  gap: 20px;
  font-family: "AlimamaFont", sans-serif;
  font-size: 15px;
  .video-card {
    width: 90%;
    .detect-video {
      width: 500px;
      height: 300px;
    }
  }
  .detect-card {
    width: 100%;
    .item {
      margin-bottom: 18px;
    }
    .fail {
      color: red;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>
