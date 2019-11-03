<template>
  <div class="login-container">
    <el-header height="20">
      后台管理
    </el-header>
    
    <el-card header="请登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名" label-width="4rem">
          <el-input v-model="model.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="4rem">
          <el-input v-model="model.password" show-password placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label-width="10rem">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
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
    async login() {
      if (
        !this.model.username ||
        !this.model.password ||
        this.model.username.trim().length == 0 ||
        this.model.password.trim().length == 0
      ) {
        this.$message("用户名和密码不能为空");
        return;
      }
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/main");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  }
};
</script>

<style >
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>

