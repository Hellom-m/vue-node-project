<template>
  <div>
    <h2>新建分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoriesEdit",
  data() {
    return {
      model: {}
    };
  },
  methods: {
      save(){
          this.$http.post();
      }
  },
  components: {}
};
</script>

<style  lang="scss" scoped>
</style>
