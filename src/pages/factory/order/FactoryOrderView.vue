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
        <el-form ref="form" label-width="180px" class="w-full">

          <div class="grid grid-cols-2 gap-2">
            <el-form-item label="Customer">
              <p>{{ order.user.first_name }} {{ order.user.last_name }} ({{ order.user.email }})</p>
            </el-form-item>

            <el-form-item label="Company Name">
              <p>{{ order.company_name }}</p>
            </el-form-item>

            <el-form-item label="Order Total">
              <p>$ {{ order.cart_total.toFixed(2) }}</p>
            </el-form-item>

            <el-form-item label="Shipping Cost">
              <p>(Pick up at store) 0.00</p>
            </el-form-item>
          </div>
          <div class="grid grid-cols-1">
            <el-divider content-position="left">Billing Address</el-divider>
          </div>
          <div class="grid grid-cols-2 gap-2">

            <el-form-item label="Address : ">
              <p>{{ order.billing_address }}</p>
            </el-form-item>

            <el-form-item label="City : ">
              <p>{{ order.billing_city }}</p>
            </el-form-item>

            <el-form-item label="State : ">
              <p>{{ order.billing_city }}</p>
            </el-form-item>

            <el-form-item label="Contact Number : ">
              <p>{{ order.billing_mobile_number }}</p>
            </el-form-item>

          </div>


          <div class="grid grid-cols-1">
            <el-divider content-position="left">Shipping Address</el-divider>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <el-form-item label="Address : ">
              <p>{{ order.shipping_address }}</p>
            </el-form-item>

            <el-form-item label="City : ">
              <p>{{ order.shipping_city }}</p>
            </el-form-item>

            <el-form-item label="State : ">
              <p>{{ order.shipping_city }}</p>
            </el-form-item>

            <el-form-item label="Contact Number : ">
              <p>{{ order.shipping_mobile_number }}</p>
            </el-form-item>
          </div>

        </el-form>

        <div class="w-full">
          <div>
            <table>
              <thead>
              <tr>
                <th class="center" width="2%">#</th>
                <th width="8%">Item Code</th>
                <th width="15%">Item</th>
                <th>Size & Numbers</th>
                <th class="px-2" width="5%"><b>Tax</b></th>
                <th class="center" width="5%">Qty</th>
                <th class="right" width="8%">Total</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in order.items" :key="item.id">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ item.product_style_code }} <BR/>
                  <router-link v-if="order.type == 'DYO'" target="_blank" class="el-icon-link" :to="{ name: 'FactoryOrderItemView', params: { 'id': order.id, 'itemId': item.id} }">
                    view Item
                  </router-link>
                </td>
                <td>
                  {{ item.product_name }}
                  <BR/>
                  <template v-if="order.type == 'DYO'">
                  <strong>Color: </strong> {{item.custom_design.color_name}}<BR/>
                  <strong>Color Code: </strong> {{get_pantone_number(item.custom_design.color_name)}}<BR/>
                  </template>
                </td>
                <td>

                  <div class="w-full">

                    <div class="grid mb-2 border-b-2 bg-gray-300 p-1" v-bind:class="[item.has_nick_names == 'Yes' ? 'grid-cols-7' : 'grid-cols-6']">
                      <div class="font-bold">Size</div>
                      <div class="font-bold" v-if="item.has_nick_names == 'Yes'">Nickname (NN)</div>
                      <div class="font-bold">Kids Size</div>
                      <div class="font-bold">+ Adult Size</div>
                      <div class="font-bold" v-if="item.has_nick_names == 'Yes'">+ NN Cost</div>
                      <div class="font-bold">QTY</div>
                      <div class="font-bold">Sub Total</div>
                    </div>


                    <div class="grid mb-1 border-b" v-bind:class="[item.has_nick_names == 'Yes' ? 'grid-cols-7' : 'grid-cols-6']" v-for="variation in item.order_item_variations" :key="variation.id">
                      <template v-if="variation.order_item_variation_values[0].qty>0">
                        <div v-if="item.has_nick_names == 'Yes'">
                          <template v-if="typeof(variation.order_item_variation_values[1]) !== 'undefined'">
                            {{ variation.order_item_variation_values[1].attribute_value_name }}
                          </template>
                        </div>
                        <div>
                          <template v-if="typeof(variation.order_item_variation_values[0]) !== 'undefined'">
                            {{ variation.order_item_variation_values[0].attribute_value_name }}
                          </template>
                        </div>

                        <div>
                          {{item.product_price.toFixed(2)}}
                        </div>
                        <div v-if="item.has_nick_names == 'Yes'">
                          <template v-if="typeof(variation.order_item_variation_values[1]) !== 'undefined'">
                            $ {{
                              variation.order_item_variation_values[1].attribute_value_price.toFixed(2)
                            }}
                          </template>
                        </div>
                        <div>
                          <template v-if="typeof(variation.order_item_variation_values[0]) !== 'undefined'">
                            $ {{
                              variation.order_item_variation_values[0].attribute_value_price.toFixed(2)
                            }}
                          </template>
                        </div>
                        <div>
                          {{ variation.order_item_variation_values[0].qty }}
                        </div>
                        <div>
                          {{ ((item.product_price * variation.order_item_variation_values[0].qty ) + (variation.extra_cost)).toFixed(2)}}
                        </div>
                      </template>

                    </div>

                  </div>

                </td>
                <td align="right">15%</td>
                <td align="right">{{ item.qty }}</td>
                <td align="right">${{ item.grand_total.toFixed(2) }}</td>
              </tr>

              <tr>
                <td colspan="4">
                  <strong>Notes : </strong>{{order.comment}}
                </td>
                <td colspan="2">Total (Include Tax) : </td>
                <td>$ {{order.cart_total.toFixed(2)}}</td>
              </tr>

              <tr>
                <td colspan="4"></td>
                <td colspan="2">Tax (15%) : </td>
                <td>$ {{tax.toFixed(2)}}</td>
              </tr>

              <tr>
                <td colspan="4"></td>
                <td colspan="2">Shipping : ({{order.shipping_method_description}})</td>
                <td>$ {{order.shipping_cost.toFixed(2)}}</td>
              </tr>

              <tr>
                <td colspan="4"></td>
                <td colspan="2">Grand Total : </td>
                <td>${{order.total.toFixed(2)}}</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FactoryOrderView",
  data() {
    return {
      order: {},
      status: '',
      tax : '',
      graphicDesign: {},
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
    let orderId = this.$route.params.id;
    this.order = await this.fetchOrder(orderId);
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
