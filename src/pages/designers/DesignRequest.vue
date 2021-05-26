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
        <p class="text-xl font-semibold mb-4">Section Heading</p>
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Activity name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type"></el-checkbox>
                <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                <el-checkbox label="Offline activities" name="type"></el-checkbox>
                <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor"></el-radio>
                <el-radio label="Venue"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "DesignRequest",
  data() {
    return  {
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
    onSubmit() {
      console.log('submit!');
    }
  },
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
