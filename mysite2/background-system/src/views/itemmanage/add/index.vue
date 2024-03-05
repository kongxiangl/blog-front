<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <div style="margin-bottom: 15px">
      <el-input placeholder="请输入项目名称" v-model="form.name"></el-input>
    </div>
    <div class="block">项目描述(每一项描述要用英文逗号分隔)</div>
    <div style="margin-bottom: 15px">
      <el-input
        placeholder="请输入项目描述(每一项描述要用英文逗号分隔)"
        v-model="form.description"
      ></el-input>
    </div>
    <div class="block">项目链接</div>
    <div style="margin-bottom: 15px">
      <el-input placeholder="请输入项目链接" v-model="form.url"></el-input>
    </div>
    <div class="block">github地址</div>
    <div style="margin-bottom: 15px">
      <el-input placeholder="请输入github地址" v-model="form.github"></el-input>
    </div>
    <div class="block">缩略图</div>
    <div style="margin-bottom: 15px">
      <Upload UploadTitle="缩略图" v-model="form.thumb" />
    </div>
    <div class="block">排序等级</div>
    <div style="margin-bottom: 15px">
      <el-select v-model="form.order">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>
    <el-button type="primary" plain @click="addProjectHandle"
      >发布项目</el-button
    >
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { addProject } from "@/api/project.js";
export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    addProjectHandle() {
      let obj = { ...this.form };
      obj.description = obj.description.split(",");
      obj.order = parseInt(obj.order);
      addProject(obj).then(() => {
        this.$router.push("/itemmanage/list");
        this.$message.success("添加项目成功");
      });
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
