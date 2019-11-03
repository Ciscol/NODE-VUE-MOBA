<template>
  <div class>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名字" label-width="120px">
        <el-input v-model="model.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="头像" label-width="120px">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-tabs type="border-card" value="basicMsg">
        <el-tab-pane label="基础信息" name="basicMsg">
          <el-form-item label="称号" label-width="120px">
            <el-input v-model="model.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="职业" label-width="120px">
            <el-select v-model="model.professions" multiple placeholder="请选择">
              <el-option
                v-for="item in professions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" label-width="120px">
            <el-rate
              style="margin-top:0.8rem"
              v-model="model.scores.difficulty"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能" label-width="120px">
            <el-rate style="margin-top:0.8rem" v-model="model.scores.skill" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击" label-width="120px">
            <el-rate style="margin-top:0.8rem" v-model="model.scores.attack" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存" label-width="120px">
            <el-rate style="margin-top:0.8rem" v-model="model.scores.survival" :max="9" show-score></el-rate>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col
              :md="11"
              style="margin-left:2rem;"
              v-for="(item,index) in model.skills"
              :key="index"
            >
              <el-card class="box-card" style="margin-top:2rem;">
                <el-form-item label="名称" label-width="120px">
                  <el-input v-model="item.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="图标" label-width="120px">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => item.icon = res.url"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>

                <el-form-item label="描述" label-width="120px">
                  <el-input v-model="item.description" type="textarea" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="小提示" label-width="120px">
                  <el-input v-model="item.tips" type="textarea" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label-width="120px">
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
          <el-form-item label-width="120px">
            <el-button @click="addSkill" style="margin-top: 1rem;">
              <i class="el-icon-plus"></i>添加技能
            </el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="对战建议">
          <el-form-item label="顺风出装" label-width="120px">
            <el-select v-model="model.EquipRecommen.item1" multiple placeholder="请选择">
              <el-option
                v-for="item in euipments"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" label-width="120px">
            <el-select v-model="model.EquipRecommen.item2" multiple placeholder="请选择">
              <el-option
                v-for="item in euipments"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" label-width="120px">
            <el-input v-model="model.usageTips" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" label-width="120px">
            <el-input v-model="model.combatTips" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" label-width="120px">
            <el-input v-model="model.meleeTips" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item label-width="120px" style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      professions: [],
      euipments: [],
      model: {
        name: "",
        avatar: "",
        title: "",
        professions: [],
        scores: {
          difficulty: 0,
          skill: 0,
          attack: 0,
          survival: 0
        },
        skills: [],
        EquipRecommen: {
          items1: [],
          items1: []
        },
        usageTips: "",
        combatTips: "",
        meleeTips: ""
        // heroRelationship: {
        //   partners: [
        //     {
        //       hero: {},
        //       description: ""
        //     }
        //   ]
        // }
      }
    };
  },
  methods: {
    removeSkill(index) {
      this.$confirm(`删除技能 "${this.model.skills[index].name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.model.skills.splice(index, 1);
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
      this.model.skills.push({
        icon: "",
        name: "",
        description: "",
        tips: ""
      });
    },
    handleAvatarSuccess(res) {
      this.model.avatar = res.url;
      // this.$set(this.model, "avatar", res.url);
    },
    async save() {
      if (!this.model.name || this.model.name.trim().length == 0) {
        return;
      }
      var res = null;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      if (res.status >= 200 && res.status < 300) {
        this.$message({
          type: "success",
          message: "save success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchProfessions() {
      const res = await this.$http.get(`rest/categories`);
      this.professions = res.data;
    },
    async fetchEuipments() {
      const res = await this.$http.get(`rest/items`);
      this.euipments = res.data;
    }
  },
  created() {
    this.fetchProfessions();
    this.fetchEuipments();
    this.id && this.fetch();
  },
  props: {
    id: {}
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 0;
}
.avatar-uploader-icon {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  width: 5rem;
  height: 5rem;
}
</style>