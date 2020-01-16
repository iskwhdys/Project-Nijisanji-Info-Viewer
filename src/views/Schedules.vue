<template>
  <v-container style="max-width:1185px">
    <CommonCardList :feald="feald"></CommonCardList>
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
export default class Schedules extends Vue {
  feald = {
    id: "schedules",
    title: "配信予定",
    icon: "mdi-timetable",
    get: { id: "get", flag: false, count: 30 },
    reload: { id: "new", flag: false },
    videos: []
  };
}
</script>
