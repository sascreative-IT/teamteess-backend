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
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <el-form ref="form" :model="designRequest" label-width="220px" class="w-full">

            <el-form-item label="Team Name">
              <p>{{designRequest.team_name}}</p>
            </el-form-item>

            <el-form-item label="Purpose Of The Team">
              <p>{{designRequest.purpose_of_team}}</p>
            </el-form-item>

            <el-form-item label="Tag Line">
              <p>{{designRequest.tag_line}}</p>
            </el-form-item>


            <el-form-item label="Design Requirements">
              <p>{{designRequest.graphic_design_requirements}}</p>
            </el-form-item>

            <el-form-item label="Attached Reference">
              <a target="_blank" :href="attachmentBaseUrl + 'dyo/' + designRequest.attach_reference ">
                Download Attach Reference
              </a>
            </el-form-item>

            <el-form-item label="Look & Feel">
              <p v-if="designRequest.look_and_feel">{{designRequest.look_and_feel.join(',')}}</p>
            </el-form-item>


            <el-form-item label="Choose Typeface">
              <p>{{designRequest.type_face}}</p>
            </el-form-item>

            <el-form-item label="Text Color">
             <p>{{designRequest.text_color}}</p>
            </el-form-item>

            <el-form-item label="Special Notes">
              <p>{{designRequest.special_notes}}</p>
            </el-form-item>

            <el-form-item label="Deadline">
              <p>{{designRequest.deadline}}</p>
            </el-form-item>


            <el-form-item>
              <el-button icon="el-icon-arrow-left el-icon-left" type="primary" v-on:click="goBack">Go Back</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
name: "DesignRequest",
  data() {
    return  {
      designRequest: {},
      design_look_and_feel: [],
      look_and_feels: [],
      colors: [],
      fonts: [],
      attachmentBaseUrl: 'ht',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    ...mapActions('designRequest', ['fetchDesignRequest']),
    ...mapActions('system', ['fetchLookAndFeels', 'fetchFontColors', 'fetchFonts']),
    ...mapActions('order', ['fetchOrderItem']),
    ...mapActions('product', ['fetchProduct']),

    async fetchDesignRequestHandler(recordId) {
      this.designRequest = await this.fetchDesignRequest(recordId);
    },
    goBack() {
      return this.$router.push({ name: "DesignRequests"});
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
