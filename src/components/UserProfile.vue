<template>
  <div class="profile-card shadow p-4 mx-auto mt-5">
    <h2 class="text-center mb-4">User Profile</h2>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model="email"
          required
          disabled
        />
      </div>

      <!-- Password Update Section -->
      <div class="mb-3">
        <label for="new-password" class="form-label">New Password</label>
        <input
          id="new-password"
          type="password"
          class="form-control"
          v-model="newPassword"
          placeholder="Enter a new password"
        />
      </div>

      <button type="submit" class="btn btn-update">Update Profile</button>

      <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      newPassword: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  async created() {
    try {
      const user = auth.currentUser;
      this.uid = user.uid;
      this.email = user.email;
    } catch (error) {
      this.errorMessage = "Failed to fetch user data";
      console.error("Error fetching user data:", error);
    }
  },
  methods: {
    async updateProfile() {
      try {
        const user = auth.currentUser;
        if (user) {
          if (this.newPassword) {
            await updatePassword(user, this.newPassword);
          }
          this.successMessage = "Profile updated successfully!";
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.profile-card {
  max-width: 600px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #007bff;
  font-weight: bold;
}

.form-control {
  border: 2px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-update {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-update:hover {
  background-color: #0056b3;
}

.alert {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
</style>
