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
          <router-link :to="{ name: 'AdminDashboard' }" class="text-gray-700">
            Orders
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
        </li>


        <li class="flex items-center">
          <router-link :to="{ name: 'DesignRequests' }" class="text-gray-600">
            Time Line
          </router-link>
        </li>

      </ol>
    </nav>
    <!-- breadcrumb end -->

    <div class="flex flex-wrap">

      <div class="w-full">
        <p class="text-xl font-semibold mb-4 float-left">Order ID - #{{ order.id }}</p>
        <p class="text-xl font-semibold mb-4 float-right">
          <el-tag type="info mr-5">Order Type : {{order.type}}
            <template v-if="order.type == 'GraphicDesign'">
              <router-link class="el-icon-link text-xs" :to="{ name: 'DesignRequest', params: {id: order.graphic_design_request.id}}" target="_blank">
                View Details
              </router-link>
            </template>
          </el-tag>


          <el-tag type="info mr-5">Created on : {{ order.created_at }}</el-tag>
          <strong>Status </strong> :

          <el-button type="success" size="mini" v-if="order.status === 1">Order Placed</el-button>
          <el-button type="success" size="mini" v-if="order.status === 2">In Progress</el-button>
          <el-button type="success" size="mini" v-if="order.status === 3">In Factory</el-button>
          <el-button type="success" size="mini" v-if="order.status === 4">Shipped</el-button>
          <el-button type="success" size="mini" v-if="order.status === 5">Completed</el-button>
          <el-button type="success" size="mini" v-if="order.status === 6">Canceled</el-button>

          <template v-if="order.type == 'GraphicDesign'">
          <a :href="graphicDesign.source_file" target="_blank" class="ml-4">
            <el-button type="success"  size="mini" icon="el-icon-download">Source File</el-button>
          </a>
          </template>

          <a v-bind:href="'http://api.teamtees.co.nz/po/'+order.id" target="_blank" class="ml-4">
          <el-button type="success"  size="mini" icon="el-icon-download">PO</el-button>
          </a>
        </p>
      </div>

      <div class="w-full bg-white border text-blue-400 rounded-lg flex-row items-center p-6 mb-6 xl:mb-0">
        <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
      </div>


    </div>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TimeLineView",
  data() {
    return {
      order: {},
      status: '',
      tax : '',
      graphicDesign: {},
      activities: []
    }
  },
  methods: {
    ...mapActions('order', ['fetchOrder','updateStatus']),
    ...mapActions('designRequest', ['fetchDesignRequest']),


    updateStatusHandler() {
      this.updateStatus({
        id: this.order.id,
        status: 4,
      }).then((res) => {
        this.order = res;
      }).catch(() => {
        this.$message.error("Failed to update the status. Please try again!")
      });
    }
  },
  async mounted() {
    let orderId = this.$route.params.id;
    this.order = await this.fetchOrder(orderId);
    this.activities = this.order.activities;
    this.tax = this.order.cart_total * 0.15;
    //order.graphic_design_request.id
    if (this.order.type == 'GraphicDesign') {
       this.graphicDesign = await this.fetchDesignRequest(this.order.graphic_design_request.id);
    }
  }
}
</script>

<style scoped>
table, th, td {
  font-size: 12px;
  color: #606266;
  border: 1px solid #e2e8f0;
  border-collapse: collapse;
}

table {
  width: 100%;
}

th, td {
  padding: 15px;
}
</style>
