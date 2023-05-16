<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增图书' : '更新图书'"
      :visible.sync="isShow"
    >
      <borrow-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></borrow-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addBook">+ 新增</el-button>
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
      @edit="editBook"
      @del="delBook"
    ></common-table>
  </div>
</template>
<script>
/**
 * 藏书管理
 */
import BorrowForm from "@/components/BorrowForm.vue";
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getBook } from "@/api/data";
export default {
  name: "Book",
  components: {
    BorrowForm,
    CommonTable,
    CommonForm,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "书名",
          type: "input",
        },
        {
          model: "bookid",
          label: "图书ID",
          type: "input",
        },
        {
          model: "author",
          label: "作者",
          type: "input",
        },
        {
          model: "isbn",
          label: "ISBN",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        bookid: "",
        author: "",
        isbn: "",
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
          label: "书名",
        },
        {
          prop: "bookid",
          label: "图书ID",
        },
        {
          prop: "author",
          label: "作者",
        },
        {
          prop: "isbn",
          label: "ISBN",
          width: 200,
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
        this.$http.post("/book/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/book/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addBook() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        bookid: "",
        author: "",
        isbn: "",
      };
    },
    editBook(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delBook(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/book/del", {
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
      getBook({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        console.log(res, "res");
        this.tableData = res.list;
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
    console.log(randomDate(new Date(2012, 0, 1), new Date(2012, 1, 1)));
    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }

    function daysBetween(date1, date2) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
      return diffDays;
    }
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
