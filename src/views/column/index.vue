<template>
  <div>
    <div class="header-content">
      <!-- 信息公告 -->
      <div class="info-box">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>信息公告</span>
            <!-- <i href="" style="float: right; padding: 3px 0">了解我们</i>
            <el-button
              @click="
                window.location.href(
                  'https://github.com/ReturnTmp/vue-manage-bms'
                )
              "
              style="float: right; padding: 3px 0"
              type="text"
              >了解我们</el-button
            >
             -->
          </div>
          <h3>欢迎使用图书管理系统！</h3>
          <ul>
            <li>图书查询：您可以通过关键字、作者、出版社等信息查询图书。</li>
            <li>图书借阅：您可以借阅图书，借阅期限为 30 天。</li>
            <li>图书归还：您可以归还已借阅的图书。</li>
            <li>图书续借：您可以续借已借阅的图书，续借期限为 30 天。</li>
            <li>借阅历史：您可以查看自己的借阅历史记录。</li>
            <li>个人信息：您可以修改自己的个人信息。</li>
          </ul>
        </el-card>
      </div>

      <el-carousel
        class="carousel-box"
        :interval="4000"
        type="card"
        height="250px"
      >
        <el-carousel-item v-for="item in 6" :key="item">
          <img
            :src="require('../../assets/images/column/' + item + '.jpg')"
            alt=""
            height="100%"
            width="100%"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main-content">
      <!-- 读者咨询 -->
      <div class="reader-consult">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>读者咨询</span>
          </div>

          <div class="reader-consult-item">
            <el-descriptions title="" :column="2">
              <el-descriptions-item label="用户名">admin</el-descriptions-item>
              <el-descriptions-item label="邮箱"
                >returntmp@qq.com</el-descriptions-item
              >
              <el-descriptions-item label="咨询">
                请问《乱世佳人》何时可以借阅
              </el-descriptions-item>
            </el-descriptions>

            <el-badge :value="12" class="item">
              <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="3" class="item">
              <el-button size="small">回复</el-button>
            </el-badge>
          </div>
        </el-card>
      </div>

      <!-- 读者来信 -->
      <div class="reader-letter">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>读者来信</span>
          </div>

          <div class="reader-letter-item">
            <el-descriptions title="" column="2">
              <el-descriptions-item label="用户名">admin</el-descriptions-item>
              <el-descriptions-item label="邮箱"
                >returntmp@qq.com</el-descriptions-item
              >
              <el-descriptions-item label="主题">
                关于借阅权限如何提升
              </el-descriptions-item>
            </el-descriptions>

            <el-badge :value="2" class="item">
              <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="0" class="item">
              <el-button size="small">回复</el-button>
            </el-badge>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-family: "IntroduceFont" !important;
  }
  .reader-consult {
    width: 50%;
  }

  .reader-letter {
    width: 50%;
  }

  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;

  .info-box {
    width: 50%;
    line-height: 20px;

    span {
      font-family: "TitleFont" !important;
    }
    h3 {
      font-family: "IntroduceFont" !important;
    }
    li {
      font-size: 15px;
    }
  }
}
.carousel-box {
  width: 50%;
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}

.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
