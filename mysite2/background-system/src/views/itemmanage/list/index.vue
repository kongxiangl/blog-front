<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      v-loading="isListLoading"
      fit
      border
      :data="data"
      element-loading-text="数据加载中"
      highlight-current-low
    >
      <!-- 序号 -->
      <el-table-column width="60" align="center" label="序号">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column width="150" align="center" label="项目名称 ">
        <template slot-scope="scope"
          ><a :href="scope.row.url" target="_blank" class="proName">{{
            scope.row.name
          }}</a></template
        >
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column align="center" label="项目描述 ">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column align="center" label="预览图 " width="150">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb2"
            style="width: 120px"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <!-- github -->
        <template slot-scope="scope">
          <el-tooltip
            content="github"
            effect="dark"
            class="item"
            :hide-after="2000"
            placement="top"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              class="github"
              @click="openGitHubHandle(scope.row)"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>

          <!-- 编辑 -->

          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            :hide-after="2000"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editProjectHandle(scope.row)"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>

          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteProjectHandle(scope.row)"
            ></el-button> </el-tooltip></template
      ></el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称"
          ><el-input v-model="form.name"></el-input
        ></el-form-item>
        <el-form-item label="项目描述(每一项描述要用英文逗号分隔)"
          ><el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目链接"
          ><el-input v-model="form.url"></el-input
        ></el-form-item>
        <el-form-item label="github地址"
          ><el-input v-model="form.github"></el-input
        ></el-form-item>
        <el-form-item label="缩略图"
          ><Upload v-model="form.thumb"
        /></el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option
              label="5"
              value="5"
            ></el-option> </el-select></el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditHandle">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
import { getProject, setProject, delProject } from "@/api/project.js";
import { urlBase } from "@/urlBase";
import Upload from "@/components/Upload";
export default {
  data() {
    return {
      data: [], //存放数据
      isListLoading: false,
      srcList: [], //放大图片的数组
      dialogFormVisible: false, //编辑对话框是否可见
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
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isListLoading = true;
      getProject().then(({ data }) => {
        this.data = data;
        for (let i of this.data) {
          i.thumb2 = urlBase + i.thumb;
          this.srcList.push(i.thumb2);
        }
        this.isListLoading = false;
      });
    },
    deleteProjectHandle(projectInfo) {
      this.$confirm("是否删除该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(projectInfo.id).then(() => {
            this.fetchData();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      this.form = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
    },
    openGitHubHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    confirmEditHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);
      setProject(obj.id, obj).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("编辑成功");
      });
    },
  },
};
</script>

<style>
.proName:hover {
  color: rgb(163, 163, 163);
}
.github {
  background: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>
