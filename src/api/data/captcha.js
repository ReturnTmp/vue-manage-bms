import Mock from "mockjs";
import { param2Obj } from "./base";
import Cookie from "js-cookie";

export default {
  getCaptcha: (config) => {
    let { email, type } = param2Obj(config.url);
    email = "returntmp@qq.com";
    console.log(email, type);
    if (type == "regist") {
      // 注册验证码
      // 验证是否注册
    } else if (type == "modify") {
      // 忘记密码验证码
      // 验证是否注册
    }
    // 获取验证码
    // let captcha = Mock.Random.integer(100000, 999999);
    let captcha = 265413;
    console.log("验证码：" + captcha);
    let minutes = 5;
    let expires = new Date(new Date() * 1 + minutes * 1000 * 60); // 五分钟后过期
    Cookie.set("captcha", captcha, { expires: expires });
    return {
      code: 20000,
      data: Cookie.get("captcha"),
    };
  },

  verifyCaptcha: (config) => {
    let { verificationCode } = param2Obj(config.url);
    if (verificationCode == Cookie.get("captcha")) {
      return {
        code: 20000,
        data: true,
      };
    } else {
      return {
        code: 40000,
        data: false,
      };
    }
  },
};
