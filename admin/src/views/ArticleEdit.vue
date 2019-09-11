<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="所属分类" label-width="120px">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" label-width="120px">
        <el-input v-model="model.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="120px">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item label-width="120px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      model: {
        categories: [],
        title: "",
        body: ""
      },
      categories: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (!this.model.title || this.model.title.trim().length == 0) {
        return;
      }
      var res = null;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      if (res.status >= 200 && res.status < 300) {
        this.$message({
          type: "success",
          message: "save success"
        });
        //  } else {
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  props: {
    id: {}
  }
};
</script>