<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form @submit.native.prevent="save">
      <!-- <el-form-item label="Name">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="Name">
        <el-input v-model="model.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="Icon">
        <!-- <el-input v-model="model.icon" placeholder="请输入"></el-input>
      </el-form-item>
        <el-form-item>-->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    async save() {
      if (
        !this.model.name ||
        this.model.name.trim().length == 0 ||
        !this.model.icon ||
        this.model.icon.trim().length == 0
      ) {
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>