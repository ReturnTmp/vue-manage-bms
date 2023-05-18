<template>
  <div>
    <el-row class="header-row">
      <!-- <el-card
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
      </el-card> -->

      <el-card class="introduce-card">
        <div slot="header" class="clearfix">
          <span style="width: 30%; text-align: start; display: inline-block"
            >项目介绍</span
          >
          <span style="width: 70%; text-align: end; display: inline-block">
            <svg
              @click="win.open('https://github.com/ReturnTmp/wenyuan-bms-vue/')"
              style="cursor: pointer"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-github"></use>
            </svg>
            <svg
              @click="
                win.open('https://gitee.com/cheng-guanghao/wenyuan-bms-vue/')
              "
              style="cursor: pointer"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-gitee"></use>
            </svg>
          </span>
        </div>

        <div class="text item">
          <h3>功能简介</h3>
          <p>
            信息维护功能：对图书资源进行信息维护，包括图书信息的录入、删
            除、修改、查询等。对读者信息的信息维护，包括读者信息的录入、删除、修改
            查询等。对管理人员的信息维护，包括管理人员信息的录入、删除、修改、查询
            等。
          </p>
          <p>
            图书借阅功能：允许读者自行通过系统的用户端（微信或计算机）办
            理借阅信息，如果资源满足则发送二维码给读者，读者凭二维码来图书馆取书等。
            要求学生读者从图书馆借阅的图书不能超过 6 本，老师读者不能超过 10
            本。
          </p>
          <p>
            图书归还功能：允许读者通过专用窗口由管理员检查图书，管理员扫
            描图书上的二维码归档图书。
          </p>
          <p>
            图书报表处理功能：系统具备图书借阅统计报表功能，按月对图书借
            阅信息进行统计分析整理，供图书馆管理员查询，并依据其调整图书馆资源配置。
          </p>
          <p>
            图书推荐功能：系统具备一定的图书推荐功能，依据读者借阅信息，
            采用机器学习的方法向读者推荐图书资源等。
          </p>
          <p>
            图书互借功能：读者可以将自己拥有的个人图书资源，通过图书馆管
            理系统向读者提供借阅。借阅者需要支付少量费用给图书馆和图书资源拥有的读
            者。
          </p>
          <p>
            违规处罚功能：如果借阅超期，系统会发送短信提醒归还图书。如果
            提醒后仍未归还，则按要求处罚，逾期一天罚款 0.1
            元。如果图书损坏或丢失， 则按图书价值来处理。
          </p>
          <p>图书信息专栏功能：包括系统信息公告、读者来信、读者咨询等等。</p>
          <p>
            依据用户需求定制的其他创新功能。如图书在线阅读、图书购买代办、
            二手图书交易、学习笔记互借等等。
          </p>
          <!-- <h3>优势</h3>
          <ul>
            <li></li>
          </ul> -->
        </div>
      </el-card>

      <!-- <el-card class="produce-card">
        <div slot="header" class="clearfix">
          <span>开发日志</span>
        </div>
        <div class="text item">
          <p>无</p>
        </div>
      </el-card> -->
    </el-row>
  </div>
</template>

<script>
import Tesseract from "tesseract.js";
export default {
  data() {
    return {
      imageUrl: "",
      currentDate: new Date(),
      win: window,
      MODEL_URL: "/models",
    };
  },
  methods: {
    onUploadChange(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function (e) {
        console.log(this.result);
        let blob = that.base64ToBlob(this.result);
        that.identifyBookInfo(blob);
      };
    },
    base64ToBlob(base64) {
      let arr = base64.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    identifyBookName(text) {
      // let text =
      //   "! 图 书 在 版 编 目 (C I P) 数 据 数 据 库 系 统 概 论 王 珊 , 萨 师 煊 编 著 . 一 5 版";
      const regex = /图 书 在 版 编 目 \(C I P\) 数 据(.{15})/;
      const result = regex.exec(text);
      console.log(result);
      // console.log(result[1]);
    },
    identifyBookInfo(image) {
      // 支持语言 https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
      Tesseract.recognize(image, "chi_sim", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        console.log(text);
        this.identifyBookName(text);
      });
    },
    routerTest() {
      // 直接跳转
      window.location.href = "http://www.baidu.com";
      // 打开新标签页
      window.open("http://www.baidu.com");
      // 页面重定向
      window.location.replace("http://www.baidu.com");
    },
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

.icon {
  width: 0.8em;
  height: 0.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 5px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
