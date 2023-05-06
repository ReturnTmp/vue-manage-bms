<template>
  <div style="margin-top: 20px">
    <div class="step-container">
      <el-steps :active="active" direction="vertical" align-center>
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
    </div>
    <div class="video-container">
      <el-card class="video-card">
        <video
          autoplay
          controls
          class="detect-video"
          src="../../assets/video/xiao.mp4"
        ></video>
      </el-card>

      <el-card class="button-card">
        <el-button type="success" @click="successOperate">完成操作</el-button>
        <el-button type="danger" @click="errorLog">错误报告</el-button>
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
    // this.timer = setInterval(() => {
    //   if (this.detectLogViewList.length === this.detectLogList.length) {
    //     !this.hasFault &&
    //       this.$notify.success({
    //         title: "成功",
    //         message: "工作人员着装检查成功",
    //       });
    //     clearInterval(this.timer);
    //     return;
    //   }
    //   this.next();
    //   this.detectLogViewList = this.detectLogList.slice(0, this.active);
    //   if (this.detectLogViewList[this.detectLogViewList.length - 1].hasFailed) {
    //     this.errorNotification(
    //       this.detectLogViewList[this.detectLogViewList.length - 1].value
    //     );
    //     this.hasFault = true;
    //   }
    // }, 2500);
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
          value: "安全帽佩戴操作失败",
          hasFailed: true,
        },
        {
          key: 2,
          value: "实验操作失败",
          hasFailed: true,
        },
        {
          key: 3,
          value: "操作成功",
          hasFailed: false,
        },
        {
          key: 4,
          value: "操作失败",
          hasFailed: true,
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
    successOperate() {
      this.$notify.success({
        title: "成功",
        message: "已将操作记录发送至服务端，请等待结果",
      });
    },
    errorLog() {
      this.$notify.info({
        title: "消息",
        message: "已发送错误日志到服务端",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.button-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.step-container {
  margin-left: 10px;
  margin-top: 20px;
}

.video-container {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: start;
  gap: 20px;
  font-family: "AlimamaFont", sans-serif;
  font-size: 15px;
  .video-card {
    width: 100%;
    .detect-video {
      width: 90vw;
      //   height: 300px;
    }
  }
  .detect-card {
    margin-top: 1rem;
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
