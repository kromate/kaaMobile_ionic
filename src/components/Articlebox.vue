<template>
  <div class="box">
    <p class="header">{{ data.title }}</p>

    <ion-row class="ion-wrap ion-justify-content-center">
      <div v-for="(item, index) in data.tags" :key="index" class="badge">{{ item }}</div>
    </ion-row>

    <button class="purple mt-2" @click="showModal = true">Details</button>
  </div>

  <transition name="slide" appear>
    <ion-modal :is-open="showModal" css-class="my-custom-class" @onDidDismiss="showModal = false">
      <div style="padding-top:1.8rem">
        <span>Title</span>
        <p class="text">{{ data.title }}</p>

        <span>University</span>
        <p class="text">{{ data.university }}</p>

        <span>Faculty</span>
        <p class="text">{{ data.faculty }}</p>

        <span>Department</span>
        <p class="text">{{ data.department }}</p>

        <span>Level</span>
        <p class="text">{{ data.level }}</p>

        <span>Uploader</span>
        <p class="text">{{ data.uploader }}</p>

        <div class="d-flex">
          <a :href="data.link" target="_blank"> <button class="green mt-2 mx-2">Watch</button></a>
          <button class="red mt-2  mx-2" @click="showModal = false">Close</button>
        </div>
      </div>
    </ion-modal>
  </transition>
</template>

<script>
import { IonRow, IonModal } from "@ionic/vue";
export default {
  components: { IonRow, IonModal },
  name: "VideoBox",
  props: ["data"],
  data() {
    return {
      showModal: false,
    };
  },

  mounted() {
    console.log(this.data);
  },
};
</script>

<style scoped>
.mt-2 {
  margin-top: 2rem;
}
button {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff !important;
  width: 9rem;
  height: 2.4rem;
  font-weight: 600;
  border: none;
}
a {
  color: inherit;
}
.red {
  background-color: #f52617 !important;
  color: white !important;
  width: 9rem;
}
.green {
  background-color: #006f4a !important;
  width: 9rem;
}
.close {
  position: absolute;
  top: 3px;
  right: 10px;
  font-weight: 900;
  font-size: 1.5rem;
  color: #000 !important;
  cursor: pointer;
}
.card {
  max-width: 550px;
}

.modall {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 99;
  width: 100%;
  height: 100%;
  max-width: 100%;
  background-color: rgb(0, 0, 0, 0.25);
  border: 1px solid #6c63ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.purple {
  background-color: #7c69ef !important;
}
.badge {
  background: #000;
  border-radius: 5px;
  color: #fff;
  padding: 7px;
  margin: 4px;
  font-weight: 200;
  letter-spacing: 1.4px;
}

.header {
  color: rgba(255, 255, 255, 0.877) !important;
  text-align: center;
  font-weight: 540;
  font-size: 1rem;
  word-spacing: 2.4px;
  letter-spacing: 1.7px;
  line-height: 1.3rem;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 210px;
  background: #111156;
  border-radius: 8px;
  margin: 1rem;
}
.column {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
span {
  display: block;
  font-weight: 700;
  color: #00276f;
}
.text {
  color: #08204d !important;
  font-weight: 540;
  font-size: 1rem;
  word-spacing: 3px;
  line-height: 1.3rem;
}
div {
  text-align: center;
  margin: 3px 0px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: scale(0);
}
</style>
