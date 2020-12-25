<template>
  <ion-page>
    <div class="ionCon">
      <ion-row class="ion-justify-content-center ">
        <ion-col class="ion-text-center ion-align-items-center">
          <h1>
            <span class="tex-primary">Videos</span>
          </h1>
          <p class="lead ">
            We currently have {{ NumBook }} in the Archive but you can view only
            {{ availableView }}.
            <br />
            <a>Learn More</a>
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

      <ion-row class="ion-justify-content-center ion-text-center ion-wrap">
        <ion-col>
          <IonInput
            v-if="
              selected == '' ||
                selected == 'Uploader' ||
                selected == 'Book Name' ||
                selected == 'Book Author' ||
                selected == 'Department'
            "
            class="input"
            :placeholder="placeholder"
            v-model="searchInput"
            type="search"
            :disabled="selected == ''"
          ></IonInput>
        </ion-col>
        <ion-col>
          <ion-select v-if="selected == 'University'" class="input" v-model="searchInput" required>
            <ion-select-option
              v-for="(opt, index) in universities"
              :key="index"
              :value="opt.value"
              >{{ opt.text }}</ion-select-option
            >
          </ion-select>
          <ion-select
            v-if="selected == 'Faculty'"
            class="input"
            v-model="searchInput"
            :options="faculties"
            required
          >
            <ion-select-option v-for="(opt, index) in faculties" :key="index" :value="opt.value">{{
              opt.text
            }}</ion-select-option>
          </ion-select>
          <ion-select
            v-if="selected == 'Level'"
            class="input"
            v-model="searchInput"
            :options="level"
            required
          >
            <ion-select-option v-for="(opt, index) in level" :key="index" :value="opt.value">{{
              opt.text
            }}</ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col>
          <button
            class="primary my-3 mt-3"
            :disabled="selected == '' || searchInput == ''"
            @click="searchButton"
          >
            Search
          </button>
        </ion-col>
      </ion-row>

      <div style="overflow-x: auto;">
        <NotFound v-if="empty && !data.length" />
        <ion-row class="ion-justify-content-center" v-if="!data.length && !empty">
          <ion-spinner></ion-spinner>
        </ion-row>

        <ion-row class="ion-wrap ion-justify-content-center ion-align-items-center" v-else>
          <VideoBox
            v-for="(item, index) in data"
            :key="item.title"
            :index="index.toString()"
            :data="data[index]"
          />
        </ion-row>
      </div>
    </div>
  </ion-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import VideoBox from "@/components/Videobox.vue";
import NotFound from "@/components/404.vue";
import faculties from "@/helpers/faculties.js";
import universities from "@/helpers/universities.js";
import level from "@/helpers/level.js";
import {
  IonCol,
  IonRow,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonSpinner,
} from "@ionic/vue";
export default {
  components: {
    VideoBox,
    NotFound,
    IonPage,
    IonRow,
    IonInput,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonSpinner,
  },
  data() {
    return {
      universities,
      faculties,
      level,

      empty: false,
      NumBook: "",
      selected: "",
      placeholder: "",
      searchInput: "",
      data: [],
      options: [
        { value: "", text: "Search by", disabled: true },
        { value: "Uploader", text: "Uploader" },
        { value: "University", text: "University" },
        { value: "Faculty", text: "Faculty" },
        { value: "Department", text: "Department" },
        { value: "Level", text: "Level" },
      ],
      loading: true,
    };
  },
  computed: {
    availableView() {
      return this.NumBook > 15 ? "15" : this.NumBook;
    },
  },

  methods: {
    loadData(querySnapshot) {
      querySnapshot.forEach((doc) => {
        const document = doc.data();
        this.data.push(document);
      });
      this.loading = false;
      console.log(this.data);
    },
    init() {
      firebase
        .firestore()
        .collection("videos")
        .get()
        .then((querySnapshot) => {
          this.NumBook = querySnapshot.size;
          this.loadData(querySnapshot);
        });
    },
    searchButton() {
      this.data = [];
      this.empty = false;

      const booksRef = firebase.firestore().collection("videos");
      const searchValue = this.searchInput;

      if (this.selected == "Uploader") {
        booksRef
          .orderBy("uploader")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "University") {
        booksRef
          .orderBy("university")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "Book Name") {
        booksRef
          .orderBy("bookName")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "Book Author") {
        booksRef
          .orderBy("bookAuthor")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "Faculty") {
        booksRef
          .orderBy("faculty")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "Department") {
        booksRef
          .orderBy("department")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      } else if (this.selected == "Level") {
        booksRef
          .orderBy("level")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              if (!querySnapshot.empty) {
                this.loadData(querySnapshot);
              } else {
                this.empty = true;
              }
            } else {
              this.empty = true;
            }
          });
      }

      this.loading = false;
    },
  },

  created() {
    this.init();
  },
};
</script>

<style scoped>
.input {
  width: 80% !important;
  background: #ffffff7a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0px auto;
  font-weight: 550;
  text-align: start !important;
}
.img-fluid {
  height: 20px;
  width: 20px;
}
.form-control {
  width: 60% !important;
  background: #ffffff7a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0px 9px;
  margin-right: 3rem;
  font-weight: 550;
}
@media (max-width: 1000px) {
  .form-control {
    width: 80% !important;
    background: #ffffff7a;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0px 9px;
    /* margin-right: 3rem; */
  }

  .mt-3 {
    margin-top: 0rem !important;
  }
}
.btn-outline-success {
  color: #fff !important;
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

.spinner {
  margin: 10px auto 0;
  width: 70px;
  text-align: center;
}
a {
  color: #00276f !important;
  cursor: pointer;
}
.tex-primary {
  color: #00276f !important;
  font-weight: 600;
  font-size: 2.5rem;
}
.load {
  background-color: #00276f !important;
  height: 3rem !important;
  width: 3rem !important;
}
</style>
