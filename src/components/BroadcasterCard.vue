<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="showVideoSlide()">
        <v-list-item-avatar width="64px" height="64px" color="grey">
          <v-img :src="apiUrl + 'image/channel/' + channel.id + '/thumbnail'"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ channel.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn @click.stop="" icon :href="'https://www.youtube.com/channel/' + channel.id">
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
          <VideoCard :video="video" :type="getType(video)"></VideoCard>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import Axios from "axios";
import moment from "moment";
import VideoCard from "@/components/VideoCard.vue";
import {Video} from "@/types/video.ts";
import Channel from "@/types/channel.ts";
import Broadcaster from "@/types/broadcaster.ts";
import GrobalValiables from "@/mixins/grobalValiables";

@Component({
  components: {
    VideoCard
  },
  filters: {
    toSubscribeText: function(count: number) {
      if (10000 > count) return count + "人";
      if (100000 > count) return (count / 10000).toFixed(2) + "万人";
      if (1000000 > count) return (count / 10000).toFixed(1) + "万人";
      return count + "人";
    }
  }
})
export default class BroadcasterCard extends Mixins(GrobalValiables) {
  @Prop() private broadcaster!: Broadcaster;
  @Prop() private channel!: Channel;
  @Prop() private channel2!: Channel;
  @Prop() private open!: Boolean;

  videos: Video[] = [];

  async created() {
    if (this.open) {
      this.setVideoData();
    }
  }

  getType(video: Video) {
    switch (video.type) {
      case "Upload":
        return "upload";
      case "PremierReserve":
        return "premier";
      case "PremierLive":
        return "live";
      case "PremierUpload":
        return "upload";
      case "LiveReserve":
        return "schedule";
      case "LiveLive":
        return "live";
      case "LiveArchive":
        return "archive";
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
    const url = this.apiUrl + "video?type=channel_video&channel_id=" + this.channel.id;
    const data: Video[] = (await Axios.get(url, {})).data;

    // 予定を抽出
    data.forEach(d => {
      if (d.type == "PremierReserve" || d.type == "LiveReserve") this.videos.push(d);
    });
    // ライブを抽出
    data.forEach(d => {
      if (d.type == "PremierLive" || d.type == "LiveLive") this.videos.push(d);
    });
    // 上記以外を抽出
    data.forEach(d => {
      if (d.type != "PremierReserve" && d.type != "LiveReserve" && d.type != "PremierLive" && d.type != "LiveLive") {
        this.videos.push(d);
      }
    });
  }
}
</script>
