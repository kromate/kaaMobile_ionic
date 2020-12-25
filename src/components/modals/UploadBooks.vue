<template>
  <transition name="slide" appear>
    <ion-modal :is-open="show" css-class="modal_class" @onDidDismiss="$emit('close')">
      <form class="form" @submit.prevent="submit">
        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="nickname">NickName</label>
            <IonInput
              id="nickname"
              name="nickname"
              type="text"
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
              name="email"
              type="email"
              class="input mb-3"
              v-model="email"
              placeholder="Enter Your Email"
            ></IonInput>
          </div>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <div class="flex_con">
            <label for="Book Name">Book Name</label>
            <IonInput
              id="Book Name"
              name="Book Name"
              class="input mb-3"
              type="text"
              placeholder="Enter the Book Name"
              v-model="BookName"
              required
            ></IonInput>
          </div>
          <div class="flex_con">
            <label for="Book Author">Book Author</label>
            <IonInput
              id="Book Author"
              name="Book Author"
              type="text"
              class="input mb-3"
              v-model="BookAuthor"
              placeholder="Enter the Book Author"
              required
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
              name="Department"
              class="input mb-3"
              type="text"
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
            <div class="flex_con custom-upload">
              <label class="dropdown cust" for="book" data-element="custom-upload-button"
                >{{ title }}
              </label>
              <div class="flex_con status">{{ perc }}</div>
              <input
                class="custom"
                id="book"
                name="book"
                type="file"
                data-behaviour="custom-upload-input"
                @change="update"
                required
              />
            </div>
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
import faculties from "@/helpers/faculties.js";
import universities from "@/helpers/universities.js";
import level from "@/helpers/level.js";

const BookRef = firebase.firestore().collection("books");

export default {
  components: { IonRow, IonModal, IonInput, IonSelect, IonSelectOption },
  name: "Upload_Books",
  props: ["show"],
  data() {
    return {
      universities,
      faculties,
      level,

      perc: "",
      title: "Upload",
      BookName: "",
      BookAuthor: "",
      email: "",
      University: "",
      Faculty: "",
      Department: "",
      Level: "",
      Uploader: "",
    };
  },
  methods: {
    update(evt) {
      const input = evt.currentTarget.value.split("\\").pop();
      console.log(input);
      this.title = input;
    },
    submit() {
      const data = {
        uploader: this.Uploader,
        university: this.University,
        bookName: this.BookName,
        bookAuthor: this.BookAuthor,
        faculty: this.Faculty,
        department: this.Department,
        level: this.Level,
        book: this.title,
      };

      const uid = uuidv4();
      BookRef.doc(uid)
        .set(data)
        .then(() => {
          firebase
            .firestore()
            .collection("uploaders")
            .doc(this.email)
            .set({ email: this.email });
        })
        .then(() => {
          console.log("UPLOAD-FILE called!");
          const storageReference = firebase.storage().ref();
          const file = document.getElementById("book").files[0];

          const uploadTask = storageReference.child("books/" + file.name).put(file);

          uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.title = Math.floor(progress) + "% uploaded";
          });
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
.status {
  font-size: 1rem;
}
.cust {
  text-align: center !important;
  border: 1px solid #00276f;
  min-width: 170px !important;
}
.custom {
  display: none;
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
