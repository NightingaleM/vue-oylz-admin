<template>
  <div id="login-page">
    <div class="login-box">
      <h1>Login</h1>
      <v-text-field type="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn @click="login">Login</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    password: "",
    passwordRules: [v => !!v || "password is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    async login() {
      console.log("Lo~g~in~~~~");
      let res = await this.$axios.login({
        email: this.email,
        password: this.password
      });
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
#login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .login-box {
    width: 500px;
  }
}
</style>

