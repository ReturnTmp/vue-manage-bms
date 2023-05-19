<template>
  <div class="main-container">
    <el-button v-if="authority == 1" type="success" @click="QrcodeVisible = true">还书窗口</el-button>
    <el-dialog title="还书窗口" :visible.sync="QrcodeVisible">
      <p class="error">{{ error }}</p>

      <!-- <p class="decode-result">
          Last result: <b>{{ result }}</b>
        </p> -->
      <qrcode-stream @decode="onDecode" @init="onInit"
    /></el-dialog>

    <h3>
      热门图书
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + 'refresh'"></use>
        </svg>
      </a>
    </h3>
    <div class="book-box">
      <div class="img-box" v-for="(item, index) in popularList" :key="index">
        <img :src="item.img" alt="" @click="chooseBook(item)" />
        <i class="title-tag">{{ item.title }}</i>
        <i class="borrow-btn" @click="borrowBook(item.title)">借阅</i>
      </div>
    </div>

    <h3>
      榜单图书
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + 'refresh'"></use>
        </svg>
      </a>
    </h3>
    <div class="book-box">
      <div class="img-box" v-for="(item, index) in recommendList" :key="index">
        <img :src="item.img" alt="" @click="chooseBook(item)" />
        <i class="title-tag">{{ item.title }}</i>
        <i class="borrow-btn" @click="borrowBook(item.title)">借阅</i>
      </div>
    </div>

    <h3>
      畅销图书
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + 'refresh'"></use>
        </svg>
      </a>
    </h3>
    <div class="book-box">
      <div
        class="img-box"
        v-for="(item, index) in bestsellingList"
        :key="index"
      >
        <img :src="item.img" alt="" @click="chooseBook(item)" />
        <i class="title-tag">{{ item.title }}</i>
        <i class="borrow-btn" @click="borrowBook(item.title)">借阅</i>
      </div>
    </div>

    <el-dialog
      class="dialog-content"
      title="借阅成功"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span style="margin-bottom;: 10px">{{
        "您已借阅到《" + bookTitle + "》" + "，请妥善保管借阅二维码"
      }}</span>
      <img
        class="qrcode-img"
        src="../../assets/images/qrcode.png"
        alt=""
        style="width: 200px; height: 200px; margin: auto; display: block"
      />
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- <pdf src="../../assets/pdf/s27106600.pdf"></pdf> -->
    <!-- <div>
      {{ currentPage }} / {{ pageCount }}
      <pdf
        src="https://www.lilnong.top/static/pdf/B-4-RxJS%E5%9C%A8React%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8-%E9%BE%99%E9%80%B8%E6%A5%A0_.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
      ></pdf>
    </div> -->

    <el-dialog
      title="图书预览"
      :visible.sync="bookFileVisible"
      width="26%"
      :before-close="handleClose"
    >
      <div v-if="bookFilePath">
        <div style="display: flex; justify-content: space-between">
          <div>
            <el-button>{{ currentPage }} / {{ numPages }}</el-button>
          </div>
          <div>
            <el-button @click="currentPage > 1 ? currentPage-- : currentPage"
              >&lt;&lt;</el-button
            >
            <el-button
              @click="currentPage < numPages ? currentPage++ : currentPage"
              >&gt;&gt;</el-button
            >
          </div>
        </div>
        <div>
          <pdf :src="bookFilePath" :page="currentPage"></pdf>
        </div>
      </div>
      <div v-else>
        <span>暂无预览</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { mapState } from "vuex";
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    pdf,
    QrcodeStream,
  },
  data() {
    return {
      QrcodeVisible: false,
      result: "",
      error: "",
      currentPage: 1,
      numPages: null,
      bookFilePath: null,
      bookFileVisible: false,
      bookTitle: "",
      dialogVisible: false,
      popularList: [
        {
          img: require("../../assets/images/source/popular/s27003183.jpg"),
          title: "局外人",
          bookFilePath: "/static/s27003183.pdf",
        },
        {
          img: require("../../assets/images/source/popular/s1070959.jpg"),
          title: "红楼梦",
        },
        {
          img: require("../../assets/images/source/popular/s4371408.jpg"),
          title: "1984",
        },
        {
          img: require("../../assets/images/source/popular/s27237850.jpg"),
          title: "百年孤独",
        },
        {
          img: require("../../assets/images/source/popular/s29053580.jpg"),
          title: "活着",
        },
        {
          img: require("../../assets/images/source/popular/s29101586.jpg"),
          title: "哈利波特",
        },
        // {
        //   img: require("../../assets/images/source/popular/s30016152.jpg"),
        //   title: "三体",
        // },
      ],
      recommendList: [
        {
          img: require("../../assets/images/source/recommand/s27106600.jpg"),
          title: "球状闪电",
          bookFilePath: "/static/s27106600.pdf",
        },
        {
          img: require("../../assets/images/source/recommand/s1076932.jpg"),
          title: "三国演义",
        },
        {
          img: require("../../assets/images/source/recommand/s1078958.jpg"),
          title: "飘",
        },
        {
          img: require("../../assets/images/source/recommand/s1229240.jpg"),
          title: "福尔摩斯探案全集",
        },
        {
          img: require("../../assets/images/source/recommand/s2347590.jpg"),
          title: "动物农场",
        },
        {
          img: require("../../assets/images/source/recommand/s24514468.jpg"),
          title: "白夜行",
        },
        // {
        //   img: require("../../assets/images/source/recommand/s29651121.jpg"),
        //   title: "房思琪的初恋乐园",
        // },
      ],
      bestsellingList: [
        {
          img: require("../../assets/images/source/bestselling/s4521754.jpg"),
          title: "悲惨世界",
        },
        {
          img: require("../../assets/images/source/bestselling/s1020454.jpg"),
          title: "哭泣的骆驼",
        },
        {
          img: require("../../assets/images/source/bestselling/s24611679.jpg"),
          title: "文学回忆录",
        },
        {
          img: require("../../assets/images/source/bestselling/s2651394.jpg"),
          title: "灿烂千阳",
        },
        {
          img: require("../../assets/images/source/bestselling/s1146614.jpg"),
          title: "人间词话",
        },
        {
          img: require("../../assets/images/source/bestselling/s3893343.jpg"),
          title: "美的历程",
        },
      ],
    };
  },
  methods: {
    onDecode(result) {
      this.result = result;
      this.QrcodeVisible = false;
      this.$notify({
        title: "还书成功",
        message: `识别信息：\r\n ${this.result}`,
        type: "success",
      });
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    borrowBook(title) {
      console.log(title);
      this.bookTitle = title;
      this.dialogVisible = true;
    },
    async chooseBook(item) {
      console.log(item);
      this.bookFileVisible = !this.bookFileVisible;
      this.bookFilePath = item.bookFilePath;
      // 获取总页数
      await pdf.createLoadingTask(this.bookFilePath).promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
      console.log(this.numPages);
    },
    handleClose() {
      this.bookFileVisible = false;
      this.bookFilePath = null;
      this.currentPage = 1;
      this.numPages = null;
    },
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      authority: (state) => state.user.authority,
    }),
  },
};
</script>

