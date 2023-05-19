<template>
  <div class="main-container">
    <!-- <h3>
      热门图书
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + 'refresh'"></use>
        </svg>
      </a>
    </h3> -->
    <div class="popular-book-box" v-for="(bookItem, bookIndex) in bookList">
      <div class="img-box" v-for="(item, index) in bookItem" :key="index">
        <img :src="item.img" alt="" />
        <i class="title-tag">{{ item.title }}</i>
        <i style="visibility: hidden" class="borrow-btn">借阅</i>
      </div>
    </div>

    <!-- <h3>
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
        <i class="borrow-btn">借阅</i>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookList: [
        [
          {
            img: require("../../assets/images/source/1/s1070959.jpg"),
            title: "红楼梦",
          },
          {
            img: require("../../assets/images/source/1/s4371408.jpg"),
            title: "1984",
          },
          {
            img: require("../../assets/images/source/1/s27237850.jpg"),
            title: "百年孤独",
          },
          {
            img: require("../../assets/images/source/1/s29053580.jpg"),
            title: "活着",
          },
          {
            img: require("../../assets/images/source/1/s29101586.jpg"),
            title: "哈利波特",
          },
          {
            img: require("../../assets/images/source/1/s30016152.jpg"),
            title: "三体",
          },
        ],
        [
          {
            img: require("../../assets/images/source/2/s1076932.jpg"),
            title: "三国演义",
          },
          {
            img: require("../../assets/images/source/2/s1078958.jpg"),
            title: "飘",
          },
          {
            img: require("../../assets/images/source/2/s1229240.jpg"),
            title: "福尔摩斯探案全集",
          },
          {
            img: require("../../assets/images/source/2/s2347590.jpg"),
            title: "动物农场",
          },
          {
            img: require("../../assets/images/source/2/s24514468.jpg"),
            title: "白夜行",
          },
          {
            img: require("../../assets/images/source/2/s29651121.jpg"),
            title: "房思琪的初恋乐园",
          },
        ],
        [
          {
            img: require("../../assets/images/source/3/s2347562.jpg"),
            title: "刀锋",
          },
          {
            img: require("../../assets/images/source/3/s2962510.jpg"),
            title: "无人生还",
          },
          {
            img: require("../../assets/images/source/3/s8968135.jpg"),
            title: "树上的男爵 ",
          },
          {
            img: require("../../assets/images/source/3/s33640730.jpg"),
            title: "秋园",
          },
          {
            img: require("../../assets/images/source/3/s27003191.jpg"),
            title: "鼠疫",
          },
          {
            img: require("../../assets/images/source/3/s4250062.jpg"),
            title: "傲慢与偏见",
          },
        ],
      ],
    };
  },
};
</script>

<style lang="less" scoped>
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
  //   .el-card {
  //     width: 130px;
  //     margin-top: 10px;
  //     margin-bottom: 10px;
  //   }
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
    margin-top: 30px;
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
