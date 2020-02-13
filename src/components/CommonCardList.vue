<template>
  <div>
    <v-row>
      <v-col>
        <v-divider></v-divider>
        <h3>
          <v-icon :color="feald.icon.color">{{ feald.icon.name }}</v-icon>
          {{ feald.title }}
          <v-btn fab small @click="reloadVideos(feald)" :loading="feald.reload.flag">
            <v-icon>
              mdi-rotate-left
            </v-icon>
          </v-btn>
        </h3>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row dense justify="start">
      <v-col xl="2" v-for="video in feald.videos" :key="video.id">
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
import Video from "@/types/video.ts";
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
      feald.videos.push(d);
    });
    feald.reload.flag = false;
  }
  async getVideos(feald: any) {
    feald.get.flag = true;
    const lastVideo = feald.videos[feald.videos.length - 1];
    const date =
      feald.id == "upload" ? lastVideo.uploadDate : feald.id == "live" ? lastVideo.liveStart : lastVideo.liveSchedule;
    const from = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const url = this.apiUrl + "video/" + feald.id;
    const param = "?mode=" + feald.get.id + "&from=" + from;

    const videos: Video[] = (await Axios.get(url + param, {})).data;
    videos.forEach(d => feald.videos.push(d));
    feald.get.flag = false;
  }
}
</script>
