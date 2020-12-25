<template>
  <div>
    <svg
      @click="disable ? '' : upload()"
      width="300"
      height="300"
      viewBox="0 0 30 30"
      fill="none"
      :class="disable ? '' : 'pointer'"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.1875 12.55C23.3375 8.2375 19.55 5 15 5C11.3875 5 8.25 7.05 6.6875 10.05C2.925 10.45 0 13.6375 0 17.5C0 21.6375 3.3625 25 7.5 25H23.75C27.2 25 30 22.2 30 18.75C30 15.45 27.4375 12.775 24.1875 12.55ZM17.5 16.25V21.25H12.5V16.25H8.75L15 10L21.25 16.25H17.5Z"
        :fill="disable ? '#484747f7' : '#00276f'"
      />
    </svg>
    <h1 :class="disable ? 'grey' : 'norm '">Upload {{ disable ? "" : type }}</h1>
    <UploadBooks :show="UploadBooks" @close="UploadBooks = false" />
    <UploadVideos :show="UploadVideos" @close="UploadVideos = false" />
    <UploadArticles :show="UploadArticles" @close="UploadArticles = false" />
  </div>
</template>

<script>
import UploadBooks from "@/components/modals/UploadBooks.vue";
import UploadVideos from "@/components/modals/UploadVideos.vue";
import UploadArticles from "@/components/modals/UploadArticles.vue";
export default {
  components: { UploadBooks, UploadVideos, UploadArticles },
  props: ["disable", "type"],
  name: "upload_component",
  data() {
    return {
      UploadBooks: false,
      UploadVideos: false,
      UploadArticles: false,
    };
  },
  methods: {
    upload() {
      console.log(this.type);
      if (this.type == "Book") {
        this.UploadBooks = true;
      } else if (this.type == "Video") {
        this.UploadVideos = true;
      } else {
        this.UploadArticles = true;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 550 !important;
}
.grey {
  color: #484747f7;
}
.norm {
  color: #00276f;
}
.pointer {
  cursor: pointer;
}
</style>
