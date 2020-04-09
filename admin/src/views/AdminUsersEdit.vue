<template>
  <div>
    <h2>{{id?'编辑':'新建'}}管理员</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUsersEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: {}
    };
  },
  methods: {
    // 保存
    async save() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("rest/admin_users", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/admin_users/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`rest/admin_users/${this.id}`).then(res => {
        this.model = res.data;
      });
    },
  },
  created() {
    this.id && this.fetch();
  },
  components: {}
};
</script>

<style  lang="scss" scoped>
</style>
