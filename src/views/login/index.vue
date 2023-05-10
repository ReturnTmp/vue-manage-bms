<template>
  <div class="main">
    <div class="type-container">
      <p class="line animation">朝赏千篇，暮读万卷，古今中外尽在心间</p>
    </div>
    <!-- login/register 总盒子 -->
    <div
      :class="{
        active: currentModel,
        container: true,
        animate__animated: true,
        animate__flipInX: true,
      }"
    >
      <!-- 注册 -->
      <div class="form-container sign-up-container">
        <el-form
          v-if="!isForget"
          class="form"
          :model="regForm"
          onsubmit="return false;"
          ref="regFormRef"
        >
          <h3 class="container-title">{{ title }}</h3>
          <el-form-item class="form-item" prop="username">
            <el-input
              v-model="regForm.username"
              type="text"
              placeholder="昵称"
            />
          </el-form-item>
          <el-form-item class="form-item" prop="email">
            <el-input
              v-model="regForm.email"
              placeholder="邮箱"
              class="input-with-select"
            >
              <template #append v-if="regForm.email">
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="sendEmail(regForm.email, 'regist')"
                  >{{ sendEmailInfo.btnText }}</el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              v-model="regForm.password"
              type="password"
              name="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item class="form-item" prop="verificationCode">
            <el-input
              v-model="regForm.verificationCode"
              type="text"
              name="password"
              placeholder="验证码"
            />
          </el-form-item>
          <button type="button" class="signUp theme-button" @click="register()">
            注册
          </button>
        </el-form>

        <!-- 找回密码-->
        <el-form
          v-if="isForget"
          class="form"
          :model="forgetForm"
          onsubmit="return false;"
          ref="forgetFormRef"
        >
          <h3 class="container-title">{{ title }}</h3>
          <el-form-item class="form-item" prop="email">
            <el-input
              v-model="forgetForm.email"
              placeholder="邮箱"
              class="input-with-select"
            >
              <template #append v-if="forgetForm.email">
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="sendEmail(forgetForm.email, 'modify')"
                  >{{ sendEmailInfo.btnText }}</el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              v-model="forgetForm.password"
              type="password"
              name="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item class="form-item" prop="verificationCode">
            <el-input
              v-model="forgetForm.verificationCode"
              type="text"
              name="password"
              placeholder="验证码"
            />
          </el-form-item>
          <button type="button" class="signUp theme-button" @click="forfet()">
            修改
          </button>
        </el-form>
      </div>
      <!-- 登入 -->
      <div class="form-container sign-in-container">
        <el-form
          class="form"
          :model="loginForm"
          onsubmit="return false;"
          ref="loginFormRef"
        >
          <h2 class="container-title">{{ title }}</h2>

          <el-form-item class="form-item" prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="昵称"
            />
          </el-form-item>
          <el-form-item class="form-item" prop="passwoed">
            <el-input
              v-model="loginForm.password"
              type="password"
              name="password"
              placeholder="密码"
            />
          </el-form-item>
          <button class="signUp theme-button" type="button" @click="login()">
            登录
          </button>
          <p
            class="forget"
            @click="
              currentModel = !currentModel;
              isForget = true;
            "
          >
            忘记密码
          </p>
        </el-form>
      </div>
      <!--覆盖容器-->
      <div class="overlay_container">
        <div class="overlay">
          <!--左边 -->
          <div class="overlay_panel overlay_left_container">
            <h2 class="container-subtitle">Welcome back!</h2>
            <p>请输入您的个人信息登录，以保持与我们的联系</p>
            <button
              type="button"
              id="sign-in"
              class="theme-button"
              @click="currentModel = !currentModel"
            >
              登录
            </button>
          </div>
          <!-- 右边 -->
          <div class="overlay_panel overlay_right_container">
            <h2 class="container-subtitle">hello friend!</h2>
            <p>输入您的个人信息，与我们一起开始旅程</p>
            <button
              type="button"
              class="theme-button"
              id="sign-up"
              @click="
                currentModel = !currentModel;
                isForget = false;
              "
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenu, getCaptcha, verifyCaptcha } from "@/api/data";
export default {
  name: "login",
  data() {
    return {
      isForget: false,
      currentModel: false,
      title: "",
      regForm: {
        username: "admin",
        password: "admin",
        email: "",
        verificationCode: "",
      },
      forgetForm: {
        email: "",
        password: "",
        verificationCode: "",
      },
      loginForm: {
        username: "admin",
        password: "admin",
      },
      sendEmailInfo: {
        btnText: "发送验证码",
        isSend: false,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.title = process.env.VUE_APP_TITLE;
  },
  methods: {
    login() {
      getMenu(this.loginForm).then(({ data: res }) => {
        console.log(res, "res");
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          console.log("username" + this.loginForm.username);
          this.$store.commit("setUserName", this.loginForm.username);
          if (this.loginForm.username === "admin") {
            this.$store.commit("setAuthority", 1);
          }
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // const token = Mock.Random.guid()
      // this.$store.commit('setToken', token)
      // this.$router.push({ name: 'home' })
    },
    register() {
      verifyCaptcha(this.regForm).then(({ data: res }) => {
        console.log(res);
        if (res.data) {
          this.currentModel = !this.currentModel;
          this.$notify({
            title: "",
            message: "注册成功",
            type: "success",
          });
        } else {
          this.$notify.error({
            title: "",
            message: "注册失败",
          });
        }
      });
    },
    sendEmail(email, type) {
      console.log(email, type);
      console.log({ email, type });
      getCaptcha({ email, type }).then(({ data: res }) => {
        console.log(res);
      });
    },
    forfet() {},
  },
};
</script>
<style lang="less" scoped>
@import url(../../assets/style/common/font.less);
@import url(../../assets/style/view/login.less);
</style>
