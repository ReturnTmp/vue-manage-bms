import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "项目首页",
              icon: "home",
              url: "home/index",
            },
            {
              label: "用户管理",
              icon: "user",
              children: [
                {
                  path: "/reader",
                  name: "reader",
                  label: "读者管理",
                  url: "user/reader.vue",
                },
                {
                  path: "/manager",
                  name: "manager",
                  label: "管理信息",
                  url: "user/manager.vue",
                },
              ],
            },
            {
              path: "/book",
              name: "book",
              label: "图书资源",
              icon: "book",
              url: "book/index",
            },
            {
              path: "/column",
              name: "column",
              label: "图书专栏",
              icon: "column",
              url: "column/index",
            },
            {
              path: "/borrow",
              name: "borrow",
              label: "藏书管理",
              icon: "borrow",
              url: "borrow/index",
            },
            {
              path: "/recommend",
              name: "recommend",
              label: "图书推荐",
              icon: "recommend",
              url: "recommend/index",
            },
            {
              path: "/violate",
              name: "violate",
              label: "违规管理",
              icon: "violate",
              url: "violate/index",
            },
            {
              path: "/check",
              name: "check",
              label: "图书审核",
              icon: "check",
              url: "check/index",
            },
            {
              path: "/introduce",
              name: "introduce",
              label: "项目介绍",
              icon: "introduce",
              url: "introduce/index",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "user") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "项目首页",
              icon: "home",
              url: "home/index",
            },
            {
              path: "/book",
              name: "book",
              label: "图书资源",
              icon: "book",
              url: "book/index",
            },
            {
              path: "/column",
              name: "column",
              label: "图书专栏",
              icon: "column",
              url: "column/index",
            },
            {
              path: "/borrow",
              name: "borrow",
              label: "个人图书",
              icon: "borrow",
              url: "borrow/index",
            },
            {
              path: "/recommend",
              name: "recommend",
              label: "图书推荐",
              icon: "recommend",
              url: "recommend/index",
            },
            {
              path: "/introduce",
              name: "introduce",
              label: "项目介绍",
              icon: "introduce",
              url: "introduce/index",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
