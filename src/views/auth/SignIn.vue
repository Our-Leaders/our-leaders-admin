<template>
  <div class="flex flex-wrap h-full">
    <div class="hidden lg:inline-block lg:w-1/3 bg-primary bg-overlay relative">
      <img class="h-16 my-6 mx-12 absolute" src="../../assets/img/logo-w.svg"/>
      <div class="flex flex-col justify-center h-full px-12">
        <span class="text-white text-4xl mb-6">
          <!-- Get live data on the performance and activities of cuttent African Leaders. -->
        </span>
        <!-- <hr class="text-white w-20"/> -->
      </div>
    </div>
    <img class="lg:hidden h-16 my-6 mx-12 absolute" src="../../assets/img/logo-b.svg"/>
    <div class="w-full md:w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-center" v-if="page === 0">
      <div class="mx-auto w-6/12">
        <span class="block text-5xl mb-10">Admin Log in</span>
        <form @submit.prevent="proceed">
          <div class="mb-6">
            <label class="block font-semibold font-circular" for="email">Email</label>
            <input class="field w-full py-2"
              type="text"
              id="email"
              name="email"
              v-model="data.email"
              placeholder="Enter your email"
              required/>
          </div>
          <div class="mb-6">
            <label class="block" for="password">
              <span class="font-semibold font-circular">Password</span>
              <span
                class="block cursor-pointer font-regular text-sm
                text-gray-500 float-right align-middle"
                @click="page = 1">
                Forgot Password?
              </span>
            </label>
            <div class="relative">
              <input class="field w-full py-2"
                :type="!displayPassword ? 'password' : 'text'"
                id="password"
                name="password"
                v-model="data.password"
                placeholder="Enter your password"
                required>
              <div class="inline-flex content-center absolute right-0 h-full">
                <img class="inline-block cursor-pointer m-auto" src="../../assets/img/password-eye.svg" v-if="!displayPassword" @click="togglePassword"/>
                <img class="inline-block cursor-pointer m-auto"
                  src="../../assets/img/password-eye-off.svg"
                  v-if="displayPassword"
                  @click="togglePassword"/>
              </div>
            </div>
          </div>
          <button
            :class="{
              'btn-primary w-full mb-8': true,
              'loading': loading,
            }"
            :disabled="loading">
            Log In
          </button>
        </form>
      </div>
    </div>
    <div class="w-full md:w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-center" v-if="page === 1">
      <div class="mx-auto w-6/12">
        <span class="block text-4xl mb-10">Admin Forgot Password Request</span>
        <form @submit.prevent="requestPasswordReset">
          <div class="mb-6">
            <label class="block font-semibold font-circular" for="email">Email</label>
            <input class="field w-full py-2"
              type="text"
              id="email"
              name="email"
              v-model="data.email"
              placeholder="Enter your email"
              required/>
          </div>
          <button
            :class="{
              'btn-primary w-full mb-8': true,
              'loading': loading,
            }"
            :disabled="loading">
            Send Request
          </button>
          <button
            :class="{
              'w-full mb-8': true,
            }"
            @click="page = 0"
            type="button"
            :disabled="loading">
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div class="w-full md:w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-center" v-if="page === 2">
      <div class="mx-auto w-6/12">
        <span class="block text-4xl mb-10">Admin Reset Password</span>
        <form @submit.prevent="resetPassword">
          <div class="mb-6">
            <label class="block" for="password">
              <span class="font-semibold font-circular">Password</span>
            </label>
            <div class="relative">
              <input class="field w-full py-2"
                :type="!displayPassword ? 'password' : 'text'"
                id="password"
                name="password"
                v-model="data.password"
                placeholder="Enter your password"
                required>
              <div class="inline-flex content-center absolute right-0 h-full">
                <img class="inline-block cursor-pointer m-auto" src="../../assets/img/password-eye.svg" v-if="!displayPassword" @click="togglePassword"/>
                <img class="inline-block cursor-pointer m-auto"
                  src="../../assets/img/password-eye-off.svg"
                  v-if="displayPassword"
                  @click="togglePassword"/>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="block" for="password">
              <span class="font-semibold font-circular">Confirm Password</span>
            </label>
            <div class="relative">
              <input class="field w-full py-2"
                type="password"
                id="password"
                name="password"
                v-model="data.confirmPassword"
                placeholder="Enter your password"
                required>
            </div>
          </div>
          <button
            :class="{
              'btn-primary w-full mb-8': true,
              'loading': loading,
            }"
            :disabled="loading">
            Set Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        email: null,
        password: null,
        confirmPassword: null,
      },
      displayPassword: false,
      loading: false,
      page: 0,
      reset: false,
      token: null,
    };
  },
  created() {
    if (this.$route.query.token) {
      this.page = 2;
      this.token = this.$route.query.token;
    }
  },
  methods: {
    async requestPasswordReset() {
      try {
        this.loading = true;
        await this.authServices.requestPasswordReset({
          email: this.data.email.toLowerCase(),
          isAdmin: true,
        });

        this.displaySuccess({ message: 'An email has been sent with further instructions.' });
        this.data.email = null;
        this.page = 0;
      } catch (err) {
        this.displayError(err);
      } finally {
        this.loading = false;
      }
    },
    async resetPassword() {
      try {
        if (this.data.password !== this.data.confirmPassword) {
          this.displayError('Password and confirmation password do not match.');
        } else {
          this.loading = true;
          await this.authServices.resetPassword({
            password: this.data.password,
            confirmPassword: this.data.confirmPassword,
            token: this.token,
          });

          this.displaySuccess({ message: 'Your password has been updated successfully.' });
          this.data.password = null;
          this.data.confirmPassword = null;
          this.page = 0;
        }
      } catch (err) {
        this.displayError(err);
      } finally {
        this.loading = false;
      }
    },
    async proceed() {
      try {
        this.loading = true;
        this.hasError = false;
        this.data.email = this.data.email.toLowerCase();
        const response = await this.authServices.login(this.data);
        const { user, token } = response.data;

        if (!['superadmin', 'admin'].includes(user.role)) {
          this.displayError('You\'re not allowed to  access this resource');
        } else {
          this.$store.commit('setCurrentUser', user);
          this.$store.commit('setJWT', token);
          this.displaySuccess({ message: 'Welcome back! Find everything just as you left it.' });
          // redirect the user to the appropriate page
          this.$router.push({ name: 'home' });
        }
      } catch (err) {
        this.displayError(err);
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.displayPassword = !this.displayPassword;
    },
    ...mapActions({
      displayError: 'displayError',
      displaySuccess: 'displaySuccess',
    }),
  },
};
</script>

<style lang="scss">
  .bg-overlay {
    background-image: url('../../assets/img/auth-bg-pattern.svg');
    background-size: cover;
  }
</style>
