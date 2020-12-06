<template>
  <div>
    <v-sheet class="" elevation="8">
      <v-slide-group class="" show-arrows>
        <v-slide-item v-for="video in videos" :key="video.id">
          <VideoCard :video="video"></VideoCard>
        </v-slide-item>

        <v-slide-item v-if="videos.length != 0" style="margin:auto">
          <v-btn fab x-small @click="getVideos" :loading="loading">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import moment from "moment";
import Axios from "axios";

import AppConfig from "@/domain/AppConfig";
import VideoService from "@/domain/VideoService";
import { Video, VideoCommon } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";

import VideoCard from "@/components/VideoCard.vue";
@Component({
  components: {
    VideoCard,
  },
})
export default class ChannelVideos extends Vue {
  @Prop() private channel!: Channel;
  loading: boolean = false;

  videos: Video[] = [];

  async created() {
    this.setVideoData();
  }

  async showVideoSlide() {
    if (this.videos.length == 0) {
      this.setVideoData();
    } else {
      this.videos.splice(0);
    }
  }

  async setVideoData() {
    this.videos.splice(0);
    (await VideoService.getChannelVideo(this.channel.id, "", 0)).forEach(v => this.videos.push(v));
  }

  async getVideos() {
    this.loading = true;

    const video = this.videos[this.videos.length - 1];
    let date :Date = video.published;
    date.setHours(date.getHours() - 9);
    const from = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    (await VideoService.getChannelVideo(this.channel.id, from, 30)).forEach(v => this.videos.push(v));

    this.loading = false;
  }
}
</script>
