<template>
  <ion-page>
    <div class="ionCon">
      <ion-row class="ion-justify-content-center ">
        <ion-col class="ion-text-center ion-align-items-center">
          <h1>
            <span class="tex-primary">Upload</span>
          </h1>
          <p class="lead ">
            Upload books, videos and articles that would be benefical to other students If this is
            your first time uploading please read the Guides
          </p>
        </ion-col>
      </ion-row>

      <ion-row class="ion-justify-content-center ion-text-center">
        <ion-select
          class="ion-select"
          placeholder="Select"
          v-model="selected"
          ok-text="Okay"
          cancel-text="close"
          required
        >
          <ion-select-option v-for="(opt, index) in options" :key="index" :value="opt.value">{{
            opt.text
          }}</ion-select-option>
        </ion-select>
      </ion-row>

      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-row class="upload ion-justify-content-center ion-align-items-center">
          <Uploadbox :type="selected" :disable="selected == ''" />
        </ion-row>
      </ion-row>
    </div>
  </ion-page>
</template>

<script>
import Uploadbox from "@/components/Uploadbox.vue";
import { IonCol, IonRow, IonSelect, IonSelectOption, IonPage } from "@ionic/vue";

export default {
  components: { Uploadbox, IonCol, IonRow, IonSelect, IonSelectOption, IonPage },
  data() {
    return {
      selected: "",
      placeholder: "",
      searchInput: "",
      data: [],
      loading: true,
      options: [
        { value: "", text: "Type", disabled: true },
        { value: "Book", text: "Book" },
        { value: "Video", text: "Video" },
        { value: "Article", text: "Article" },
      ],
    };
  },
};
</script>

<style scoped>
.lead {
  color: rgba(0, 0, 0, 0.726) !important;
  font-weight: 540;
  font-size: 1.1rem;
  padding: 1rem;
  word-spacing: 2px;
  line-height: 1.5rem;
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
