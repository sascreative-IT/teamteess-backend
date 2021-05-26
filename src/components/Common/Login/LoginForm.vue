<template>
  <form>
    <div class="relative w-full mb-3">
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2">Email</label>
      <input
          type="email"
          v-model="email"
          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Email"
          style="transition: all 0.15s ease 0s;"
      />
    </div>
    <div class="relative w-full mb-3">
      <label
          class="block uppercase text-gray-700 text-xs font-bold mb-2">Password</label>
      <input
          type="password"
          v-model="password"
          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Password"
          style="transition: all 0.15s ease 0s;"
      />
    </div>

    <div class="text-center mt-10">
      <button
          class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow w-full"
          type="button"
          style="transition: all 0.15s ease 0s;"
          v-on:click="loginHandler"
      >
        Sign In
      </button>
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    loginHandler() {
      this.loginUser({
        email: this.email,
        password: this.password,
        device_name: "webApp",
      }).then(()=> {
        return this.$router.push({ name: "Dashboard"});
      }).catch((e) => {
        console.log(e);
      });
    },
  },
}
</script>

<style scoped>

</style>