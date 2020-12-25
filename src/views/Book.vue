<template>
  <ion-page>
    <Error v-if="Error" />
    <div class="ionCon">
      <ion-row class="ion-justify-content-center ">
        <ion-col class="ion-text-center ion-align-items-center">
          <h1>
            <span class="tex-primary">Books</span>
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

      <div style="overflow-x:auto !important">
        <NotFound v-if="empty && !data.length" />
        <IonRow class="d-flex ion-justify-content-center" v-if="!data.length && !empty">
          <ion-spinner></ion-spinner>
        </IonRow>

        <Table
          style="overflow-x: auto;"
          :loading="loading"
          :headers="headers"
          :tableData="data"
          :newDesign="true"
          v-else
        >
          <template v-slot:item="{ item }">
            <div v-if="item.url">
              <a :href="item.data.url" :download="item.data.BN" target="_blank">
                <ion-icon :icon="download"></ion-icon>
              </a>
            </div>
            <div v-else-if="item.BN">
              {{ $filters.truncate(item.data.BN) }}
            </div>
            <div v-else-if="item.BA">
              {{ $filters.truncate(item.data.BA) }}
            </div>
            <div v-else-if="item.Uni">
              {{ $filters.truncate(item.data.Uni) }}
            </div>
            <div v-else-if="item.Fac">
              {{ $filters.truncate(item.data.Fac) }}
            </div>
            <div v-else-if="item.Dep" style="margin-left:10px">
              {{ $filters.truncate(item.data.Dep) }}
            </div>
            <div v-else-if="item.Lev" style="margin-left:10px">
              {{ $filters.truncate(item.data.Lev) }}
            </div>
            <div v-else-if="item.Sem" style="margin-left:12px">
              {{ $filters.truncate(item.data.Sem) }}
            </div>
            <div v-else-if="item.Upl" style="margin-left:12px">
              {{ $filters.truncate(item.data.Upl) }}
            </div>
          </template>
        </Table>
      </div>
    </div>
  </ion-page>
</template>

<script>
import Error from "@/components/Error.vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Table from "@/components/Table.vue";
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
import { download } from "ionicons/icons";

export default {
  components: {
    Table,
    Error,
    NotFound,
    IonPage,
    IonRow,
    IonSpinner,
    IonInput,
    IonCol,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      universities,
      faculties,
      level,

      download,

      empty: false,
      Error: false,
      NumBook: "",
      selected: "",
      placeholder: "",
      searchInput: "",
      data: [],
      options: [
        { value: "Uploader", text: "Uploader" },
        { value: "University", text: "University" },
        { value: "Book Name", text: "Book Name" },
        { value: "Book Author", text: "Book Author" },
        { value: "Faculty", text: "Faculty" },
        { value: "Department", text: "Department" },
        { value: "Level", text: "Level" },
      ],
      modalShow: false,
      loading: true,
      headers: [
        { text: "Dw", value: "url", width: 4 },
        { text: "Book Name", value: "BN", width: 12 },
        { text: "Book Author", value: "BA", width: 12 },
        { text: "University", value: "Uni", width: 12 },
        { text: "Faculty", value: "Fac", width: 12 },
        { text: "Department", value: "Dep", width: 12 },
        { text: "Level", value: "Lev", width: 12 },
        { text: "Uploader", value: "Upl", width: 12 },
      ],
    };
  },
  computed: {
    availableView() {
      return this.NumBook > 15 ? "15" : this.NumBook;
    },
  },
  filters: {
    truncate: function(text, length = 24, clamp) {
      clamp = clamp || "...";
      const node = document.createElement("div");
      node.innerHTML = text;
      const content = node.textContent;
      return content.length > length ? content.slice(0, length) + clamp : content;
    },
  },

  methods: {
    dropdown(x) {
      this.selected = x;
    },
    loadTableData(querySnapshot) {
      const storageReference = firebase.storage().ref();
      querySnapshot.forEach((doc) => {
        const document = doc.data();
        storageReference
          .child("books/" + `${document.book}`)
          .getDownloadURL()
          .then((url) => {
            console.log(document);
            const content = {
              url: url,
              BN: document.bookName,
              BA: document.bookAuthor,
              Uni: document.university,
              Fac: document.faculty,
              Dep: document.department,
              Lev: document.level,
              Upl: document.uploader,
            };
            console.log(content);
            this.data.push(content);
          }, (this.loading = false))
          .catch((error) => {
            console.log(error);
            this.Error = true;
          });
      });
    },
    initTable() {
      firebase
        .firestore()
        .collection("books")
        .get()
        .then((querySnapshot) => {
          this.NumBook = querySnapshot.size;
          this.loadTableData(querySnapshot);
        })
        .catch((error) => {
          console.log(error);
          this.Error = true;
        });
    },
    searchButton() {
      this.data = [];
      this.empty = false;

      const booksRef = firebase.firestore().collection("books");
      const searchValue = this.searchInput;

      if (this.selected == "Uploader") {
        booksRef
          .orderBy("uploader")
          .startAt(searchValue)
          .endAt(searchValue + "\uf8ff")
          .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
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
              this.loadTableData(querySnapshot);
            } else {
              this.empty = true;
            }
          });
      }

      this.loading = false;
    },
  },

  created() {
    this.initTable();
  },
};
</script>

<style scoped>
.ionCon {
  background-color: #4d5c7c;
}
.img-fluid {
  height: 20px;
  width: 20px;
}
.input {
  width: 80% !important;
  background: #ffffff7a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0px auto;
  font-weight: 550;
  text-align: start !important;
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

.primary,
.btn-secondary {
  background-color: #00276f !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff !important;
  width: 9rem;
  height: 2.4rem;
  border-radius: 0.2rem;
  font-weight: 600;
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
