<template>
  <div class="bloglist-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">{{
          scope.$index + 1 + (currentPage - 1) * eachPage
        }}</template>
      </el-table-column>
      <el-table-column label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thump"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              slot="reference"
              @click.prevent="goToTitleHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="浏览数" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column label="评论量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column label="所属分类" width="150" align="center">
        <template v-if="scope.row.category" slot-scope="scope">{{
          scope.row.category.name
        }}</template>
      </el-table-column>
      <el-table-column label="创建日期" width="230" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
              @click="editBlogHandle(scope.row)"
              circle
              size="mini"
            ></el-button> </el-tooltip
          ><el-tooltip
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
              @click="deleteBlog(scope.row)"
            ></el-button> </el-tooltip></template
      ></el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="count"
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      @size-change="sizeChangeHandler"
      @current-change="currentChangeHandler"
      @prev-click="prevClickHandler"
      @next-click="nextClickHandler"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog.js";
import { formate } from "@/utils/tool.js";
import { urlBase, frontEnd_URL } from "@/urlBase";
export default {
  data() {
    return {
      data: [],

      currentPage: 1, //表示当前页数，
      eachPage: 5, //每页的个数
      srcList: [],
      count: 0, //总共的数据
      totalPage: 0, //总页数
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;

        for (var i of this.data) {
          i.createDate = formate(i.createDate);
          i.thumb = urlBase + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);

        if (this.totalPage < this.currentPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    goToTitleHandle(info) {
      //浏览器打开页面
      window.open(`${frontEnd_URL}/blog/${info.id}`);
    },
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除，是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
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
    sizeChangeHandler(pageNum) {
      this.eachPage = parseInt(pageNum);
      this.currentPage = 1;

      this.fetchData();
    },
    currentChangeHandler(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandler() {
      this.currentPage--;
    },
    nextClickHandler() {
      this.currentPage++;
    },
    editBlogHandle(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
  },
};
</script>

<style></style>
