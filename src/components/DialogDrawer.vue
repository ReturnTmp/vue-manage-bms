<template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
      点我打开
    </el-button>
    <el-drawer
      title="GPT 对话助手"
      :visible.sync="drawer"
      :direction="direction"
      style="text-align: center"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
// import { ChatGPTClient } from "@waylaidwanderer/chatgpt-api";

export default {
  name: "DialogDrawer",
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped></style>
