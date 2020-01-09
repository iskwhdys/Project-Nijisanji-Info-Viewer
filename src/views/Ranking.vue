<template>
  <div id="field">

    <div class="Feald-Inline-Left">
      <div class="Feald-Live">
        <div class="Cards">
          <div class="Card" v-for="video in liveVideos" :key="video.id">
            <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
              <div class="Card-Thumbnail">
                <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              </div>
              <div class="Card-Title">
                {{ video.title }}
              </div>
              <div class="Card-UploadDate">
                <span>{{ video.uploadDate | moment }}</span>
              </div>
              <div class="Card-Info">
                <span class="Card-InfoItem">再生:{{ video.views }}</span>
                <span class="Card-InfoItem">高評価:{{ video.likes }}({{ video | getRating }})</span>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";
import moment from "moment";

interface Channel {
  id: string;
  info: any;
  channelIcon: string;
}
interface Video {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  likes: number;
  dislikes: number;
  duration: number;
  uploadDate: Date;
  liveStart: Date;
  liveEnd: Date;
  liveSchedule: Date;
  liveViews: number;
  enabled: boolean;
}

Vue.filter("moment", function(date: Date) {
  return moment(date).format("YYYY/MM/DD HH:mm");
});
Vue.filter("getRating", function(video: Video) {
  const sum = video.likes * 5 + video.dislikes;
  const count = video.likes + video.dislikes;
  const rate = sum / count;
  return rate.toFixed(2);
});
Vue.filter("getRatingStar", function(video: Video) {
  const sum = video.likes * 5 + video.dislikes;
  const count = video.likes + video.dislikes;
  return "★".repeat(parseInt((sum / count).toFixed(0)));
});

@Component
export default class NewArrival extends Vue {
  apiUrl: string = "http://192.168.11.6:8090/api/";
  videos: Video[] = [];
  uploadVideos: Video[] = [];
  reserveVideos: Video[] = [];
  liveVideos: Video[] = [];
  fealds: any[] = [
    { id: "Feald-Live", items: this.liveVideos },
    { id: "Feald-Movie", items: this.uploadVideos },
    { id: "Feald-Reserve", items: this.reserveVideos }
  ];

  async created() {
    console.debug("");
    console.debug("created-start");

    this.videos = (await Axios.get(this.apiUrl + "/dailyVideos", {})).data;

    this.getUploadedVideo(this.videos).forEach(v => this.uploadVideos.push(v));
    this.getReserveVideo(this.videos).forEach(v => this.reserveVideos.push(v));
    this.getLiveVideo(this.videos).forEach(v => this.liveVideos.push(v));

    console.debug("created-end");
  }

  getReserveVideo(videos: Video[]) {
    var list = new Array();
    for (const video of videos) {
      if (video.liveSchedule && !video.liveStart) {
        list.push(video);
      } else if (video.views == 0) {
        list.push(video);
      }
    }
    return list;
  }
  getUploadedVideo(videos: Video[]) {
    return videos.filter(v => {
      if (v.liveEnd) return true;
      if (!v.liveStart && v.views > 0) return true;

    });
  }
  getLiveVideo(videos: Video[]) {
    return videos.filter(v => {
      if (v.liveStart && !v.liveEnd) return true;
    });
  }
}
</script>

<style lang="scss">
</style>
