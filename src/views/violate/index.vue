<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button style="visibility: hidden" type="primary" @click="addViolate"
        >+ 新增</el-button
      >
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editViolate"
      @del="delViolate"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getViolate } from "@/api/data";
export default {
  name: "Violate",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "userID",
          label: "用户ID",
          type: "input",
        },
        {
          model: "bookName",
          label: "书名",
          type: "input",
        },
        {
          model: "bookID",
          label: "图书ID",
          type: "input",
        },
        {
          model: "borrowTime",
          label: "借阅时间",
          type: "input",
        },
        {
          model: "expireTime",
          label: "过期时间",
          type: "input",
        },
        {
          model: "overTime",
          label: "过期天数",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        userID: "",
        bookName: "",
        bookID: "",
        borrowTime: "",
        expireTime: "",
        overTime: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
          width: 80,
        },
        // {
        //   prop: "userID",
        //   label: "用户ID",
        // },
        {
          prop: "bookName",
          label: "书名",
        },
        // {
        //   prop: "bookID",
        //   label: "图书ID",
        // },
        {
          prop: "borrowTime",
          label: "借阅时间",
        },
        {
          prop: "expireTime",
          label: "过期时间",
        },
        {
          prop: "overTime",
          label: "过期天数",
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/violate/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/violate/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addViolate() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        userID: "",
        bookName: "",
        bookID: "",
        borrowTime: "",
        expireTime: "",
        overTime: "",
      };
    },
    editViolate(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delViolate(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/violate/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getViolate({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        console.log(res, "res");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
        console.log("this.tableData" + this.tableData.length);
        console.log("this.config.total" + this.config.total);
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
