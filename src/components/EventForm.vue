<template>
  <div class="event-form">
    <h1>Create an Event</h1>
    <form @submit.prevent="submitEvent">
      <label>
        Title:
        <input type="text" v-model="event.title" required />
      </label>
      <label>
        Deadline Date:
        <input type="date" v-model="event.date" required />
      </label>
      <label>
        Description:
        <textarea v-model="event.description" required></textarea>
      </label>
      <label>
        Image Link:
        <input type="url" v-model="event.img" required />
      </label>
      <label>
        Is Free:
        <input type="checkbox" v-model="event.isFree" />
      </label>
      <label v-if="!event.isFree">
        Price:
        <input type="number" v-model="event.price" min="0" step="0.01" />
      </label>
      <button type="submit">Create Event</button>
    </form>
  </div>
</template>

<script>
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "EventForm",
  data() {
    return {
      event: {
        title: "",
        date: "",
        description: "",
        img: "",
        isFree: false,
        price: 0,
      },
    };
  },
  methods: {
    async submitEvent() {
      try {
        const newEvent = {
          ...this.event,
          date: new Date(this.event.date),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          noVotes: 0,
          yesVotes: 0,
        };

        if (this.event.isFree) {
          delete newEvent.price;
        }

        await addDoc(collection(db, "events"), newEvent);
        alert("Event created successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      }
    },
    resetForm() {
      this.event = {
        title: "",
        date: "",
        description: "",
        img: "",
        isFree: false,
        price: 0,
      };
    },
  },
};
</script>

<style scoped>
form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
}
</style>
