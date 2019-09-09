<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="Name">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="model.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: "",
        parent: ""
      },
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.model.name.trim().length == 0) {
        return;
      }
      var res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "save success"
      });
    },
    async fetch() {
      var res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      var res = await this.$http.get(`categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  props: {
    id: ""
  }
};
</script>