<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
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
      this.$http.get("rest/categories").then(res => {
        console.log(res);
        this.items = res.data;
      });
    },
    // 删除
    remove(e) {
      this.$confirm(`是否确认要删除 "${e.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/categories/${e._id}`)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
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
