<template>
  <div class>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="名称" width="250"></el-table-column>
      <el-table-column prop="body" label="详情" width="400"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editClass(scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeClass(scope.row)">删除</el-button>
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
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    editClass(id) {
      this.$router.push(`/articles/edit/${id}`);
    },
    async removeClass(row) {
      this.$confirm(`删除文章 《${row.title}》`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.delete(`rest/articles/${row._id}`);
          if (res.status >= 200 && res.status < 300) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
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