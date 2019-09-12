<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="用户名" label-width="120px">
        <el-input v-model="model.username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input v-model="model.password" show-password placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label-width="120px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      if (!this.model.username || this.model.username.trim().length == 0) {
        return;
      }
      var res = null;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      if (res.status >= 200 && res.status < 300) {
        this.$message({
          type: "success",
          message: "save success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  },
  props: {
    id: {}
  }
};
</script>