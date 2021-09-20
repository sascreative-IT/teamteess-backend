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
            Factory
          </router-link>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
        </li>


        <li class="flex items-center">
          <router-link :to="{ name: 'DesignRequests' }" class="text-gray-600">
            Orders
          </router-link>
        </li>

      </ol>
    </nav>
    <!-- breadcrumb end -->

    <div class="flex flex-wrap">
      <div class="w-full">
        <p class="text-xl font-semibold mb-4">Orders</p>
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pt-6 pb-6 pl-6 pr-1 mb-6 xl:mb-0">
          <el-table
              :data="factoryOrders"
              style="width: 100%">
            <el-table-column
                fixed
                prop="id"
                label="Order ID"
                width="120">
            </el-table-column>
            <el-table-column
                prop="user.first_name"
                label="Customer">
            </el-table-column>

            <el-table-column
                prop="user.email"
                label="Email">
            </el-table-column>

            <el-table-column
                prop="total"
                label="Total">
            </el-table-column>


            <el-table-column
                prop="created_date"
                label="Created Date"
                width="200">
            </el-table-column>


            <el-table-column
                fixed="right"
                label="Operations"
                width="250">
              <template slot-scope="scope">
                <el-link icon="el-icon-link" v-on:click="handleViewClick(scope.row)">View</el-link>
                <el-divider v-if="scope.row.status != 'App\\Domain\\Order\\States\\SentToFactory'"
                            direction="vertical"></el-divider>
                <el-link v-if="scope.row.status != 'App\\Domain\\Order\\States\\SentToFactory'" icon="el-icon-edit"
                         v-on:click="handleSendToWarehouse(scope.row)"> Send to Warehouse
                </el-link>
                <el-divider v-if="scope.row.status == 'App\\Domain\\Order\\States\\SentToFactory'"
                            direction="vertical"></el-divider>
                <el-link v-if="scope.row.status == 'App\\Domain\\Order\\States\\SentToFactory'" icon="el-icon-edit"
                         v-on:click="handleMarkAsProcessing(scope.row)"> Mark as Processing
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Orders",
  data() {
    return {
      status: '',
    }
  },
  watch: {
    async $route(to, from) {
      if (to !== from) {
        let status = this.$route.params.status;
        await this.fetchFactoryOrdersHandler(status);
      }
    }
  },
  computed: {
    ...mapState('order', ['factoryOrders']),
  },
  methods: {
    ...mapActions('order', ['fetchFactoryOrders', 'processingInFactory', 'sentToWareHouse']),

    async fetchFactoryOrdersHandler(status) {
      await this.fetchFactoryOrders(status);
    },
    handleViewClick(row) {
      return this.$router.push({name: "FactoryOrderView", params: {id: row.id}});
    },
    handleSendToWarehouse(row) {
      this.$prompt('Message : ', `Send Order #${row.id} To Warehous`, {
        inputType: 'textarea',
        confirmButtonText: 'Send this order to Warehouse',
        cancelButtonText: 'Cancel',
      }).then(async ({value}) => {
        try {
          await this.sentToWareHouse({
            'orderId': row.id,
            'message' : value
          });
          let status = this.$route.params.status;
          await this.fetchFactoryOrdersHandler(status);
          this.$message({
            type: 'success',
            message: "The order has been sent to warehouse successfully"
          });
        } catch (e) {
          this.$message({
            type: 'error',
            message: 'An Error Occurred, Please Try Again Later!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'No changes has been made.'
        });
      });
    },

    async handleMarkAsProcessing(row) {
      await this.processingInFactory(row.id);
      let status = this.$route.params.status;
      await this.fetchFactoryOrdersHandler(status);
      this.$message.success("The order has been marked as processing successfully.")
    },
  },
  async mounted() {
    let status = this.$route.params.status;
    await this.fetchFactoryOrdersHandler(status);
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
