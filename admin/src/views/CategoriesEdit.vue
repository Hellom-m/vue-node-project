<template>
  <div>
    <h2>{{id?'编辑':'新建'}}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
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
        await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("categories", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/categories/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`categories/${this.id}`).then(res => {
        this.model = res.data;
      });
    },

    getParents() {
      this.$http.get("categories").then(res => {
        this.parents = res.data;
      });
    }
  },
  created() {
    this.getParents();
    this.id && this.fetch();
  },
  components: {}
};
</script>

<style  lang="scss" scoped>
</style>
