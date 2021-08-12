<template>
  <div>
    <v-row>
      <v-col>
        <v-divider></v-divider>
        <h3>
          <v-container class="ma-0 py-0">
            <v-row>
              <v-col class="px-0 py-1 d-flex align-center">
                <v-icon :color="field.icon.color">{{ field.icon.name }}</v-icon>
                {{ field.title }}
                <v-btn
                  fab
                  x-small
                  @click="
                    filterVideos.splice(0, filterVideos.length);
                    reloadVideos(field);
                    $ga.event('CommonCardList', 'Reload', field.id);
                  "
                  :loading="field.reload.flag"
                >
                  <v-icon>mdi-rotate-left</v-icon>
                </v-btn>
              </v-col>

              <v-col v-if="field.filter" class="py-1">
                <v-btn
                  fab
                  x-small
                  v-for="filter in filters"
                  :key="filter.key"
                  :color="getRankColor(filter.key)"
                  @click="
                    filter.value = !filter.value;
                    filterChange(field.videos);
                    $ga.event('CommonCardList', 'Filter', field.id);
                  "
                >
                  <v-icon v-if="filter.value">mdi-check-bold</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-checkbox
                v-if="field.autoReload"
                class="my-0 py-0"
                dense
                v-model="enabledAutoReload"
                label="ライブ自動更新(1分間隔)"
                hide-details="false"
              />
              <v-progress-circular
                class="mx-2"
                color="primary"
                size="24"
                rotate="-90"
                width="3"
                v-if="enabledAutoReload"
                :buffer-value="100"
                :value="(100 / RELOAD_TIME) * reloadCount"
              />
              <v-checkbox
                class="my-0 py-0"
                dense
                v-model="filterArk"
                label="ARKを除外"
                hide-details="false"
                v-if="showFilterArk"
              />
            </v-row>
          </v-container>
        </h3>
        <v-divider />
      </v-col>
    </v-row>

    <v-row dense justify="start">
      <v-col xl="2" v-for="video in filterVideos" :key="video.id">
        <VideoCard
          v-on:child-event="showChannelPanel(video)"
          :video="video"
          :showIcon="true"
        />
      </v-col>

      <v-col v-if="field.get" cols="12" align-items="center">
        <v-btn
          block
          large
          @click="
            getVideos(field);
            $ga.event('CommonCardList', 'Load', field.id);
          "
          :loading="field.get.flag"
        >
          <v-icon>mdi-chevron-down-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="showChannelCard">
      <div v-if="showChannelCard && broadcaster">
        <BroadcasterCard
          v-on:child-event="showChannelCard = !showChannelCard"
          :broadcaster="broadcaster"
          :icon="'mdi-close'"
        />
        <ChannelVideos :channel="broadcaster.channel" />
        <ChannelVideos
          :channel="broadcaster.channel2"
          v-if="broadcaster.channel2"
        />
      </div>
      <div v-if="showChannelCard && channel">
        <ChannelCard
          v-on:child-event="showChannelCard = !showChannelCard"
          :channel="channel"
          :open="true"
        />
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import moment from "moment";

import VideoService from "@/domain/VideoService";
import ChannelService from "@/domain/ChannelService";
import BroadcasterService from "@/domain/BroadcasterService";
import WebStorage from "@/domain/WebStorage";

import { Broadcaster } from "@/types/broadcaster";
import { Channel } from "@/types/channel";
import { Video, Rank, VideoCommon } from "@/types/video";

import VideoCard from "@/components/VideoCard.vue";
import ChannelCard from "@/components/ChannelCard.vue";
import BroadcasterCard from "@/components/BroadcasterCard.vue";
import ChannelVideos from "@/components/ChannelVideos.vue";

@Component({
  components: {
    VideoCard,
    ChannelCard,
    ChannelVideos,
    BroadcasterCard,
  },
})
export default class CommonCardList extends Vue {
  @Prop() private field!: any;

  // Arkを除外フィルターの有効化
  showFilterArk: boolean = false;

