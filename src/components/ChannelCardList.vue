<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="showVideoSlide()">
        <v-list-item-avatar width="64px" height="64px" color="grey">
          <v-img :src="channel.id | channelThumbnailUrl"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ channel.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn @click.stop="" icon :href="`https://www.youtube.com/channel/${channel.id}`">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>
            {{ channel.subscriberCount | toSubscribeText }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-icon>
          {{ videos.length == 0 ? "mdi-chevron-down-circle-outline" : "mdi-chevron-up-circle-outline" }}
        </v-icon>
      </v-list-item>
    </v-card>

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
import Axios from "axios";
import VideoCard from "@/components/VideoCard.vue";
import { Video, VideoCommon } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";
import AppConfig from "@/domain/AppConfig";
import VideoService from "@/domain/VideoService";
import moment from "moment";

@Component({
  components: {
    VideoCard,
  },
  filters: {
    toSubscribeText: function(count: number) {
      if (10000 > count) return count + "人";
      if (100000 > count) return (count / 10000).toFixed(2) + "万人";
      if (1000000 > count) return (count / 10000).toFixed(1) + "万人";
      return count + "人";
    },
    channelThumbnailUrl: function(id: string) {
      return `${AppConfig.apiUrl}/image/channel/${id}/thumbnail`;
    },
  },
})
export default class ChannelCardList extends Vue {
  @Prop() private channel!: Channel;
  @Prop() private open!: Boolean;
  loading: boolean = false;

  videos: Video[] = [];

  async created() {
    if (this.open) {
      this.setVideoData();
    }
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
    (await VideoService.getChannelVideo(this.channel.id, "new", "")).forEach(v => this.videos.push(v));
  }

  async getVideos() {
    this.loading = true;

    const video = this.videos[this.videos.length - 1];
    const from = moment(video.uploadDate).format("YYYY-MM-DD HH:mm:ss");
    (await VideoService.getChannelVideo(this.channel.id, "get", from)).forEach(v => this.videos.push(v));

    this.loading = false;
  }
}
</script>
