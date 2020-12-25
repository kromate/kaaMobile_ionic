<template>
  <ion-page>
    <div class="ionCon">
      <ion-row class="ion-wrap ion-justify-content-center">
        <ion-col>
          <ion-img :src="image"></ion-img>
        </ion-col>

        <ion-col class="ion-text-center ion-align-items-center">
          <h1 class="display-7">
            Welcome <br />
            to <br />
            <span class="text-primary">Kromtech Academic Archive</span>
          </h1>

          <!-- Text -->
          <p class="text-muted mb-0 px-12">
            Our Goal is to reduce the stress it takes to find academic resources in Nigeria tertiary
            institution today.
            <br />
            We solve this by creating a database of every academic material in Nigeria Universities,
            these are categorized according to Universities. <br />
            Although we are currently trying our best to fill up the archive, We believe that with
            your help we can achieve this faster. <br />
            below are two buttons to Upload and Share.
            <br />
            Read our <a href="./guide.html">Guide</a> if this is your first time uploading
          </p>
          <div class="my-3">
            <ion-row class="ion-wrap ion-justify-content-center">
              <ion-button class="btn" color="primary">Share</ion-button>
              <ion-button class="btn" color="secondary">Upload</ion-button>
              <ion-button class="btn" color="tertiary">Request</ion-button>
            </ion-row>

            <div class="text-muted mt-3">
              Follow Us on
              <br />
              <a href="https://twitter.com/KROMTECH1" target="_blank"
                ><ion-icon :icon="logoTwitter" class="icon_size"></ion-icon
              ></a>
              <a href="https://www.instagram.com/krom__tech/" target="_blank"
                ><ion-icon :icon="logoInstagram" class="icon_size"></ion-icon
              ></a>
              <a href="https://github.com/krom-tech" target="_blank"
                ><ion-icon :icon="logoGithub" class="icon_size"></ion-icon
              ></a>
              <br />
              You can also support us on
              <a href="https://dashboard.flutterwave.com/donate/9dbk6ywhxjl1" target="_blank"
                >Rave</a
              >
            </div>
          </div>
        </ion-col>
      </ion-row>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonRow, IonCol, IonButton, IonIcon, IonImg } from "@ionic/vue";
import { logoTwitter, logoGithub, logoInstagram } from "ionicons/icons";
export default {
  name: "Home",
  components: {
    IonPage,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonImg,
  },
  data() {
    return {
      logoTwitter,
      logoGithub,
      logoInstagram,
      image: require("@/assets/kaa.svg"),
    };
  },
};
</script>

<style>
.icon_size {
  color: #00276f !important;
  font-size: 1.6rem;
  margin: 2px 4px;
}
ion-col {
  flex-basis: 100% !important;
  align-items: center;
}

.px-12 {
  padding: 0px 2rem;
}

.display-7 {
  font-size: 2rem;
  font-weight: 550;
}
.text-primary {
  color: #00276f !important;
}
.text-muted {
  color: #08204d !important;
  font-weight: 540;
  font-size: 1.1rem;
  padding: 1rem;
  word-spacing: 3px;
  line-height: 1.9rem;
}

.button-native {
  border-radius: 2px !important;
}
</style>
