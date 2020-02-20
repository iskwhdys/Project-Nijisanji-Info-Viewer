<template>
  <div>
    <v-row>
      <v-col>
        <v-divider></v-divider>
        <h3>
          <v-container class="ma-0 py-0">
            <v-row>
              <v-col class="px-0 py-1 d-flex align-center">
                <v-icon :color="feald.icon.color">{{ feald.icon.name }}</v-icon>
                {{ feald.title }}
                <v-btn fab x-small @click="reloadVideos(feald)" :loading="feald.reload.flag">
                  <v-icon>
                    mdi-rotate-left
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col v-if="feald.filter" class="py-1">
                <v-btn
                  fab
                  x-small
                  v-for="filter in filters"
                  :key="filter.key"
                  :color="getRankColor(filter.key)"
                  @click="
                    filter.value = !filter.value;
                    filterChange(feald.videos);
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
        <VideoCard v-on:child-event="showChannelPanel(video)" :video="video" :type="feald.id" :showIcon="true" />
      </v-col>

      <v-col v-if="feald.get" cols="12" align-items="center">
        <v-btn block @click="getVideos(feald)" :loading="feald.get.flag">
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
import Axios from "axios";
import moment from "moment";
import VideoCard from "@/components/VideoCard.vue";
import { Video, Rank, VideoCommon } from "@/types/video.ts";
import Channel from "@/types/channel.ts";
import GrobalValiables from "@/mixins/grobalValiables";
import ChannelCardList from "@/components/ChannelCardList.vue";
import { Dictionary } from "vue-router/types/router";

@Component({
  components: {
    VideoCard,
    ChannelCardList
  }
})
export default class CommonCardList extends Mixins(GrobalValiables) {
  @Prop() private feald!: any;

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
    this.reloadVideos(this.feald);
  }

  async showChannelPanel(video: Video) {
    if (this.showChannelCardList == false) {
      const url = this.apiUrl + "channel/" + video.channelId;
      this.channel = (await Axios.get(this.apiUrl + "channel/" + video.channelId, {})).data;
    }
    this.showChannelCardList = !this.showChannelCardList;
  }

  async reloadVideos(feald: any) {
    feald.reload.flag = true;
    feald.videos.splice(0, feald.videos.length);
    const url = this.apiUrl + "video/" + feald.id + "?mode=" + feald.reload.id;
    const data: Video[] = (await Axios.get(url, {})).data;
    data.forEach(d => {
      VideoCommon.setVideoRank(feald.id, d);
      feald.videos.push(d);
    });
    this.filterChange(feald.videos);
    feald.reload.flag = false;
  }

  async getVideos(feald: any) {
    feald.get.flag = true;
    const lastVideo = feald.videos[feald.videos.length - 1];
    const date =
      feald.id == "upload"
        ? lastVideo.uploadDate
        : feald.id == "live" || feald.id == "archive"
        ? lastVideo.liveStart
        : lastVideo.liveSchedule;
    const from = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const url = this.apiUrl + "video/" + feald.id;
    const param = "?mode=" + feald.get.id + "&from=" + from;

    const videos: Video[] = (await Axios.get(url + param, {})).data;
    videos.forEach(d => {
      VideoCommon.setVideoRank(feald.id, d);
      feald.videos.push(d);
    });
    this.filterChange(feald.videos);

    feald.get.flag = false;
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
