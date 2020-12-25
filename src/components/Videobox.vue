<template>
  <div class="ion-justify-content-center ion-align-items-center" style="flex-basis:1px !important">
    <ion-row
      class="box d-flex ion-justify-content-center ion-align-items-center"
      @click="showModal = !showModal"
    >
      <img src="@/assets/video.svg" alt="" />
    </ion-row>
    <button @click="showModal = !showModal" class="mb-2 primary ">Details</button>
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
  props: ["data", "index"],
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped>
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
.card {
  max-width: 550px;
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
span {
  display: block;
  font-weight: 700;
  color: #00276f;
}
.box {
  width: 200px;
  height: 150px;
  background: #000;
  border-radius: 8px;
  margin: 1rem;
}
.column {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.primary,
.btn-secondary {
  background-color: #00276f !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff !important;
  width: 9rem;
  height: 2.4rem;
  border-radius: 0.2rem;
  font-weight: 600;
  border: none;
}
.primary:hover,
.btn-secondary:hover {
  background: #00276f94 !important;
  border-color: #00276f94 !important;
}
.green {
  background-color: #006f4a !important;
}
.red {
  background-color: #f52617 !important;
  color: white !important;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: scale(0);
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
.modall {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  padding-top: 1rem !important;
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
.close {
  position: absolute;
  top: 3px;
  right: 10px;
  font-weight: 900;
  font-size: 1.5rem;
  color: #000 !important;
  cursor: pointer;
}
</style>
