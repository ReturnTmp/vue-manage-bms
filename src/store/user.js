import Cookie from "js-cookie";
let minutes = 30;
let expires = new Date(new Date() * 1 + minutes * 1000 * 60); // 三十分钟后过期
export default {
  state: {
    token: Cookie.get("token") || "",
    authority: Cookie.get("authority") || 0, // 0 普通用户 1 管理员
    username: Cookie.get("username") || "",
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val, { expires: expires });
    },
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    getToken(state) {
      state.token = state.token || Cookie.get("token");
    },
    setAuthority(state, val) {
      state.authority = val;
      Cookie.set("authority", val, { expires: expires });
    },
    clearAuthority(state) {
      state.authority = 0;
      Cookie.remove("authority");
    },
    getAuthority(state) {
      state.authority = state.authority || Cookie.get("authority");
    },

    setUserName(state, val) {
      state.username = val;
      Cookie.set("username", val, { expires: expires });
    },
    getUserName(state) {
      state.username = state.username || Cookie.get("username");
    },
    clearUserName(state) {
      state.username = "";
      Cookie.remove("username");
    },
  },
};
