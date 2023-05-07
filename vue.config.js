module.exports = {
  // 关闭eslint
  lintOnSave: false,
  pluginOptions: {
    prompt: {
      prompts: [
        {
          type: "input",
          name: "componentName",
          message: "What is the name of the component?",
        },
      ],
      actions: [
        {
          type: "add",
          path: "src/views/{{properCase componentName}}/index.vue",
          templateFile: "src/views/Template.vue",
        },
      ],
    },
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       // 匹配所有以 '/api'开头的请求路径
  //       target: "http://localhost:7001", // 代理目标的基础路径
  //       changeOrigin: true,
  //       pathRewrite: { "^/api": "/" }, // 代理到服务器的时候，去除api路径
  //     },
  //   },
  // },
};
