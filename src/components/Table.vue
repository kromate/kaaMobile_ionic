<template>
  <div style="overflow-x:auto; overflow-y: hidden; min-width:65rem">
    <!-- table loader -->
    <ion-row class="ion-justify-content-center" v-if="loading">
      <!-- <b-spinner type="grow load" label="Loading..."></b-spinner> -->
    </ion-row>

    <!-- table main section -->
    <div class="ion-justify-content-center ion-align-items-center" v-else>
      <!-- table heading -->
      <div class="pl-3 mb-2">
        <ion-row class="d-flex d-full">
          <div
            v-for="(header, i) in headers"
            :key="i"
            class="header mr-2"
            :style="`width: ${header.width ? header.width : defaultColWidth}%;`"
          >
            <!-- <di></div> -->
            {{ header.text }}
          </div>
        </ion-row>
      </div>

      <!--table body -->
      <ion-row
        v-for="(data, i) in displayTable"
        :key="i"
        class="card col ion-justify-content-center ion-align-items-center pl-3 mb-3"
        :style="!tableHeight ? ' height: 55px;' : ''"
      >
        <ion-row class="ion-align-items-center" style="width:100% !important">
          <div
            v-for="(value, key) of populateTable(data)"
            :key="key"
            class="mr-2"
            :style="`width: ${getColWidth(key) || defaultColWidth}%;`"
          >
            <slot name="item" :item="{ [key]: key, data }">
              <span>{{ value }}</span>
            </slot>
          </div>
        </ion-row>
      </ion-row>
    </div>
  </div>
</template>

<script>
import { IonRow } from "@ionic/vue";
// import { logoTwitter, logoGithub, logoInstagram } from "ionicons/icons";
export default {
  name: "Table",
  components: {
    IonRow,
  },
  props: [
    "headers",
    "tableData",
    "tableHeight",
    "loading",
    "checkbox",
    "pageSync",
    "itemPerPage",
    "page",
  ],
  data() {
    return {
      itemLength: 0,
      checked: [],
      dot: false,
      pages: 0,
    };
  },
  watch: {
    tableData() {
      this.setPages();
    },
  },
  computed: {
    displayTable() {
      if (this.pageSync) {
        return this.paginate(this.tableData);
      } else {
        return this.tableData;
      }
    },

    getItemsWithColWidth() {
      let length = 0;

      this.headers.forEach((item) => {
        if (!item.width) {
          length++;
        }
      });
      return length;
    },
    defaultColWidth() {
      return this.roundToTwo(100 / this.getItemsWithColWidth);
    },
  },
  methods: {
    setPages() {
      const numberOfPages = Math.ceil(this.tableData.length / this.itemPerPage);
      this.$emit("page-count", numberOfPages);
    },
    paginate(data) {
      const page = this.page;
      const perPage = this.itemPerPage;
      const from = page * perPage - perPage;
      const to = page * perPage;
      return data.slice(from, to);
    },

    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    },
    getColWidth(key) {
      for (const item of this.headers) {
        if (item.width && item.value === key) return item.width;
      }
    },
    populateTable(data) {
      const element = {};

      this.headers.forEach((item) => {
        for (const key in data) {
          if (key === item.value) {
            element[key] = data[key];
            //item.width ? (data.width = item.width) : "";
          }
        }
      });
      return element;
    },
  },
};
</script>

<style scoped>
.pl-3 {
  padding-left: 1rem;
}
.mb-2 {
  margin-bottom: 1rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.header {
  color: #00276f !important;
  font-weight: 600;
  font-size: 1rem;
}
.load {
  background-color: #00276f !important;
  height: 3rem !important;
  width: 3rem !important;
}
.user-action:hover {
  background: #ebe5ed;
}
.sideDot1 {
  width: 7px;
  height: 7px;
  background-color: #46aa80;
}
.sideDot2 {
  width: 7px;
  height: 7px;
  background-color: #c3c2c4;
}

.card {
  /* background: #ffffff; */
  background: #5976ac;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  /* height: 55px; */
}

.user-table-body__image {
  height: 30px;
  width: 30px;
}

.custom-radius {
  border-radius: 7px;
}
</style>
