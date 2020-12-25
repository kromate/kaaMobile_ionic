<template>
  <ion-page>
    <div class="ionCon">
      <ion-row class="ion-justify-content-center ">
        <ion-col class="ion-text-center ion-align-items-center">
          <h1>
            <span class="tex-primary">Guide</span>
          </h1>
        </ion-col>
      </ion-row>
    </div>
  </ion-page>
</template>

<script>
import { IonCol, IonRow, IonPage } from "@ionic/vue";

export default {
  components: { IonCol, IonRow, IonPage },
  data() {
    return {};
  },
};
</script>

<style scoped>
h1 {
  font-weight: 550 !important;
}
.lead {
  color: rgba(0, 0, 0, 0.726) !important;
  font-weight: 540;
  font-size: 1.1rem;
  padding: 1rem;
  word-spacing: 2px;
  line-height: 1.5rem;
}
.soft {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff !important;
  border-color: #1a6b2d;
  /* background: #488b89; */
  width: 9rem;
  height: 2.4rem;
  border-radius: 0.2rem;
  font-weight: 600;
}
.upload {
  color: #00276f !important;
  text-align: center;
  font-weight: 550 !important;
}
.tex-primary {
  color: #00276f !important;
  font-weight: 600;
  font-size: 2.5rem;
}
</style>
