import Mock from "mockjs";
import homeApi from "./data/home";
import userApi from "./data/user";
import permissionApi from "./data/permission";
import captchaApi from "./data/captcha";
import bookApi from "./data/book";
import managerApi from "./data/manager";
import violateApi from "./data/violate";

Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/user\/add/, "post", userApi.createUser);
Mock.mock(/user\/edit/, "post", userApi.updateUser);

Mock.mock(/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/user\/del/, "post", userApi.deleteUser);

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);

Mock.mock(/captcha\/getCaptcha/, "get", captchaApi.getCaptcha);
Mock.mock(/captcha\/verifyCaptcha/, "get", captchaApi.verifyCaptcha);

Mock.mock(/book\/add/, "post", bookApi.createBook);
Mock.mock(/book\/edit/, "post", bookApi.updateBook);

Mock.mock(/book\/getBook/, "get", bookApi.getBookList);
Mock.mock(/book\/del/, "post", bookApi.deleteBook);

Mock.mock(/manager\/add/, "post", managerApi.createManager);
Mock.mock(/manager\/edit/, "post", managerApi.updateManager);

Mock.mock(/manager\/getManager/, "get", managerApi.getManagerList);
Mock.mock(/manager\/del/, "post", managerApi.deleteManager);

Mock.mock(/violate\/add/, "post", violateApi.createViolate);
Mock.mock(/violate\/edit/, "post", violateApi.updateViolate);

Mock.mock(/violate\/getViolate/, "get", violateApi.getViolateList);
Mock.mock(/violate\/del/, "post", violateApi.deleteViolate);
