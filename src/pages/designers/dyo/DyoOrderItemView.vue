<template>
  <div id="product">
    <!-- breadcrumb -->
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <router-link :to="{ name: 'DesignersDashboard' }" class="text-gray-700">
            Home
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
        </li>

        <li class="flex items-center">
          <router-link :to="{ name: 'DesignersDashboard' }" class="text-gray-700">
            Designer
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
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
        <p class="text-xl font-semibold mb-4 float-left">Order Item - {{ orderItem.product_name }}</p>
        <p class="text-xl font-semibold mb-4 float-right">
          <el-tag type="info mr-5">Created on : {{ order.created_at }}</el-tag>
          <strong>Status </strong> :
          <el-button type="info" icon="el-icon-thumb" size="mini" v-if="designAttributes.status_by_designer === 4">Estimated By Designer
          </el-button>
          <el-button type="primary" icon="el-icon-data-line" size="mini" v-if="designAttributes.status_by_customer === 1">Estimation Approved
          </el-button>
          <el-button type="success" icon="el-icon-finished" size="mini" v-if="designAttributes.status_by_designer === 3">Completed.
          </el-button>
        </p>
      </div>

      <div class="w-full bg-white border text-blue-400 rounded-lg pt-6 pb-6 pl-6 pr-1 mb-6 xl:mb-0">

        <div class="w-full">
          <div class="grid grid-cols-2 gap-2">
            <div class="print-tees-wrapp">
              <div class="tees-design-wrapp">
                <img class="tees-design-main" :src="productImageFront"/>
                <div
                    class="embroidery-print-area"
                    :style="{
                                width: designAttributes.front_printable_area_values.width + 'px',
                                height: designAttributes.front_printable_area_values.height + 'px',
                                top: designAttributes.front_printable_area_values.top + 'px',
                                left: designAttributes.front_printable_area_values.left + 'px',
                            }"
                >

                  <div v-if="designAttributes.front_text_sample != null"
                       class="print-area-set-text"
                       :style="{
                                    color: designAttributes.color_name,
                                    fontSize: (designAttributes.front_text_front_size * 4) + 'px',
                                    fontFamily: designAttributes.front_text_front_name + ',' + ' ' + 'cursive',
                                    letterSpacing: designAttributes.front_text_front_space
                                }"
                  >
                    {{designAttributes.front_text_sample}}
                  </div>
                  <div
                      class="print-area-set-image"
                      :style="{
                                    width: designAttributes.front_image_position_values.width + 'px',
                                    height: designAttributes.front_image_position_values.height + 'px',
                                }"
                  >
                    <drr :x=designAttributes.front_image_position_values.left
                         :y=designAttributes.front_image_position_values.top
                         :w=designAttributes.front_image_position_values.width
                         :h=designAttributes.front_image_position_values.height
                         :angle="designAttributes.front_image_position_values.angle"
                         :draggable="false"
                         :resizable="false"
                         :rotatable="false"
                    >
                    <img :src="frontImageUrl" alt="default" class="image_holder" />
                    </drr>
                  </div>

                </div>
              </div>
            </div>

            <div class="print-tees-wrapp">
              <div class="tees-design-wrapp">
                <img class="tees-design-main" :src="productImageBack"/>
                <template v-if="designAttributes.back_printable_area_values != null">
                <div
                    class="print-area-set"
                    :style="{
                                width: designAttributes.back_printable_area_values.width + 'px',
                                height: designAttributes.back_printable_area_values.height + 'px',
                                top: designAttributes.back_printable_area_values.top + 'px',
                                left: designAttributes.back_printable_area_values.left + 'px',
                            }"
                >

                  <div v-if="designAttributes.back_text_sample != null"
                       class="print-area-set-text"
                       :style="{
                                    color: designAttributes.back_text_front_color,
                                    fontSize: (designAttributes.back_text_front_size * 4) + 'px',
                                    fontFamily: designAttributes.back_text_front_name + ',' + ' ' + 'cursive',
                                    letterSpacing: designAttributes.back_text_front_space,
                                    width: designAttributes.back_text_position_values.width + 'px',
                                    height: designAttributes.back_text_position_values.height + 'px',
                                    top: designAttributes.back_text_position_values.top + 'px',
                                    left: designAttributes.back_text_position_values.left + 'px',
                                }"
                  >
                    {{designAttributes.back_text_sample}}
                  </div>
                  <div v-if="designAttributes.back_image_name != null"
                      class="print-area-set-image"
                      :style="{
                                    width: designAttributes.back_image_position_values.width + 'px',
                                    height: designAttributes.back_image_position_values.height + 'px',
                                }"
                  >
                    <img :src="backImageUrl" alt="default" />
                  </div>

                </div>
                </template>
              </div>
            </div>

          </div>
        </div>

        <div class="w-full">
          <div>
            <p><strong>Item Color: </strong>{{designAttributes.color_name}} ({{get_pantone_number(designAttributes.color_name)}})</p>
          </div>

          <div>
            <p><strong>Image Colors: </strong>
              <ul style="display: inline-flex;">
              <li v-for="(image_color, index) in designAttributes.front_image_colors" :key="index">
                {{image_color}},
              </li>
          </ul>
            </p>
          </div>



          <div v-if="designAttributes.front_image_name != null">
            <p><strong>Front Image : </strong> {{designAttributes.front_image_name}}</p>
          </div>

          <div v-if="designAttributes.back_image_name != null">
            <p><strong>Back Image : </strong> {{designAttributes.back_image_name}}</p>
          </div>

          <p><strong>Working File : </strong>

            <a :href="attachmentBaseUrl + 'dyo/' +  designAttributes.working_file" target="_blank">
              {{designAttributes.working_file}}
            </a>

            /

            <a :href="designAttributes.working_file_url" target="_blank">
              {{designAttributes.working_file_url}}
            </a>

          </p>

        </div>

        <div class="w-full">
          <el-tabs type="border-card" class="mt-6">
            <el-tab-pane label="Job Status & Changes">
              <div class="block w-full">

                <div class="block w-full">

                  <el-timeline>
                    <el-timeline-item placement="top" v-for="(item, index) in designAttributes.statuses" :key="index" :timestamp=item.created_at>
                      <h3>The message added by {{item.user.first_name }} {{item.user.last_name }} ({{item.user.email}})</h3>
                      <p class="mt-5"><strong> Title : </strong>{{ item.title }}
                        <span v-if="item.title == 'Estimated'">{{ item.estimation }} Hours</span>
                      </p>
                      <p class="mt-5" v-if="item.title == 'Status Changed'">
                        <strong> Current Status : </strong>
                        <template v-if="item.status == 3">
                          Completed
                        </template>
                        <template v-if="item.status == 4">
                          Estimated
                        </template>
                      </p>
                      <p class="mt-5"><strong> Message : </strong>{{ item.body }}</p>
                      <p class="mt-5"><strong>Attachment : </strong>
                        <a :href="attachmentBaseUrl + 'dyo/' +  item.attachment" target="_blank">
                        {{ item.attachment }} Download
                        </a>
                      </p>
                    </el-timeline-item>
                  </el-timeline>

                </div>


                <el-form ref="form" label-width="120px" size="mini" class="mt-5 w-1/2" :model="designer_form">

                  <el-form-item label="Status">
                    <el-select class="w-full" v-model="designer_form.status_by_designer" value-key="designer_form.status_by_designer" placeholder="Select">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Estimation" v-if="designer_form.status_by_designer == 4">

                    <el-radio
                        v-for="estimation in estimationOptions"
                        :key="estimation.value"
                        v-model="designer_form.estimation" :label="estimation.value">
                      {{estimation.label}}
                    </el-radio>
                  </el-form-item>

                  <el-form-item label="Comments">
                    <el-input type="textarea"  v-model="designer_form.comments"></el-input>
                  </el-form-item>


                  <el-form-item label="Attachment" v-if="designer_form.status_by_designer != 4">
                    <el-upload
                        class="upload-demo"
                        :action="fileUploadAction"
                        :before-remove="beforeRemove"
                        :on-success="bindAttachmentFileName"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file="designer_form.attachment">
                      <el-button size="mini">Click to upload</el-button>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="Source file">
                    <el-input type="textarea"  v-model="designer_form.source_file"></el-input>
                  </el-form-item>



                  <el-form-item size="large">
                    <el-button type="primary" v-on:click="updateStatus">Update</el-button>
                    <el-button>Cancel</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Message To Customer">
              <div class="block w-full">
                <el-timeline>
                  <el-timeline-item placement="top" v-for="(item, index) in designAttributes.comments" :key="index" :timestamp=item.created_at>
                    <h3>The message added by {{item.user.first_name }} {{item.user.last_name }} ({{item.user.email}})</h3>
                    <p class="mt-5"><strong> Message : </strong>
                      <span v-html="item.body">

                      </span>
                    </p>
                    <p class="mt-5"><strong>Attachment : </strong><a :href="item.attachment">
                      {{ item.attachment }} Download</a></p>
                  </el-timeline-item>
                </el-timeline>
              </div>


              <el-form ref="form" :model="designer_comment_form" label-width="220px" class="w-full">


                <el-form-item label="Comment Type">
                  <el-radio v-model="designer_comment_form.commentType" label="1">Working file is missing</el-radio>
                  <el-radio v-model="designer_comment_form.commentType" label="2">Customer doesn’t have Illustrator</el-radio>
                  <el-radio v-model="designer_comment_form.commentType" label="3">Customer sends the wrong format</el-radio>
                  <el-radio v-model="designer_comment_form.commentType" label="5">Need reference images.</el-radio>
                  <el-radio v-model="designer_comment_form.commentType" label="7">Number of colours exceed.</el-radio>
                </el-form-item>

                <el-form-item label="Comments">
                  <el-input type="textarea"  v-model="designer_comment_form.comments"></el-input>
                </el-form-item>

                <el-form-item label="Attachment">
                  <el-upload
                      class="upload-demo"
                      :action="fileUploadAction"
                      :before-remove="beforeRemove"
                      :on-success="bindCommentAttachmentFileName"
                      multiple
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file="designer_comment_form.attachment">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </el-form-item>


                <el-form-item>
                  <el-button icon="el-icon-edit" type="primary" v-on:click="addComment">Submit</el-button>
                </el-form-item>
              </el-form>


            </el-tab-pane>
          </el-tabs>
        </div>

      </div>


    </div>



  </div>

