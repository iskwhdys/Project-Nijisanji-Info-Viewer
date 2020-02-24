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
                <v-btn fab x-small @click="reloadVideos(field)" :loading="field.reload.flag">
                  <v-icon>
                    mdi-rotate-left
                  </v-icon>
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
                  "
                >
                  <v-icon v-if="filter.value">mdi-check-bold</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </h3>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row dense justify="start">
      <v-col xl="2" v-for="video in filterVideos" :key="video.id">
        <VideoCard v-on:child-event="showChannelPanel(video)" :video="video" :showIcon="true" />
      </v-col>

      <v-col v-if="field.get" cols="12" align-items="center">
        <v-btn block @click="getVideos(field)" :loading="field.get.flag">
          <v-icon>
            mdi-chevron-down-circle-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="showChannelCardList" inset>
      <ChannelCardList v-if="showChannelCardList" :channel="channel" :open="true" />
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import moment from "moment";
import VideoCard from "@/components/VideoCard.vue";
import { Video, Rank, VideoCommon } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";
import ChannelCardList from "@/components/ChannelCardList.vue";
import { Dictionary } from "vue-router/types/router";
import ChannelService from "@/domain/ChannelService";
import VideoService from "@/domain/VideoService";

@Component({
  components: {
    VideoCard,
    ChannelCardList
  }
})
export default class CommonCardList extends Vue {
  @Prop() private field!: any;

  showChannelCardList: Boolean = false;
  channel!: Channel;

  filters = [
    { value: true, key: Rank.none },
    { value: true, key: Rank.low },
    { value: true, key: Rank.middle },
    { value: true, key: Rank.high }
  ];

  getRankColor(rank: Rank) {
    return VideoCommon.getRankColor(rank);
  }

  async created() {
    this.reloadVideos(this.field);
  }

  async showChannelPanel(video: Video) {
    if (this.showChannelCardList == false) {
      this.channel = await ChannelService.get(video.channelId);
    }
    this.showChannelCardList = !this.showChannelCardList;
  }

  async reloadVideos(field: any) {
    field.reload.flag = true;

    field.videos.splice(0, field.videos.length);
    const data: Video[] = await VideoService.getFieldVideo(field.id, field.reload.id);
    data.forEach(d => field.videos.push(d));
    this.filterChange(field.videos);

    field.reload.flag = false;
  }

  async getVideos(field: any) {
    field.get.flag = true;
    const lastVideo = field.videos[field.videos.length - 1];
    const date =
      field.id == "upload"
        ? lastVideo.uploadDate
        : field.id == "live" || field.id == "archive"
        ? lastVideo.liveStart
        : lastVideo.liveSchedule;
    const from = moment(date).format("YYYY-MM-DD HH:mm:ss");

    const videos: Video[] = await VideoService.getFieldVideoFrom(field.id, field.get.id, from);
    videos.forEach(d => field.videos.push(d));
    this.filterChange(field.videos);

    field.get.flag = false;
  }

  filterVideos: Video[] = [];

  filterChange(videos: Video[]) {
    this.filterVideos.splice(0, this.filterVideos.length);
    videos.forEach(d => {
      if (this.filters[d.rank].value) {
        this.filterVideos.push(d);
      }
    });
  }
}
</script>
