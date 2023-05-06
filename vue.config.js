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
  // json-server
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //     },
  //   },
  // },
};
