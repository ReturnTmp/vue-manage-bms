<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <div
      style="
        display: flex;
        justify-content: left;
        gap: 10px;
        margin-left: 100px;
      "
    >
      <el-tag>图书OCR识别</el-tag>
      <el-tag>
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          accept="image/jpeg,image/gif,image/png"
          action="#"
          :show-file-list="false"
          :on-change="onUploadChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
      ></el-tag>
    </div>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
import Tesseract from "tesseract.js";
export default {
  name: "BorrowForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    onUploadChange(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let that = this;
      reader.onload = function (e) {
        console.log(this.result);
        let blob = that.base64ToBlob(this.result);
        that.identifyBookInfo(blob);
      };
    },
    base64ToBlob(base64) {
      let arr = base64.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    /**
     * 识别图书信息（废弃）
     * 仅供实验使用（图片路径/static/main.jpg）
     * @param {} image
     */
    identifyBookInfo(image) {
      // 支持语言 https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
      let text =
        "图 书 在 版 编 目 (CLIP) 数 据六 级 英 语 新 大 纲 词 汇 表 / 新 东 方 考 试 研 究 中 心 编 著, 一 杭 州 : 浙 江 教 育 出 版 社 ,2016.12 ( 2022.3 重 印 J ,ISBN 978-7 一 e el ' 〈 0 ′′薯′'^′′'[ , D 六 … [ @ 新 … fL, D 大 学 英 语 水 平 老 试 词汇 一 自 学 参 考 资 料 四 DHS3 巩中 国 版 本 图 书 馆 CIP 数 据 核 字 ( 2016 ) 第 177219 号";
      const bookNameReg = /图 书 在 版 编 目 (CLIP) /;
      let that = this;
      Tesseract.recognize(image, "chi_sim", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        console.log(text);
        let bookName = text.slice(19, 40);
        let ISBN = text.slice(120, 140);
        console.log(bookName);
        console.log(ISBN);
        that.form.name = bookName;
        that.form.isbn = ISBN;
      });
    },
  },
};
</script>
