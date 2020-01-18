<template>
  <v-container style="max-width:1185px">
    <div v-for="feald in fealds" :key="feald.id">
      <CommonCardList :feald="feald"></CommonCardList>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommonCardList from "@/components/CommonCardList.vue";

@Component({
  components: {
    CommonCardList
  }
})
export default class Home extends Vue {
  fealds = [
    {
      id: "live",
      title: "ライブ中",
      icon: "mdi-access-point",
      get: null,
      reload: { id: "new", flag: false },
      videos: []
    },
    {
      id: "upload",
      title: "新着動画",
      icon: "mdi-youtube-tv",
      get: { id: "get", flag: false, count: 10 },
      reload: { id: "new", flag: false },
      videos: []
    },
    {
      id: "archive",
      title: "アーカイブ",
      icon: "mdi-library-video",
      get: { id: "get", flag: false, count: 30 },
      reload: { id: "new", flag: false },
      videos: []
    }
  ];
}
</script>
