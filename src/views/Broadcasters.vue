<template>
  <div>
    <v-container style="max-width:1185px">
      <v-row dense>
        <v-col v-if="!this.$vuetify.breakpoint.xs">
          <v-btn-toggle v-model="gridMode" rounded mandatory dense @change="changeGridMode">
            <v-btn value="12"><v-icon>mdi-view-agenda-outline</v-icon> </v-btn>
            <v-btn value="6"> <v-icon>mdi-grid-large</v-icon> </v-btn>
            <v-btn value="4"> <v-icon>mdi-grid</v-icon> </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col>
          <v-select
            v-model="sortKind"
            :items="['登録者数', '名前', 'デビュー']"
            label="並び順"
            @change="changeSortKind"
          ></v-select>
        </v-col>
        <v-col>
          <v-btn-toggle v-model="sortMode" rounded mandatory dense @change="changeSortMode">
            <v-btn value="1"><v-icon>mdi-sort-ascending</v-icon> </v-btn>
            <v-btn value="-1"> <v-icon>mdi-sort-descending</v-icon> </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <v-row dense v-if="loading">
        <v-col>
          <v-progress-circular :size="50" indeterminate></v-progress-circular>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col xs="12" :sm="gridMode" v-for="broadcaster in broadcasters" :key="broadcaster.id">
          <BroadcasterCard
            :broadcaster="broadcaster"
            v-on:child-event="showChannelPanel"
            :icon="'mdi-chevron-down-circle-outline'"
          />
        </v-col>
      </v-row>

      <v-bottom-sheet v-if="showChannelCard" v-model="showChannelCard">
        <ChannelCard :channel="broadcaster.channel" :open="true" />
        <ChannelCard v-if="broadcaster.channel2" :channel="broadcaster.channel2" :open="true" />
      </v-bottom-sheet>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BroadcasterService from "@/domain/BroadcasterService";
import { Broadcaster } from "@/types/broadcaster.ts";

import BroadcasterCard from "@/components/BroadcasterCard.vue";
import ChannelCard from "@/components/ChannelCard.vue";

@Component({
  components: {
    BroadcasterCard,
    ChannelCard,
  },
})
export default class BroadcasterList extends Vue {
  broadcasters: Broadcaster[] = [];
  originBroadcaster: Broadcaster[] = [];
  loading: Boolean = true;
  gridMode: string = "";

  sortKind: string = "";
  sortMode: string = "";

  showChannelCard: Boolean = false;
  broadcaster!: Broadcaster;

  async created() {
    this.initSetting();

    this.originBroadcaster = await BroadcasterService.getActive();
    this.setData();

    this.loading = false;
  }

  setData() {
    this.broadcasters.splice(0);

    this.originBroadcaster.sort(this.sort).forEach(d => {
      this.broadcasters.push(d);
    });
  }

  showChannelPanel(broadcaster: Broadcaster) {
    if (this.showChannelCard == false) {
      this.broadcaster = broadcaster;
    }
    this.showChannelCard = !this.showChannelCard;
  }

  sort(a: Broadcaster, b: Broadcaster): number {
    var mode = false;

    if (this.sortKind == "名前") mode = a.kana > b.kana;
    if (this.sortKind == "登録者数") mode = a.channel.subscriberCount > b.channel.subscriberCount;
    if (this.sortKind == "デビュー") mode = a.startDate > b.startDate;
    if (this.sortKind == "最新配信日") mode = a.kana > b.kana;

    return (mode ? 1 : -1) * Number(this.sortMode);
  }

  initSetting() {
    if (localStorage.getItem("BroadcasterGridMode") == null) {
      localStorage.setItem("BroadcasterGridMode", "6");
    }
    this.gridMode = localStorage.getItem("BroadcasterGridMode")!;

    if (localStorage.getItem("BroadcasterSortKind") == null) {
      localStorage.setItem("BroadcasterSortKind", "登録者数");
    }
    this.sortKind = localStorage.getItem("BroadcasterSortKind")!;

    if (localStorage.getItem("BroadcasterSortMode") == null) {
      localStorage.setItem("BroadcasterSortMode", "-1");
    }
    this.sortMode = localStorage.getItem("BroadcasterSortMode")!;
  }

  changeGridMode() {
    localStorage.setItem("BroadcasterGridMode", this.gridMode);
  }
  changeSortKind() {
    localStorage.setItem("BroadcasterSortKind", this.sortKind);
    this.setData();
  }
  changeSortMode() {
    localStorage.setItem("BroadcasterSortMode", this.sortMode);
    this.setData();
  }
}
</script>
