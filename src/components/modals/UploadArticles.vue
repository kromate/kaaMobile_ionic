<template>
  <transition name="slide" appear>
    <ion-modal :is-open="show" css-class="modal_class" @onDidDismiss="$emit('close')">
      <form style="padding: 5%; text-align:start; " class="form" @submit.prevent="submit">
        <!-- <ion-row class="close" @click="$emit('close')">x</ion-row> -->
        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="nickname">NickName</label>
            <IonInput
              id="nickname"
              class="input mb-3"
              placeholder="Enter Your Nickname"
              v-model="Uploader"
              required
            ></IonInput>
          </div>
          <div class="flex_con">
            <label for="email">Email</label>
            <IonInput
              id="email"
              class="input mb-1"
              v-model="email"
              placeholder="Enter Your Email"
            ></IonInput>
          </div>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="University">University</label>
            <ion-select
              id="University"
              name="University"
              type="text"
              class="input"
              v-model="University"
              ok-text="Okay"
              cancel-text="close"
              required
            >
              <ion-select-option
                v-for="(opt, index) in universities"
                :key="index"
                :value="opt.value"
                >{{ opt.text }}</ion-select-option
              >
            </ion-select>
          </div>
          <div class="flex_con">
            <label for="Faculty">Faculty</label>
            <ion-select
              id="Faculty"
              name="Faculty"
              type="text"
              class="input"
              v-model="Faculty"
              ok-text="Okay"
              cancel-text="close"
              required
            >
              <ion-select-option
                v-for="(opt, index) in faculties"
                :key="index"
                :value="opt.value"
                >{{ opt.text }}</ion-select-option
              >
            </ion-select>
          </div>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="Department">Department</label>
            <IonInput
              id="Department"
              class="input mb-3"
              v-model="Department"
              placeholder="Enter the Department"
              required
            ></IonInput>
          </div>
          <div class="flex_con">
            <label for="Level">Level</label>
            <ion-select
              id="Level"
              name="Level"
              type="select"
              class="input"
              v-model="Level"
              ok-text="Okay"
              cancel-text="close"
              required
            >
              <ion-select-option v-for="(opt, index) in level" :key="index" :value="opt.value">{{
                opt.text
              }}</ion-select-option>
            </ion-select>
          </div>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="Department">Title</label>
            <IonInput
              id="title"
              class="input mb-3"
              v-model="title"
              placeholder="Enter the Video title"
              required
            ></IonInput>
          </div>
          <div class="flex_con">
            <label for="Link">Article Link</label>
            <IonInput
              id="art Link"
              type="url"
              class="input mb-3"
              v-model="Link"
              placeholder="Enter the Video Link"
              required
            ></IonInput>
          </div>
        </ion-row>
        <ion-row class="ion-justify-content-center mb-3">
          <div class="flex_con">
            <label for="tag">Tags</label>
            <TagInput @added="tag($event)" />
          </div>
        </ion-row>

        <ion-row class="ion-justify-content-center ">
          <button type="submit" class="green mt-2 mx-3">Upload</button>
          <button type="button" class="red mt-2 mx-3" @click="$emit('close')">close</button>
        </ion-row>
      </form>
    </ion-modal>
  </transition>
</template>

<script>
import { IonRow, IonModal, IonInput, IonSelect, IonSelectOption } from "@ionic/vue";

import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/firestore";
import "firebase/storage";

import TagInput from "@/components/TagInput.vue";
import faculties from "@/helpers/faculties.js";
import universities from "@/helpers/universities.js";
import level from "@/helpers/level.js";

const ArticleRef = firebase.firestore().collection("articles");
export default {
  name: "uploadArticles",
  components: { TagInput, IonRow, IonModal, IonInput, IonSelect, IonSelectOption },
  props: ["show"],
  data() {
    return {
      universities,
      faculties,
      level,
      Link: "",
      title: "",
      email: "",
      tags: [],
      University: "",
      Faculty: "",
      Department: "",
      Level: "",
      Uploader: "",
    };
  },
  methods: {
    tag(e) {
      console.log(e);
      const tagArray = Array.from(e);
      this.tags = tagArray;
    },
    reset() {
      this.Uploader = "";
      this.University = "";
      this.Faculty = "";
      this.Department = "";
      this.Level = "";
      this.Link = "";
      this.title = "";
      this.tags = "";
    },
    submit() {
      const data = {
        uploader: this.Uploader,
        university: this.University,
        faculty: this.Faculty,
        department: this.Department,
        level: this.Level,
        link: this.Link,
        title: this.title,
        tags: this.tags,
      };
      const uid = uuidv4();
      ArticleRef.doc(uid)
        .set(data)
        .then(() => {
          firebase
            .firestore()
            .collection("uploaders")
            .doc(this.email)
            .set({ email: this.email });
          this.reset();
          this.$emit("close");
        })
        .catch((error) => {
          console.log(error);
        });
    },
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

.form {
  overflow-y: scroll;
  padding: 10px;
}

.red {
  background-color: #f52617 !important;
  color: white !important;
  width: 9rem;
}
.green {
  background-color: #006f4a !important;
  color: white !important;
  width: 9rem;
}

button:disabled {
  cursor: not-allowed;
  background-color: grey;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #748194;
}
.input {
  width: 232px !important;
  height: 36px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  outline: none !important;
  border: none !important;
  background: #eef0f2 !important;
  color: #00276f !important;
  font-size: 14px !important;
  font-weight: bold !important;
}

label {
  display: block;
  font-size: 18px;
  padding: 5px 0px;
}
button {
  color: #1b4974 !important;
}
</style>
