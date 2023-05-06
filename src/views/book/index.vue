<template>
  <div class="main-container">
    <h3>
      热门图书
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + 'refresh'"></use>
        </svg>
      </a>
    </h3>
    <div class="popular-book-box">
      <div class="img-box" v-for="(item, index) in popularList" :key="index">
        <img :src="item.img" alt="" />
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
    <div class="recommend-book-box">
      <div class="img-box" v-for="(item, index) in recommendList" :key="index">
        <img :src="item.img" alt="" />
        <i class="title-tag">{{ item.title }}</i>
        <i class="borrow-btn" @click="borrowBook(item.title)">借阅</i>
      </div>
    </div>

    <el-dialog
      class="dialog-content"
      :title="'您已借阅到《' + bookTitle + '》' + '，请妥善保管借阅二维码'"
      :visible.sync="dialogVisible"
      width="30%"
    >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookTitle: "",
      dialogVisible: false,
      popularList: [
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
        {
          img: require("../../assets/images/source/popular/s30016152.jpg"),
          title: "三体",
        },
      ],
      recommendList: [
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
        {
          img: require("../../assets/images/source/recommand/s29651121.jpg"),
          title: "房思琪的初恋乐园",
        },
      ],
    };
  },
  methods: {
    borrowBook(title) {
      console.log(title);
      this.bookTitle = title;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
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
  .popular-book-box {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .recommend-book-box {
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
</style>
