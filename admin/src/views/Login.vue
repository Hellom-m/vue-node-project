<template>
  <div class="login-contanier">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login()">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      await this.$http.post("login", this.model).then(res => {
        console.log(res);
        // 关闭当前浏览器 token就没了
        sessionStorage.token = res.data.token;
        // 关闭后下次再登录 token 仍然在
        localStorage.token = res.data.token;

        this.$router.push("/");
        this.$message.success("登录成功");
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>
