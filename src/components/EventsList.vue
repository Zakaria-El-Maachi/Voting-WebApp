<template>
  <div class="event-list">
    <h2 class="event-title">Events</h2>
    <ul class="list-group">
      <li v-for="event in events" :key="event.id" class="list-group-item">
        <div class="event-card">
          <img src={{ event.img }} alt="Event Image" class="event-img" />
          <div class="event-details">
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-description">{{ event.description }}</p>
            <p class="event-price">
              <strong>Price:</strong> {{ event.isFree ? 'Free' : `$${event.price}` }}
            </p>
            <p class="event-votes">
              <span>Yes: {{ event.yesVotes }}</span> |
              <span>No: {{ event.noVotes }}</span>
            </p>
            <small class="timestamp">
              {{ event.date.toDate().toLocaleString() }}
            </small>
          </div>
          <div class="vote-buttons">
            <button click="vote(event.id, true, event.yesVotes, event.noVotes)" class="btn-yes">Yes</button>
            <button @click="vote(event.id, false, event.yesVotes, event.noVotes)" class="btn-no">No</button>
          </div>
        </div>
      </li>
    </ul>
    <ErrorOverlay v-if="errorMessage" :message="errorMessage" @close="clearError" />
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, addDoc, getDocs, updateDoc, doc, where } from "firebase/firestore";
import ErrorOverlay from './ErrorOverlay.vue';

export default {
  components : {ErrorOverlay},
  data() {
    return {
      events: [],
      errorMessage: '',
      user: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
    this.fetchevents();
  },
  methods: {
    fetchevents() {
      const q = query(collection(db, "events"));
      onSnapshot(q, (snapshot) => {
        this.events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
    async vote(id, v, yesVotes, noVotes) {
      const votesSnapshot = await getDocs(query(collection(db, "votes"), where("userId", "==", this.user.uid)));
      const votesList = votesSnapshot.docs.map((doc) => doc.data().eventId);
      if (votesList.includes(id)) {
        this.errorMessage = 'You cannot vote again on this event.';
      } else {
        try {
          await addDoc(collection(db, "votes"), {
            userId: this.user.uid,
            eventId: id,
            vote: v,
            createdAt: new Date(),
          });
          const eventDocRef = doc(db, "events", id);
          if (v) {
            await updateDoc(eventDocRef, { yesVotes: yesVotes + 1 });
          } else {
            await updateDoc(eventDocRef, { noVotes: noVotes + 1 });
          }
        } catch (error) {
          this.errorMessage = 'An error occurred while voting. Please try again later.';
        }
      }
    },
    clearError() {
      this.errorMessage = '';
    },
  },
};
</script>


<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #ffffff;
}


.event-title {
  font-size: 20px;
  color: #007bff;
  margin: 0 0 10px;
}

.event-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-details {
  padding: 15px;
}

.vote-buttons {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.btn-yes,
.btn-no {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
}

.btn-yes {
  background-color: #28a745;
}

.btn-no {
  background-color: #dc3545;
}

.btn-yes:hover{
  background-color: green;
}
.btn-no:hover{
  background-color: red;
}

</style>