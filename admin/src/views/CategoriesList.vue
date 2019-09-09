<template>
  <div class>
    <h1>CATEGORY List</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="Class ID" width="250"></el-table-column>
      <el-table-column prop="parent.name" label="Parent Class" width="250"></el-table-column>
      <el-table-column prop="name" label="Class name" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editClass(scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeClass(scope.row, index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      var res = await this.$http.get("categories");
      this.items = res.data;
    },
    editClass(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
    async removeClass(row, index) {
      console.log(index);
      this.$confirm(`删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`categories/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>