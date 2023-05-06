<template>
  <div class="ticket-container">
    <el-form ref="form" :model="ticketForm" label-width="100px" size="mini">
      <div>
        <el-form-item label="公司名称">
          <el-input v-model="ticketForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="操作编号">
          <el-input v-model="ticketForm.ticketNumber"></el-input>
        </el-form-item>
        <el-form-item label="票面类型">
          <el-select v-model="ticketForm.ticketType" placeholder="请选择">
            <el-option label="维修" value="维修"></el-option>
            <el-option label="保养" value="保养"></el-option>
            <el-option label="巡检" value="巡检"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="开始时间">
          <el-col class="time-date-picker" :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ticketForm.startTime.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ticketForm.startTime.time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-col class="time-date-picker" :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ticketForm.endTime.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ticketForm.endTime.time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="检查时间">
          <el-col class="time-date-picker" :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ticketForm.checkTime.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ticketForm.checkTime.time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="ticketForm.remark"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input type="textarea" v-model="ticketForm.problem"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="操作人员">
          <el-input v-model="ticketForm.operator"></el-input>
        </el-form-item>
        <el-form-item label="监护人员">
          <el-input v-model="ticketForm.guardian"></el-input>
        </el-form-item>
        <el-form-item label="值班人员">
          <el-input v-model="ticketForm.dutyLeader"></el-input>
        </el-form-item>
        <el-form-item label="值长">
          <el-input v-model="ticketForm.shiftLeader"></el-input>
        </el-form-item>
        <el-form-item label="说明人员">
          <el-input v-model="ticketForm.explainedPersonnel"></el-input>
        </el-form-item>
        <el-form-item label="检查人员">
          <el-input v-model="ticketForm.checker"></el-input>
        </el-form-item>
      </div>
      <div class="foot-container">
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type="primary" @click="onDistribute">立即下发</el-button>
        </el-form-item>
      </div>

      <!-- <div class="step-container">
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
                class="step-desc-imput"
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
        </el-form>
      </div>

      <div class="item-container">
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
      </div> -->

      <!-- <el-dialog
        title="创建项目步骤"
        :visible.sync="stepVisible"
        width="30%"
        :before-close="handleClose"
      >
        <step></step>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      > -->
    </el-form>

    <!-- <div class="step-table">
      <el-table
        :data="stepList"
        style="width: 100%; margin-bottom: 20px"
        row-key="tableID"
        border
        default-expand-all
        :tree-props="{ children: 'itemList', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="ticketNumber"
          label="操作票据编号"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="stepNumber"
          label="操作步骤编号"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column prop="operationDesc" label="操作描述">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              v-if="scope.row.itemList"
              @click="handleEdit(scope.$index, scope.row)"
              >新增</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ticketForm: {
        companyName: "无虞智能保障系统",
        ticketNumber: "123456789",
        startTime: {
          date: new Date(),
          time: new Date(),
        },
        endTime: {
          date: new Date(),
          time: new Date(),
        },
        remark: "请按照操作提示进行操作",
        operator: "张三",
        guardian: "李四",
        dutyLeader: "王五",
        shiftLeader: "马六",
        ticketType: "维修",
        problem: "无",
        explainedPersonnel: "无",
        checker: "宋七",
        checkTime: {
          date: new Date(),
          time: new Date(),
        },
      },
      stepList: [
        {
          tableID: 1,
          ticketNumber: "123456789",
          stepNumber: "1",
          finishOrderNumber: "1",
          operationDesc: "无",
          finished: false,
          finishTime: {
            date: new Date(),
            time: new Date(),
          },
          itemList: [
            {
              tableID: 2,
              stepNumber: "1",
              operationItemDesc: "无",
              operationItemCode: "0",
            },
            {
              tableID: 3,
              stepNumber: "1",
              operationItemDesc: "无",
              operationItemCode: "0",
            },
          ],
        },
        {
          tableID: 4,
          ticketNumber: "123456789",
          stepNumber: "2",
          finishOrderNumber: "1",
          operationDesc: "无",
          finished: false,
          finishTime: {
            date: new Date(),
            time: new Date(),
          },
          itemList: [],
        },
      ],
      stepForm: {
        ticketNumber: "123456789",
        stepNumber: "1",
        finishOrderNumber: "1",
        operationDesc: "无",
        finished: false,
        finishTime: {
          date: "",
          time: "",
        },
      },
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
      this.$notify({
        title: "创建成功",
        message: "接下来请按需下发操作票",
        type: "success",
      });
    },
    onDistribute() {
      console.log("distribute!");
      this.$notify({
        title: "分配成功",
        message: "接下来请实时监控操作步骤",
        type: "success",
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/style/view/ticket.less");

.ticket-container {
  width: 700px;
}

.time-date-picker {
  margin-right: 20px;
}
</style>
