<template>
  <div>
    <el-form
      :inline="true"
      ref="form"
      :model="stepForm"
      label-width="100px"
      size="mini"
    >
      <div>
        <el-form-item label="操作票编号">
          <el-input
            v-model="stepForm.ticketNumber"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作步骤编号">
          <el-input
            v-model="stepForm.stepNumber"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <el-form-item label="完成工单编号">
          <el-input
            v-model="stepForm.finishOrderNumber"
            style="width: 100px"
          ></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="操作步骤描述">
          <el-input
            class="step-desc-input"
            type="textarea"
            v-model="stepForm.operationDesc"
          ></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="是否完成">
          <el-radio v-model="stepForm.finished" :label="true">是</el-radio>
          <el-radio v-model="stepForm.finished" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="stepForm.finishTime.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="stepForm.finishTime.time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
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
import CommonTable from "@/components/CommonTable.vue";
export default {
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.stepForm);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/ticket.less");
.step-desc-input {
  width: 200%;
}
</style>
