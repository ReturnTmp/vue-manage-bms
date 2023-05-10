<template>
  <div>
    <el-form
      :inline="true"
      ref="form"
      :model="itemForm"
      label-width="100px"
      size="mini"
    >
      <div>
        <el-form-item label="操作步骤编号">
          <el-input
            v-model="itemForm.stepNumber"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作步骤描述">
          <el-input v-model="itemForm.operationItemDesc"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="操作步骤描述">
          <el-input
            class="step-desc-imput"
            type="textarea"
            v-model="itemForm.operationDesc"
          ></el-input>
        </el-form-item>
      </div>

      <div class="foot-container">
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type="info">取消创建</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemForm: {
        stepNumber: "",
        operationItemDesc: "",
        operationItemCode: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/ticket.less");
</style>
