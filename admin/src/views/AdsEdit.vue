<template>
  <div>
    <h2>{{id?'编辑':'新建'}}广告位</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})">
          <i class="class el-icon-plus">添加技能</i>
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接（url）">
              <el-input v-model="item.url" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:2rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + 'upload'"
                :show-file-list="false"
                :on-success="res => $set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdsEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    // 保存
    async save() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("rest/ads", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/ads/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`rest/ads/${this.id}`).then(res => {
        this.model = res.data;
      });
    }
  },
  created() {
    this.id && this.fetch();
  },
  components: {}
};
</script>

<style  lang="scss" scoped>
</style>
