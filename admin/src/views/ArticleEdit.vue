<template>
  <div>
    <h2>{{id?'编辑':'新建'}}文章</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "ArticeEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    // 改写 editor 中的上传方法
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      this.$http.post("upload", formData).then(res => {
        let url = res.data.url; 
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    // 保存
    async save() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("rest/articles", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/articles/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`rest/articles/${this.id}`).then(res => {
        this.model = res.data;
      });
    },

    getCategories() {
      this.$http.get("rest/categories").then(res => {
        this.categories = res.data;
      });
    }
  },
  created() {
    this.getCategories();
    this.id && this.fetch();
  },
  components: {
    VueEditor
  }
};
</script>

<style  lang="scss" scoped>
</style>
