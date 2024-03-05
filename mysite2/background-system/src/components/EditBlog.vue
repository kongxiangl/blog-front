<template>
  <div>
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <editor
      ref="toastuiEditor"
      :intiaValue="form.editorText"
      height="600px"
      :options="edit"
    />

    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>

    <!-- 文章头像图片上传 -->
    <Upload
      uploadTitle="文章头图"
      v-model="form.thumb"
      style="margin-top: 15px"
    />

    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepand"
      placeholder="请选择文章分类"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div>
      <!-- 发布按钮 -->
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addArticleHandle"
        >{{ button }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn.js";

import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload.vue";
import { getBlogType } from "@/api/blogType";
import { addBlog, getOneBlog, editBlog } from "@/api/blog";
export default {
  props: ["mode"],
  data() {
    return {
      form: {
        title: "", //文章标题
        editorText: "", //文章编辑
        description: "", //文章描述
        select: "", //文章分类
        thumb: "", //文章头像
      },
      blogType: [],
      button: "发布文章", //按钮内容
      edit: { language: "zh-CN" },
    };
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
      this.button = "添加文章";
    });
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      this.button = "编辑文章";
      getOneBlog(this.id).then(({ data }) => {
        this.form = data;

        this.form.select = data.category === null ? "" : data.category.id;

        this.$refs.toastuiEditor.invoke("setHTML", this.form.htmlContent);
      });
    }
  },
  components: {
    editor: Editor,
    Upload,
  },
  methods: {
    addArticleHandle() {
      //1.获取表单内容2.提交给服务器
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      //toc根据markdown生成 thumb可以没有

      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        // 发送服务器
        if (this.mode === add) {
          addBlog(obj).then((res) => {
            this.$router.push("/articlemanage/list");
          });
        } else {
          editBlog(obj).then((res) => {
            this.$router.push("/articlemanage/list");
          });
        }
      } else {
        this.$message.error("请填写全部信息");
      }
    },
  },
};
</script>
