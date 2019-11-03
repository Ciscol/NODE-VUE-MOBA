<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="广告" label-width="120px">
        <el-row type="flex" style="flex-wrap:wrap;">
          <el-col :md="24" v-for="(item,index) in model.items" :key="index">
            <el-card class="box-card" style="margin-bottom:1rem;">
              <el-form-item label="图片" label-width="80px">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => item.imageUrl = res.url"
                >
                  <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="跳转链接" label-width="80px">
                <el-input v-model="item.directionUrl" placeholder="请输入"></el-input>
              </el-form-item>

              <el-form-item label-width="80px">
                <el-button
                  type="danger"
                  size="small"
                  @click="removeSkill(index)"
                  style="margin-top: 1rem;"
                >
                  <i class="el-icon-delete"></i>删除
                </el-button>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-button size="small" @click="addSkill">
          <i class="el-icon-plus"></i>添加广告项
        </el-button>
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
      model: {
        name: "",
        items: []
      }
    };
  },
  methods: {
    removeSkill(index) {
      this.$confirm(`删除广告项?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.model.items.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addSkill() {
      this.model.items.push({
        imageUrl: "",
        directionUrl: ""
      });
    },
    async save() {
      if (!this.model.name || this.model.name.trim().length == 0) {
        return;
      }
      var res = null;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      if (res.status >= 200 && res.status < 300) {
        this.$message({
          type: "success",
          message: "save success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
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

<style scoped>
.avatar-uploader-icon {
  width: 20rem;
  height: 20rem;
  line-height: 20rem;
}
.avatar {
  width: auto;
  height: 20rem;
}
</style>