</template>

<script>
import {mapActions} from "vuex";
import {getSlug} from "@/helpers/getSlug"
import drr from '@minogin/vue-drag-resize-rotate';

export default {
  name: "DyoOrderView",
  data() {
    return {
      fileUploadAction: process.env.VUE_APP_API_URL + "/dyo/upload-file",
      attachmentBaseUrl: process.env.VUE_APP_ATTACHMENT_BASE_URL,
      order: {},
      orderItem: {},
      status: '',
      tax: '',
      designAttributes: {},
      productImageFront: '',
      productImageBack: '',
      frontImageUrl: '',
      backImageUrl: '',
      designer_comment_form: {
        comments : '',
        attachment: '',
        commentType: '',
      },
      designer_form: {
        status_by_designer: 3,
        comments : '',
        attachment: '',
        estimation: '',
        source_file: ''
      },
      options: [
          {
            value: 4,
            label: 'Send Estimation'
          },
          {
            value: 3,
            label: 'Completed'
          }],
      estimationOptions: [
        {
          value: 24,
          label: '24 Hrs'
        },
        {
          value: 48,
          label: '48 Hrs'
        },
        {
          value: 72,
          label: '72 Hrs'
        },
      ],
    }
  },
  components: {
    drr
  },
  methods: {
    ...mapActions('order', ['fetchOrder', 'fetchOrderItem']),
    ...mapActions('dyo', ['fetchDesign', 'updateDesignerStatus']),
    ...mapActions('comment', ['storeComment']),
    ...mapActions('product', ['fetchProduct']),
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfer of ${ file.name } ?`);
    },

    bindCommentAttachmentFileName(file) {
      this.designer_comment_form.attachment = file.path;
    },
    bindAttachmentFileName(file) {
      this.designer_form.attachment = file.path;
    },

    addComment() {
      this.storeComment({
        commentable_obj_id: this.designAttributes.id,
        commentable_obj: 'CustomDesign',
        comments: this.designer_comment_form.comments,
        attachment: this.designer_comment_form.attachment,
        comment_type: this.designer_comment_form.commentType
      }).then(async ()=>{
        this.designAttributes = await this.fetchDesign(this.orderItem.custom_design_id);
        this.designer_comment_form.comments = '';
        this.designer_comment_form.attachment = '';
        this.designer_comment_form.comment_type = '';
        this.$message.success("The message has been sent successfully.")
      }).catch((error) => {
        console.log(error);
      });
    },
    async updateStatus() {

      let id = this.orderItem.custom_design_id;
      this.updateDesignerStatus({
        'id': id,
        'status' : this.designer_form.status_by_designer,
        'estimation' : this.designer_form.estimation,
        'comments' : this.designer_form.comments,
        'attachment' : this.designer_form.attachment,
        'source_file': this.designer_form.source_file,
      }).then((res) => {
        this.designAttributes = res;
        this.designer_form.status_by_designer = '';
        this.designer_form.estimation = '';
        this.designer_form.comments = '';
        this.designer_form.attachment = '';
        this.designer_form.source_file = '';
        this.$message.success("The status has been updated successfully.")
      }).catch(() => {
        this.$message.error("Failed to update the status. Please try again!")
      });
    },
    get_pantone_number(color_name) {
      if (color_name == "Black") {
        return "6 C";
      } else if (color_name == "Black Marle") {
        return "N/A";
      } else if (color_name == "Charcoal") {
        return "418 C";
      } else if (color_name == "Grey Marle") {
        return "N/A";
      } else if (color_name == "White") {
        return "N/A";
      } else if (color_name == "Navy") {
        return "275 C";
      } else if (color_name == "Denim") {
        return "275 C";
      } else if (color_name == "Deep Royal") {
        return "3584 C";
      } else if (color_name == "Aqua") {
        return "285 C";
      } else if (color_name == "Kelly Green") {
        return "348 C";
      } else if (color_name == "Red") {
        return "1935 C";
      } else if (color_name == "Gold") {
        return "137 C";
      } else if (color_name == "Oat Metal") {
        return "N/A";
      } else if (color_name == "Maroon") {
        return "7642 C";
      } else if (color_name == "Orange") {
        return "1655 C";
      } else if (color_name == "Tan") {
        return "2310 C";
      } else if (color_name == "Khaki") {
        return "7770 C";
      } else if (color_name == "Pale Pink") {
        return "496 C";
      } else if (color_name == "Purple") {
        return "2084 C";
      } else if (color_name == "Pale Sky") {
        return "N/A";
      } else if (color_name == "Bluesone") {
        return "546 C";
      }
    }
  },

  async mounted() {
    let productImageUrl = process.env.VUE_APP_IMAGE_BASE_URL + 'products';
    let orderId = this.$route.params.id;
    let itemId = this.$route.params.itemId;
    this.order = await this.fetchOrder(orderId);
    let orderItem = await this.fetchOrderItem(itemId);
    this.orderItem = orderItem.data;
    this.designAttributes = await this.fetchDesign(this.orderItem.custom_design_id);
    let product = await this.fetchProduct(this.orderItem.product_id);
    let color_key = getSlug(this.designAttributes.color_name);
    this.productImageFront = productImageUrl + "/" + product.images.[color_key].front.url;
    this.productImageBack = productImageUrl + "/" + product.images.[color_key].back.url;
    this.frontImageUrl = process.env.VUE_APP_IMAGE_BASE_URL + "cart/item/images/" + this.designAttributes.front_image_name;
    this.backImageUrl = process.env.VUE_APP_IMAGE_BASE_URL + "cart/item/images/" + this.designAttributes.back_image_name;
  }
}
</script>

<style scoped>
table, th, td {
  font-size: 12px;
  color: #606266;
}

table {
  width: 100%;
}

.image_holder {
  overflow: hidden;
}

.embroidery-print-area {
  position: absolute;
  overflow: hidden;
  border: 1px solid green;
}

.tees-design-wrapp {
  position: relative;
  text-align: center;
  width: 390px;
  height: 489px;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}

.tees-design-main {
  position: absolute;
  top: 0;
  left: 0;
}

.print-area-set {
  position: relative;
  border: 1px solid red;
}

.tees-design-side {
  display: block;
  width: 494px;
  height: auto;
  margin: 0 auto;
}

.print-area-set-text {
  position: relative;
  color: #fff;
  width: 178px;
  height: 50px;
  top: 10px;
  left: 10px;
}

.print-area-set-image {
  position: relative;
  top: 28px !important;
  left: 10px !important;
}

.print-area-set {
  border: 0px;
}
</style>
