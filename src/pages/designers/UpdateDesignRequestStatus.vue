<template>
  <div id="product">
    <!-- breadcrumb -->
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <router-link :to="{ name: 'DesignersDashboard' }" class="text-gray-700">
            Home
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>

        <li class="flex items-center">
          <router-link :to="{ name: 'DesignersDashboard' }" class="text-gray-700">
            Designer
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>


        <li class="flex items-center">
          <router-link :to="{ name: 'DesignRequests' }" class="text-gray-600">
          Design Requests
          </router-link>
        </li>

      </ol>
    </nav>
    <!-- breadcrumb end -->

    <div class="flex flex-wrap">
      <div class="w-full">
        <p class="text-xl font-semibold mb-4">Design Request Detail - ID - #{{designRequest.id}}</p>

        <div class="w-full bg-white border text-blue-400 rounded-lg mb-5">

          <div class="grid grid-cols-2 gap-2">

            xx

          </div>

        </div>


        <div class="grid grid-cols-2 gap-2">
          <div class="w-full bg-white border text-blue-400 rounded-lg">
            <div class="p-6 mb-6 xl:mb-0">
              <el-form ref="form" :model="designRequest" label-width="220px" class="w-full">

                <el-form-item label="Status">
                  <el-select class="w-full" v-model="status_by_designer" value-key="designRequest.status_by_designer" placeholder="Select">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


                <el-form-item label="Comments">
                  <el-input type="textarea"  v-model="comments"></el-input>
                </el-form-item>

                <el-form-item label="Attachment">
                  <el-upload
                      class="upload-demo"
                      :action="fileUploadAction"
                      :before-remove="beforeRemove"
                      :on-success="bindAttachmentFileName"
                      multiple
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file="attachment">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>


                <el-form-item>
                  <el-button icon="el-icon-edit" type="primary" v-on:click="updateStatus">Submit</el-button>
                </el-form-item>
              </el-form>
            </div>


          </div>
          <div class="w-full bg-white border text-blue-400 rounded-lg">
            <div class="p-6 mb-6 xl:mb-0">

              <div class="box-border h-32 w-32 p-4 border-4">
              <!-- ... -->
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
name: "UpdateDesignRequestStatus",
  data() {
    return  {
      fileUploadAction: process.env.VUE_APP_API_URL + "/dyo/upload-file",
      options: [{
        value: 1,
        label: 'Pending'
      }, {
        value: 2,
        label: 'Work in Progress'
      }, {
        value: 3,
        label: 'Completed'
      }],
      designRequest: {},
      status_by_designer: '',
      comments : '',
      attachment: ''
    }

  },
  methods: {
    ...mapActions('designRequest', ['fetchDesignRequest','updateDesignerStatus']),

    async fetchDesignRequestHandler(recordId) {
      this.designRequest = await this.fetchDesignRequest(recordId);
      this.status_by_designer = this.designRequest.status_by_designer;
    },
    async updateStatus() {
      await this.updateDesignerStatus({
        'id': this.designRequest.id,
        'data': {
          status_by_designer: this.status_by_designer,
          designer_comments: this.comments,
          designer_attachment: this.attachment,
        }
      });
      this.$message.success("The status has been updated successfully.")
      return this.$router.push({ name: "DesignRequest", params: {id: this.designRequest.id}});
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfer of ${ file.name } ?`);
    },
    bindAttachmentFileName(file) {
      this.attachment = file.path;
    }
  },
  async mounted() {
    await this.fetchDesignRequestHandler(this.$route.params.id);
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.item-img {
  width: 150px;
  height: auto;
  float: left;
}

</style>
