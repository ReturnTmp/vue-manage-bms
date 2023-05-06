<template>
  <div class="step-table">
    <el-table :data="stepForm" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    stepForm: {
      type: Object,
      default: {
        ticketNumber: "123456789",
        stepNumber: "1",
        finishOrderNumber: "1",
        operationDesc: "无",
        finished: false,
        finishTime: {
          date: new Date(),
          time: new Date(),
        },
      },
    },
    tableLabel: {
      type: Array,
      default: [
        {
          label: "操作票编号",
          prop: "ticketNumber",
        },
        {
          label: "操作步骤编号",
          prop: "stepNumber",
        },
        {
          label: "完成工单编号",
          prop: "finishOrderNumber",
        },
        {
          label: "操作步骤描述",
          prop: "operationDesc",
        },
        {
          label: "是否完成",
          prop: "finished",
        },
        {
          label: "完成时间",
          prop: "finishTime",
        },
        {
          label: "操作",
          prop: "operation",
          width: "200px",
        },
      ],
    },
  },
};
</script>

<style lang="less" scoped></style>
