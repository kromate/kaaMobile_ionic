<template>
  <ion-app class="home">
    <ion-router-outlet />
    <bottom-nav />
  </ion-app>
</template>

<script lang="ts">
import BottomNav from "@/components/bottomNav.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    BottomNav,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
* {
  font-family: "Noto Sans", sans-serif;
}

.ion-select {
  width: 100px !important;
  color: #313182 !important;
  background-color: rgb(111 158 111 / 90%) !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  border-radius: 0.25rem !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  width: 10rem !important;
  height: 2.4rem !important;
  border-radius: 0.2rem !important;
  font-weight: 600 !important;
  border-color: #00276f !important;
  margin-bottom: 0.7rem;
}
.ionCon {
  background-color: #4d5c7c;
  overflow-y: auto !important;
  overflow-x: hidden;
}
body {
  font-family: "Noto Sans", sans-serif;
  background-color: #4d5c7c !important;
}
.lead {
  padding: 2px 10px;
  font-size: 1.25rem;
}

button {
  border-radius: 2px !important;
  outline: none !important;
  border: none !important;
  margin-top: 7px;
}
.button-native {
  border-radius: 2px !important;
}
input {
  padding-left: 4px !important;
}
.mx-2 {
  margin: 0px 5px !important;
}

.mx-3 {
  margin: 0px 5px !important;
}
.mt-2 {
  margin-top: 10px !important;
}
.flex_con {
  margin: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
