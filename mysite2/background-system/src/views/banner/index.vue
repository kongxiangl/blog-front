<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{
          scope.row.description
        }}</template></el-table-column
      >

      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg2"
            fit="fill"
          ></el-image></template
      ></el-table-column>

      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope"
          ><el-image
            style="width: 100px"
            :src="scope.row.bigImg2"
            fit="fill"
          ></el-image></template
      ></el-table-column>

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
              @click="editBannerHandle(scope.row)"
              circle
              size="mini"
            ></el-button> </el-tooltip></template
      ></el-table-column>
    </el-table>

    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
import { urlBase } from "@/urlBase";
import Upload from "@/components/Upload.vue";
export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
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
      getBanner().then((res) => {
        this.data = res.data;
        for (var item of this.data) {
          item.midImg2 = urlBase + item.midImg;
          item.bigImg2 = urlBase + item.bigImg;
        }
      });
    },
    editBannerHandle(info) {
      this.dialogFormVisible = true;

      this.form = { ...info };
    },
    editBannerConfirm() {
      //就算需要改一组数据，也要传三组数据
      let arr = [...this.data];
      console.log(this.form);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
        }
      }

      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;

        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
      });
    },
  },
};
</script>

<style></style>
