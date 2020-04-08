<template>
  <div>
    <h2>{{id?'编辑':'新建'}}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- $http.defaults: 表示 http 中的默认参数 -->
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.6rem;"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})">
            <i class="class el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroesEdit",
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skill: 0,
          attack: 0,
          survive: 0
        },
        skills: []
      }
    };
  },
  methods: {
    // 保存
    async save() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("rest/heroes", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/heroes/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`rest/heroes/${this.id}`).then(res => {
        // 解决: 绑定属性层级报错的问题 => v-model="model.scores.difficult"
        // 第一种: es6 ...扩展运算符
        this.model = { ...this.model, ...res.data };
        // 第二种: Object.assign()方法用于将所有可枚举属性的值从一个或者多个源对象复制到目标对象
        // this.model = Object.assign({}, this.model, res.data);
      });
    },
    // 获取英雄的类型
    fetchCategoires() {
      this.$http.get(`rest/categories`).then(res => {
        this.categories = res.data;
      });
    },
    // 获取英雄技能
    fetchItems() {
      this.$http.get(`rest/items`).then(res => {
        this.items = res.data;
      });
    },
    // 上传图片后的回显
    afterUpload(res) {
      this.model.avatar = res.url;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategoires();
    this.id && this.fetch();
  },
  components: {}
};
</script>

<style>

</style>
