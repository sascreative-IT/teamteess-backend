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
        <p class="text-xl font-semibold mb-4">Design Requests</p>
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pt-6 pb-6 pl-6 pr-1 mb-6 xl:mb-0">
          <el-table
              :data="designRequests.data"
              style="width: 100%">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="50">
            </el-table-column>
            <el-table-column
                fixed
                prop="order.id"
                label="OrderID"
                width="100">
            </el-table-column>
            <el-table-column
                prop="order.user.first_name"
                label="Customer"
                width="180">
            </el-table-column>
            <el-table-column
                prop="order_item.product_name"
                label="Product"
                width="120">
            </el-table-column>

            <el-table-column
                prop="print_type_name"
                label="Print Type"
                width="120">
            </el-table-column>

            <el-table-column
                prop="color_name"
                label="Color"
                width="120">
            </el-table-column>

            <el-table-column
                prop="status_str"
                label="Status"
                width="150">
            </el-table-column>

            <el-table-column
                prop="design_status"
                label="Design Status"
                width="150">
            </el-table-column>

            <el-table-column
                prop="status_by_customer"
                label="Approval Status"
                width="150">
            </el-table-column>

            <el-table-column
                prop="created_date"
                label="Created Date"
                width="200">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="Operations"
                width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" v-on:click="handleViewClick(scope.row)" icon="el-icon-view"></el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit" v-on:click="handleUpdateClick(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
name: "DesignRequests",
  data() {
    return {
      designRequests: [],
    }
  },
  methods: {
    ...mapActions('designRequest', ['fetchDesignRequests']),

    async fetchDesignRequestsHandler() {
          this.designRequests = await this.fetchDesignRequests(1);
    },
    handleViewClick(row) {
      return this.$router.push({ name: "DesignRequest", params: {id: row.id}});
    },

    handleUpdateClick(row) {
      return this.$router.push({ name: "UpdateDesignRequestStatus", params: {id: row.id}});
    }
  },
  async mounted() {
      await this.fetchDesignRequestsHandler();
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
</style>