<style lang="less" scoped>
.book-content {
  position: absolute;
  top: 0px;
  left: 0px;
  display: block;
}
// .book-content.active {
//   display: block;
// }

// .dialog-content /deep/ qrcode-img {
//   width: 100%;
//   height: 100%;
//   margin: auto;
// }
.main-container {
  i {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
    white-space: nowrap;
  }
  .title-tag {
    width: 60%;
    margin-left: 0px;
  }
  .borrow-btn {
    cursor: pointer;
    font-size: 13px;
    width: 40%;
    margin-right: 0px;
  }
  .borrow-btn:hover {
    color: orange;
  }

  .icon {
    width: 0.8em;
    height: 0.8em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  h3 {
    font-family: "IntroduceFont" !important;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .book-box {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .img-box {
    cursor: pointer;
    display: inline-block;
    width: 100px;
    height: 130px;
    border-radius: 10px;
    transition: all 0.2s ease;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-box:hover {
    transform: translateY(-5px);
    -moz-box-shadow: 0px 8px 20px 1px rgba(6, 35, 64, 0.3);
    -webkit-box-shadow: 0px 8px 20px 1px rgba(6, 35, 64, 0.3);
    box-shadow: 0px 8px 20px 1px rgba(6, 35, 64, 0.3);
    filter: brightness(1.1);
  }
}

.error {
  font-weight: bold;
  color: red;
}
</style>
