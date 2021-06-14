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
          <el-button type="info" icon="el-icon-thumb" size="mini" v-if="order.status === 1">Ready to start the
            design.
          </el-button>
          <el-button type="primary" icon="el-icon-data-line" size="mini" v-if="order.status === 2">Work in
            progress.
          </el-button>
          <el-button type="success" icon="el-icon-finished" size="mini" v-if="order.status === 3">Completed.
          </el-button>
        </p>
      </div>

      <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center pt-6 pb-6 pl-6 pr-1 mb-6 xl:mb-0">

        <div class="w-full">
          <div class="grid grid-cols-2 gap-2">
            <div class="print-tees-wrapp">
              <template>
                <img :src="productImageFront"/>
              </template>
              <div
                  class="embroidery-print-area">
                <drr
                    :x=designAttributes.front_image_position_values.left
                    :y=designAttributes.front_image_position_values.top
                    :w=designAttributes.front_image_position_values.width
                    :h=designAttributes.front_image_position_values.height
                    :angle="designAttributes.front_image_position_values.angle"
                >
                 <img :src="frontImageUrl"/>
                </drr>
              </div>
            </div>
            <div class="print-tees-wrapp">
              <template>
                <img :src="productImageBack"/>
              </template>
              <drr
                  :x=designAttributes.back_image_position_values.left
                  :y=designAttributes.back_image_position_values.top
                  :w=designAttributes.back_image_position_values.width
                  :h=designAttributes.back_image_position_values.height
                  :angle="designAttributes.back_image_position_values.angle"
              >
                <img :src="backImageUrl"/>
              </drr>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import drr from '@minogin/vue-drag-resize-rotate';
import {getSlug} from "@/helpers/getSlug"

export default {
  name: "DyoOrderView",
  data() {
    return {
      order: {},
      orderItem: {},
      status: '',
      tax: '',
      designAttributes: {},
      productImageFront: '',
      productImageBack: '',
      frontImageUrl: '',
      backImageUrl: '',
    }
  },
  methods: {
    ...mapActions('order', ['fetchOrder', 'fetchOrderItem']),
    ...mapActions('dyo', ['fetchDesign']),
    ...mapActions('product', ['fetchProduct']),

  },
  components: {
    drr
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

.print-tees-wrapp {
  position: relative;
  text-align: center;
  width: 390px;
  height: 489px;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}

.embroidery-print-area {
  position: absolute;
  overflow: hidden;
  border: 1px solid green;
}
</style>
