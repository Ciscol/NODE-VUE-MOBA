<template>
  <div class>
    <h1>ITEM List</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="Item ID" width="250"></el-table-column>
      <el-table-column label="Icon" width="250">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt style="height:3rem;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Item name" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editItem(scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeItem(scope.row)">删除</el-button>
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
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    editItem(id) {
      this.$router.push(`/items/edit/${id}`);
    },
    async removeItem(row) {
      this.$confirm(`删除物品 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/items/${row._id}`);
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