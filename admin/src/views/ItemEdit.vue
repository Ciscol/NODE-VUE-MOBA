<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}装备</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="120px">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      if (!this.model.name || this.model.name.trim().length == 0) {
        return;
      }
      var res = null;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      if (res.status >= 200 && res.status < 300) {
        this.$message({
          type: "success",
          message: "save success"
        });
        //  } else {
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    handleAvatarSuccess(res) {
      // this.model.icon = res.url;
      this.$set(this.model, "icon", res.url);
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

