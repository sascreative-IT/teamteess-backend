<template>
  <div>
    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Hello, {{ userData.first_name }}!</p>
      <button
          class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">
        View Logs
      </button>
    </div>

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Orders in Factory</p>
    </div>

    <div class="flex flex-wrap -mx-3 mb-10 mt-5">

      <div class="w-full xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">New Orders : {{ factoryDashboardData.new }}
              <el-link v-on:click="handleViewFactoryOrdersClick('new')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total orders waiting for action in Factory.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">Processing : {{ factoryDashboardData.processing }}
              <el-link v-on:click="handleViewFactoryOrdersClick('processing')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total processing orders in Factory.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">Total : {{ factoryDashboardData.total }}
            </p>
            <p>The total orders in Factory.</p>
          </div>
        </div>
      </div>


    </div>

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Orders in Warehouse</p>
    </div>

    <div class="flex flex-wrap -mx-3 mb-40 mt-5">

      <div class="w-full xl:w-1/3 px-3 py-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">New Orders : {{ warehouseDashboardData.new }}
              <el-link v-on:click="handleViewWarehouseOrdersClick('new')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total orders waiting for action in Warehouse.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3 py-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">Processing : {{ warehouseDashboardData.processing }}
              <el-link v-on:click="handleViewWarehouseOrdersClick('processing')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total processing orders in Warehouse.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3 py-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">Shipped : {{ warehouseDashboardData.shipped }}
              <el-link v-on:click="handleViewWarehouseOrdersClick('shipped')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total shipped orders.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3 py-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">Ready To Pickup : {{ warehouseDashboardData.ready_to_pickup }}
              <el-link v-on:click="handleViewWarehouseOrdersClick('ready_to_pickup')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total ready to pickup orders.</p>
          </div>
        </div>
      </div>

      <div class="w-1/5 xl:w-1/3 px-3 py-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">Completed : {{ warehouseDashboardData.completed }}
              <el-link v-on:click="handleViewWarehouseOrdersClick('completed')" icon="el-icon-link">View Orders</el-link>
            </p>
            <p>The total completed orders.</p>
          </div>
        </div>
      </div>



      <div class="w-1/5 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pr-2 pl-2 pb-6 pt-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-2xl">Total : {{ warehouseDashboardData.total }}
            </p>
            <p>The total orders in Warehouse.</p>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AdminDashboard",
  methods: {
    ...mapActions('dashboardData', ['fetchWarehouseDashboardData','fetchFactoryDashboardData']),
    handleViewWarehouseOrdersClick(status) {
      return this.$router.push({ name: "WarehouseOrders", params: {status: status}});
    },
    handleViewFactoryOrdersClick(status) {
      return this.$router.push({ name: "FactoryOrders", params: {status: status}});
    },
  },
  computed: {
    ...mapState('dashboardData', ['warehouseDashboardData', 'factoryDashboardData']),
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  async mounted() {
    await this.fetchWarehouseDashboardData();
    await this.fetchFactoryDashboardData();
  }
}
</script>

<style scoped>

</style>