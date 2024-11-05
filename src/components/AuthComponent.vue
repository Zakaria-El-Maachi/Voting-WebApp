<template>
  <div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'login' }" @click.prevent="activeTab = 'login'" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'signup' }" @click.prevent="activeTab = 'signup'" href="#">Sign Up</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <form @submit.prevent="activeTab === 'login' ? login() : signUp()">
              <div v-if="activeTab === 'signup'">
                <div class="mb-3">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div v-if="activeTab === 'login'">
                <div class="mb-3">
                  <label for="loginEmail" class="form-label">Email</label>
                  <input
                    id="loginEmail"
                    v-model="loginEmail"
                    type="email"
                    class="form-control"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="loginPassword" class="form-label">Password</label>
                  <input
                    id="loginPassword"
                    v-model="loginPassword"
                    type="password"
                    class="form-control"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 mb-2">
                {{ activeTab === 'login' ? 'Login' : 'Sign Up' }}
              </button>
              
              <div v-if="errorMessage" class="text-danger mt-3">
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loginEmail = ref("");
    const loginPassword = ref("");
    const activeTab = ref("login");
    const errorMessage = ref("");
    const router = useRouter();

    const signUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
        router.push({ name: "events" });
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPassword.value);
        router.push("/events");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return {
      email,
      password,
      loginEmail,
      loginPassword,
      activeTab,
      signUp,
      login,
      errorMessage
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  background-color: #007bff;
  color: white;
  border-bottom: none;
}

.nav-tabs .nav-link {
  color: white;
  font-weight: bold;
}

.nav-tabs .nav-link.active {
  background-color: #0056b3;
}

.form-control {
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
