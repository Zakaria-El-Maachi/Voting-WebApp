<template>
  <div id="app">
    <NavBar @createGroupChat="createGroupChat" @startPrivateConversation="startPrivateConversation" @logout="logout" />
    <div v-if="loading" class="loading">Loading...</div>
    <router-view v-else />
  </div>
</template>

<script>
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from './components/NavBar.vue';  

export default {
  components: { NavBar },
  data() {
    return {
      loading: true,
      user: null,
    };
  },
  async created() {
    onAuthStateChanged(auth, async (user) => {
      this.loading = false;
      if (user) {
        this.user = user;

        if (this.$route && this.$route.name === "AuthComponent") {
          // this.$router.push({ name: "ChatList" });
        }
      } else {
        this.$router.push({ name: "AuthComponent" });
      }
    });
  },
};
</script>
