<template>
  <div>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home"></ion-icon>
          <ion-label>home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="book" href="/book">
          <ion-icon :icon="book"></ion-icon>
          <ion-label>book</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="video" href="/video">
          <ion-icon :icon="videocam"></ion-icon>
          <ion-label>video</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="article" href="/article">
          <ion-icon :icon="bookmark"></ion-icon>
          <ion-label>article</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="guide" href="/guide">
          <ion-icon :icon="help"></ion-icon>
          <ion-label>Guide</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="upload" href="/upload">
          <ion-icon :icon="cloudUpload"></ion-icon>
          <ion-label>upload</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </div>
</template>

<script>
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from "@ionic/vue";
import { book, home, videocam, bookmark, cloudUpload, help } from "ionicons/icons";

export default {
  name: "bottomNav",
  components: { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs },
  setup() {
    return {
      home,
      bookmark,
      cloudUpload,
      videocam,
      book,
      help,
    };
  },
};
</script>
