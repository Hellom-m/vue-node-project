<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoriesList",
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetch() {
      console.log(1);
      this.$http.get("/categories").then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.fetch();
  },
  components: {}
};
</script>

<style  lang="scss" scoped>
</style>