  showChannelCard: boolean = false;
  broadcaster: Broadcaster | null = null;
  channel: Channel | null = null;

  filterArk: boolean = false;
  enabledAutoReload: boolean = false;
  reloadCount: number = -1;
  timerId: number = -1;
  readonly RELOAD_TIME: number = 60;

  filters = [
    { value: true, key: Rank.none },
    { value: true, key: Rank.low },
    { value: true, key: Rank.middle },
    { value: true, key: Rank.high },
  ];

  getRankColor(rank: Rank) {
    return VideoCommon.getRankColor(rank);
  }

  async created() {
    this.reloadVideos(this.field);
    if (this.field.autoReload) {
      this.enabledAutoReload = WebStorage.enabledAutoReload;
    }

    if (this.showFilterArk) {
      this.filterArk = WebStorage.filterArk;
    }
  }

  @Watch("filterArk")
  changeFilterArk() {
    this.filterChange(this.field.videos);
    WebStorage.filterArk = this.filterArk;
    this.$ga.event("CommonCardList", "FilterARK", this.filterArk + "");
  }

  @Watch("enabledAutoReload")
  changeAutoReload() {
    if (this.enabledAutoReload) {
      this.reloadCount = this.RELOAD_TIME;
      this.timerId = setInterval(this.decrementReloadCount, 500);
      if (!this.field.reload.flag) {
        this.reloadVideos(this.field);
      }
    } else {
      clearInterval(this.timerId);
    }
    WebStorage.enabledAutoReload = this.enabledAutoReload;
    this.$ga.event("CommonCardList", "Timer", this.enabledAutoReload + "");
  }
  decrementReloadCount() {
    this.reloadCount = this.reloadCount - 0.5;
    if (this.reloadCount < 0) {
      this.reloadCount = this.RELOAD_TIME;
      this.reloadVideos(this.field);
      this.$ga.event("CommonCardList", "Timer", "TimerReload");
    }
  }

  async showChannelPanel(video: Video) {
    if (this.showChannelCard == false) {
      try {
        this.broadcaster = await BroadcasterService.getFromChannel(
          video.channel
        );
        this.channel = null;
      } catch (error) {
        this.channel = await ChannelService.get(video.channel);
        this.broadcaster = null;
      }
    }

    this.showChannelCard = !this.showChannelCard;
  }

  async reloadVideos(field: any) {
    field.reload.flag = true;
    try {
      field.videos.splice(0, field.videos.length);
      const data: Video[] = await VideoService.getFieldVideo(field.id);
      data.forEach((d) => field.videos.push(d));
      this.filterChange(field.videos);
    } catch (error) {
      //
    }
    field.reload.flag = false;
  }

  async getVideos(field: any) {
    field.get.flag = true;
    try {
      const lastVideo = field.videos[field.videos.length - 1];
      const date: Date = this.getVideoDate(field, lastVideo);
      date.setHours(date.getHours() - 9);
      const from = moment(date).format("YYYY-MM-DDTHH:mm:ss");

      const videos: Video[] = await VideoService.getFieldVideoFrom(
        field.id,
        from,
        field.get.count
      );
      videos.forEach((d) => field.videos.push(d));
      this.filterChange(field.videos);
    } catch (error) {
      //
    }
    field.get.flag = false;
  }

  getVideoDate(field: any, video: Video): Date {
    if (field.id == "upload") {
      return new Date(video.uploadDate);
    }
    if (field.id == "live" || field.id == "archive") {
      return new Date(video.liveStart);
    }
    return new Date(video.liveSchedule);
  }

  filterVideos: Video[] = [];

  filterChange(videos: Video[]) {
    this.filterVideos.splice(0, this.filterVideos.length);
    videos.forEach((d) => {
      if (this.filterArk) {
        if (d.title.includes("ARK")) {
          return;
        }
      }

      if (this.filters[d.rank].value) {
        this.filterVideos.push(d);
      }
    });
  }
}
</script>
