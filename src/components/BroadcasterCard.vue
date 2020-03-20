<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="showChannelCardList(broadcaster.channel)">
        <v-list-item-avatar width="64px" height="64px" color="white">
          <v-img :src="broadcaster.id | icomlUrl"> </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ broadcaster.name }}
            <v-btn @click.stop="" icon :href="broadcaster.twitter | twitterUrl">
              <v-icon color="blue">mdi-twitter</v-icon>
            </v-btn>
            <v-btn @click.stop="" icon :href="broadcaster.name | wikiUrl">
              <v-icon>mdi-wikipedia</v-icon>
            </v-btn>
          </v-list-item-title>

          <v-list-item-subtitle>
            <v-btn @click.stop="showChannelCardList(broadcaster.channel)" icon>
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>

            <span v-if="broadcaster.channel"> {{ broadcaster.channel.subscriberCount | toSubscribeText }} </span>

            <v-btn @click.stop="showChannelCardList(broadcaster.channel2)" icon v-if="broadcaster.youtube2">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>

            <span v-if="broadcaster.channel2"> {{ broadcaster.channel2.subscriberCount | toSubscribeText }} </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-icon> mdi-chevron-down-circle-outline </v-icon>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Video, VideoCommon } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";
import VideoService from "@/domain/VideoService";
import { Broadcaster } from "@/types/broadcaster.ts";
import AppConfig from "@/domain/AppConfig";
import moment from "moment";

@Component({
  components: {},
  filters: {
    toSubscribeText: function(count: number) {
      if (10000 > count) return count + "人";
      if (100000 > count) return (count / 10000).toFixed(2) + "万人";
      if (1000000 > count) return (count / 10000).toFixed(1) + "万人";
      return count + "人";
    },
    icomlUrl: function(id: string) {
      return `${AppConfig.apiUrl}/image/broadcaster/${id}`;
    },
    youtubelUrl: function(id: string) {
      return `https://www.youtube.com/channel/${id}`;
    },
    twitterUrl: function(id: string) {
      return `https://twitter.com/${id}`;
    },
    wikiUrl: function(name: string) {
      return `https://wikiwiki.jp/nijisanji/${name}`;
    },
  },
})
export default class BroadcasterCard extends Vue {
  @Prop() private broadcaster!: Broadcaster;
  @Prop() private open!: Boolean;
  loading: boolean = false;
  videos: Video[] = [];

  showChannelCardList(channel: Channel) {
    this.$emit("child-event", channel);
  }

  // async created() {
  //   if (this.open) {
  //     this.setVideoData();
  //   }
  // }

  // async showVideoSlide() {
  //   if (this.videos.length == 0) {
  //     this.setVideoData();
  //   } else {
  //     this.videos.splice(0);
  //   }
  // }

  // async setVideoData() {
  //   this.videos.splice(0);
  //   (await VideoService.getChannelVideo(this.channel.id, "new", "")).forEach(v => this.videos.push(v));
  // }

  // async getVideos() {
  //   this.loading = true;

  //   const video = this.videos[this.videos.length - 1];
  //   const from = moment(video.uploadDate).format("YYYY-MM-DD HH:mm:ss");
  //   (await VideoService.getChannelVideo(this.channel.id, "get", from)).forEach(v => this.videos.push(v));

  //   this.loading = false;
  // }
}
</script>
