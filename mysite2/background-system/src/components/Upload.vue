<template>
  <div class="container">
    <div class="title">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="ImgSrc" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { urlBase } from "@/urlBase";
export default {
  props: ["uploadTitle", "value"],
  computed: {
    ImgSrc() {
      if (this.value) {
        return urlBase + this.value;
      }
    },
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
