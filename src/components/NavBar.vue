<template>
  <div class="navbar" :class="{ centered: !isLoggedIn }">
    <h1 class="app-name" @click="() => this.$router.push('/events')">Event Voting</h1>
    <div v-if="isLoggedIn" class="button-group">
      <button class="nav-button" @click="() => this.$router.push('/create')">Create Event</button>
      <button class="nav-button" @click="() => this.$router.push('/profile')">User Profile</button>
      <button class="nav-button" @click="logout">Logout</button>
    </div>
  </div>

  <ErrorOverlay v-if="errorMessage" :message="errorMessage" @close="errorMessage = ''" />
</template>


<script>
import ErrorOverlay from './ErrorOverlay.vue';
import { auth, signOut } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';


export default {
  components: { ErrorOverlay },
  data() {
    return {
      isLoggedIn: false,
      userId: '',
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
      if(user) this.userId = user.uid;
    });
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  padding: 10px 20px;
}

.app-name {
  font-size: 37px;
  font-family: 'Brush Script MT', cursive;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.nav-button {
  background-color: #0056b3;
  border: none;
  color: white;
  padding: 8px 15px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.nav-button:hover {
  background-color: #004494;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.centered {
  justify-content: center;
}
</style>
