<template>
  <div>
    <h2>{{id?'编辑':'新建'}}物品</h2>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="物品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- $http.defaults: 表示 http 中的默认参数 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ItemEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        icon: ""
      }
    };
  },
  methods: {
    // 保存
    async save() {
      if (this.id) {
        // 编辑修改
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // 新建
        await this.$http.post("rest/items", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/items/list");
    },

    // 编辑获取详情
    fetch() {
      this.$http.get(`rest/items/${this.id}`).then(res => {
        this.model = res.data;
      });
    },
    // 上传图片后的回显
    afterUpload(res) {
      this.model.icon = res.url;
    }
  },
  created() {
    this.id && this.fetch();
  },
  components: {}
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
