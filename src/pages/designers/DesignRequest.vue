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

        <div class="w-full">
          <p class="text-xl font-semibold mb-4 float-left">Design Request Detail - ID - #{{ designRequest.id }}</p>
          <p class="text-xl font-semibold mb-4 float-right">
            <el-tag type="info mr-5">Deadline : {{ designRequest.deadline }}</el-tag>
            <strong>Status </strong> :
            <el-button type="info" icon="el-icon-thumb" size="mini" v-if="designRequest.status === 1">Ready to start the
              design.
            </el-button>
            <el-button type="primary" icon="el-icon-data-line" size="mini" v-if="designRequest.status === 2">Work in
              progress.
            </el-button>
            <el-button type="success" icon="el-icon-finished" size="mini" v-if="designRequest.status === 3">Completed.
            </el-button>
          </p>
        </div>
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <el-form ref="form" :model="designRequest" label-width="220px" class="w-full">

            <div class="grid grid-cols-2 gap-2">

              <el-form-item label="Team Name">
                <p>{{ designRequest.team_name }}</p>
              </el-form-item>

              <el-form-item label="Purpose Of The Team">
                <p>{{ designRequest.purpose_of_team }}</p>
              </el-form-item>

              <el-form-item label="Tag Line">
                <p>{{ designRequest.tag_line }}</p>
              </el-form-item>

              <el-form-item label="Design Requirements">
                <p>{{ designRequest.graphic_design_requirements }}</p>
              </el-form-item>

              <el-form-item label="Attached Reference">
                <a target="_blank" :href="attachmentBaseUrl + 'dyo/' + designRequest.attach_reference ">
                  Download Attach Reference
                </a>
              </el-form-item>

              <el-form-item label="Look & Feel">
                <p v-if="designRequest.look_and_feel">{{ designRequest.look_and_feel.join(',') }}</p>
              </el-form-item>

              <el-form-item label="Choose Typeface">
                <p>{{ designRequest.type_face }}</p>
              </el-form-item>

              <el-form-item label="Text Color">
                <p>{{ designRequest.text_color }}</p>
              </el-form-item>

              <el-form-item label="Special Notes">
                <p>{{ designRequest.special_notes }}</p>
              </el-form-item>

              <el-form-item label="Deadline">
                <p>{{ designRequest.deadline }}</p>
              </el-form-item>

            </div>

          </el-form>
        </div>


        <el-tabs type="border-card" class="mt-6" v-if="designRequest.updated === 0">
          <el-tab-pane label="Messages">


            <div class="block w-full">
              <el-timeline>
                <el-timeline-item placement="top" v-for="(item, index) in designRequest.comments" :key="index" :timestamp=item.created_at>
                  <h3>The message added by {{item.user.first_name }} {{item.user.last_name }} ({{item.user.email}})</h3>
                  <p class="mt-5"><strong> Message : </strong>{{ item.body }}</p>
                  <p class="mt-5"><strong>Attachment : </strong><a :href="item.attachment">
                    {{ item.attachment }} Download</a></p>
                </el-timeline-item>
              </el-timeline>
            </div>

            <el-form ref="form" :model="designer_comment_form" label-width="220px" class="w-full">

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
          <el-tab-pane label="Status">

            <el-form ref="form" :model="designRequest" label-width="220px" class="w-1/2">

              <el-form-item label="Status">
                <el-select class="w-full" v-model="designer_form.status_by_designer" value-key="designRequest.status_by_designer" placeholder="Select">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="Comments">
                <el-input type="textarea"  v-model="designer_form.comments"></el-input>
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
                    :file="designer_form.attachment">
                  <el-button size="small" type="primary">Click to upload</el-button>
                  <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
              </el-form-item>


              <el-form-item>
                <el-button icon="el-icon-edit" type="primary" v-on:click="updateStatus">Submit</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>

        <el-tabs type="border-card" class="mt-6" v-if="designRequest.updated === 1">
          <el-tab-pane label="Messages">
            <div class="block w-full">
              <el-timeline>
                <el-timeline-item placement="top" v-for="(item, index) in designRequest.comments" :key="index" :timestamp=item.created_at>
                  <h3>The message added by {{item.user.first_name }} {{item.user.last_name }} ({{item.user.email}})</h3>
                  <p class="mt-5"><strong> Message : </strong>{{ item.body }}</p>
                  <p class="mt-5"><strong>Attachment : </strong><a :href="item.attachment">
                    {{ item.attachment }} Download</a></p>
                </el-timeline-item>
              </el-timeline>
            </div>

            <el-form ref="form" :model="designer_comment_form" label-width="220px" class="w-full">

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
          <el-tab-pane label="Status">
            <div class="block w-full">
              <el-timeline>
                <el-timeline-item :timestamp=designRequest.designer_status_at placement="top">
                  <el-card class="mt-5">
                    <div slot="header" class="clearfix">
                      <span>Graphic Design</span>
                    </div>
                    <h4>The graphic design submitted by {{ designRequest.designer_status_updated_by }} on
                      {{ designRequest.designer_status_at }}</h4>
                    <p class="mt-5"><strong> Comments : </strong>{{ designRequest.designer_comments }}</p>
                    <p class="mt-5"><strong>Attachment : </strong><a :href="designRequest.designer_attachment">
                      {{ designRequest.designer_attachment }} Download</a></p>

                    <p class="mt-5"><strong>Status by designer : </strong>
                      <el-tag type="info" v-if="designRequest.status_by_designer === 1">
                        PENDING
                      </el-tag>
                      <el-tag type="danger" v-if="designRequest.status_by_designer === 2">
                        WORK IN PROGRESS...
                      </el-tag>
                      <el-tag type="success"  v-if="designRequest.status_by_designer === 3">
                        COMPLETED
                      </el-tag>
                    </p>
                    <p class="mt-5"><strong>Customer Status : </strong>
                      <el-tag type="info" v-if="designRequest.status_by_customer === 1">
                        PENDING
                      </el-tag>
                      <el-tag type="success" v-if="designRequest.status_by_customer === 2">
                        APPROVED
                      </el-tag>
                      <el-tag type="danger" v-if="designRequest.status_by_customer === 3">
                        DISAPPROVED
                      </el-tag>

                      , updated on
                      : {{ designRequest.status_updated_by_customer_at }}</p>
                  </el-card>
                </el-timeline-item>


                <el-timeline-item v-for="(item, index) in designRequest.change_requests" :key="item.id" :timestamp=item.designer_status_at placement="top">
                  <el-card class="mt-5">

                    <div slot="header" class="clearfix">
                      <span v-if="index == 0"> 1st </span>
                      <span v-if="index == 1"> 2nd </span>
                      <span v-if="index == 2"> 3rd </span>
                      <span v-if="index > 2"> {{ index + 1 }}th </span>
                      <span>Change Request</span>
                      <span style="float: right; padding: 3px 0">Payment Status :

                      <el-button type="info" size="mini" v-if="item.payment_status === 0">
                        NOT APPLICABLE
                      </el-button>

                      <el-button type="danger" icon="el-icon-close" size="mini" v-if="item.payment_status === 1">
                       PENDING
                      </el-button>

                       <el-button type="success" icon="el-icon-check" size="mini" v-if="item.payment_status === 2">
                       PAID
                      </el-button>
                    </span>
                    </div>

                    <h4>Change request submitted by customer on {{ item.created_at }}</h4>
                    <p class="mt-5"><strong> Description : </strong>{{ item.description }}</p>
                    <p class="mt-5"><strong>Attachment : </strong><a :href="item.attachment">
                      {{ item.attachment }} Download</a></p>

                    <template v-if="(item.payment_status !== 0 && item.estimation != null)">
                      <el-divider content-position="left" class="mt-5">Estimated</el-divider>
                      <h4>The change request estimated by {{ item.estimated_by }} on {{ item.estimated_at }}</h4>
                      <p class="mt-5"><strong> Estimation : </strong>{{ item.estimation }} Hours</p>
                    </template>

                    <template v-if="item.status_by_designer != null">
                      <el-divider content-position="left">The design completed</el-divider>
                      <h4>{{ item.designer_status_updated_by }} has updated on {{ item.designer_status_at }}</h4>
                      <p class="mt-5"><strong> Comments : </strong>{{ item.designer_comments }}</p>
                      <p class="mt-5">
                        <strong>Attachment : </strong><a :href="item.designer_attachment">
                        {{ item.designer_attachment }} Download</a>
                      </p>



                      <p class="mt-5"><strong>Status by designer : </strong>
                        <el-tag type="info" v-if="item.status_by_designer === 1">
                          PENDING
                        </el-tag>
                        <el-tag type="danger" v-if="item.status_by_designer === 2">
                          WORK IN PROGRESS...
                        </el-tag>
                        <el-tag type="success"  v-if="item.status_by_designer === 3">
                          COMPLETED
                        </el-tag>
                      </p>

                      <p class="mt-5" v-if="item.status_by_customer != null">
                        <strong>Customer Status : </strong>
                        <el-tag type="info" v-if="item.status_by_customer === 1">
                          PENDING
                        </el-tag>
                        <el-tag type="success" v-if="item.status_by_customer === 2">
                          APPROVED
                        </el-tag>
                        <el-tag type="danger" v-if="item.status_by_customer === 3">
                          DISAPPROVED
                        </el-tag>

                        , updated on
                        : {{ item.customer_status_at }}</p>
                    </template>



                    <template v-else>


                      <template v-if="((item.payment_status === 0) || (item.payment_status === 2))">
                      <el-divider content-position="left" class="mt-5">Update Status</el-divider>
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

                        <el-form-item label="Comments">
                          <el-input type="textarea"  v-model="designer_form.comments"></el-input>
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
                              :file="designer_form.attachment">
                            <el-button size="small" type="primary">Click to upload</el-button>
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                          </el-upload>
                        </el-form-item>



                        <el-form-item size="large">
                          <el-button type="primary" v-on:click="updateChangeRequest(index, item.id)">Update</el-button>
                          <el-button>Cancel</el-button>
                        </el-form-item>

                      </el-form>
                      </template>



                      <template v-if="(item.payment_status === 1 && item.estimation == null)">

                        <el-divider content-position="left" class="mt-5">Estimation</el-divider>
                        <el-form ref="form" label-width="120px" size="mini" class="mt-5 w-1/2" :model="designer_estimation_form">
                          <el-form-item label="Status">
                            <el-select class="w-full" v-model="designer_estimation_form.estimation" value-key="designer_form.status_by_designer" placeholder="Select">

                              <el-option
                                  :label="1 + ` Hour`"
                                  :value="1">
                              </el-option>
                              <el-option
                                  v-for="(n,index) in 23"
                                  :key="index"
                                  :label="(n + 1) + ` Hours`"
                                  :value="n + 1">
                              </el-option>
                            </el-select>
                          </el-form-item>

                          <el-form-item size="mini">
                            <el-button type="primary" v-on:click="submitEstimation(item.id)">Submit Estimation</el-button>
                          </el-form-item>
                        </el-form>

                      </template>





                    </template>



                  </el-card>
                </el-timeline-item>



              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DesignRequest",
  data() {
    return {
      fileUploadAction: process.env.VUE_APP_API_URL + "/dyo/upload-file",
      designRequest: {},
      design_look_and_feel: [],
      look_and_feels: [],
      colors: [],
      fonts: [],
      attachmentBaseUrl: 'ht',
      designer_form: {
        status_by_designer: 3,
        comments : '',
        attachment: ''
      },
      designer_comment_form: {
        comments : '',
        attachment: ''
      },
      designer_estimation_form: {
        estimation : ''
      },
      options: [{
        value: 3,
        label: 'Completed'
      }],
    }
  },
  methods: {
    ...mapActions('designRequest', ['fetchDesignRequest','updateChangeRequestDesignerStatus','updateDesignerStatus','updateEstimation']),
    ...mapActions('system', ['fetchLookAndFeels', 'fetchFontColors', 'fetchFonts']),
    ...mapActions('order', ['fetchOrderItem']),
    ...mapActions('product', ['fetchProduct']),
    ...mapActions('comment', ['storeComment']),

    async fetchDesignRequestHandler(recordId) {
      this.designRequest = await this.fetchDesignRequest(recordId);
    },
    goBack() {
      return this.$router.push({name: "DesignRequests"});
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfer of ${ file.name } ?`);
    },
    bindAttachmentFileName(file) {
      this.designer_form.attachment = file.path;
    },
    bindCommentAttachmentFileName(file) {
      this.designer_comment_form.attachment = file.path;
    },
    async updateStatus() {
      await this.updateDesignerStatus({
        'id': this.designRequest.id,
        'data': {
          status_by_designer: this.designer_form.status_by_designer,
          designer_comments: this.designer_form.comments,
          designer_attachment: this.designer_form.attachment,
        }
      }).then((res) => {
        this.designRequest = res;
        this.$message.success("The status has been updated successfully.");

      }).catch(() => {
        this.$message.error("Failed to update the status. Please try again!")
      });

    },
    async updateChangeRequest(index, changeRequestId) {
      await this.updateChangeRequestDesignerStatus({
        'id': changeRequestId,
        'data': {
          status_by_designer: this.designer_form.status_by_designer,
          designer_comments: this.designer_form.comments,
          designer_attachment: this.designer_form.attachment,
        }
      }).then(async () => {
        let requestId = this.designRequest.id;
        await this.fetchDesignRequestHandler(requestId);
        this.$message.success("The status has been updated successfully.")
      }).catch(() => {
        this.$message.error("Failed to update the status. Please try again!")
      });
    },
    addComment() {
      this.storeComment({
        commentable_obj_id: this.designRequest.id,
        commentable_obj: 'GraphicDesignRequest',
        comments: this.designer_comment_form.comments,
        attachment: this.designer_comment_form.attachment
      }).then(async ()=>{
        let requestId = this.designRequest.id;
        await this.fetchDesignRequestHandler(requestId);
        this.designer_comment_form.comments = '';
        this.designer_comment_form.attachment = '';
        this.$message.success("The message has been sent successfully.")
      }).catch((error) => {
        console.log(error);
      });
    },
    submitEstimation(id) {
      this.updateEstimation({
        'id': id,
        'data': {
          estimation: 2,
        }
      });
      console.log("The estimation..", this.designer_estimation_form);
    }
  },
  async beforeMount() {
    let colors = await this.fetchFontColors();
    this.colors = colors;
    this.fonts = await this.fetchFonts();
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
