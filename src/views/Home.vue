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

      <div class="Feald-Movie">
        <div class="Cards">
          <div class="Card" v-for="video in uploadVideos" :key="video.id">
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
export default class Home extends Vue {
  apiUrl: string = "http://localhost:8090/api/";
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
#field {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  
  

}

.Feald-Inline-Right {
  width: 212px;
  float: left;
}

.Feald-Inline-Left {
  width: 1020px;
  float: left;
}

.Feald-Live {
  overflow: auto;
  background-color: peachpuff;
  padding-bottom: 10px;
}

.Feald-Movie {
  overflow: auto;
  background-color: lightblue;
  
  padding-bottom: 10px;
}

.Feald-Reserve {
  overflow: auto;
  background-color: lightgreen;
  
  padding-bottom: 10px;
}

.Cards {
  flex-direction: column;
  flex-wrap: wrap;
}
.Card {
  width: 192px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: white;
  line-height: 1.2;
  margin: 10px 0px 0px 10px;

  float: left;
}
.Card-Link {
  display: block;
  color: inherit;
  text-decoration: inherit;
}

.Card-Thumbnail-Image {
  width: 192px;
  height: 107px;
  object-fit: cover;
}
.Card-Title {
  font-size: 14px;
  height: 64px;
  margin: 4px;
  overflow: hidden;
}
.Card-UploadDate {
  font-size: 11px;
  color: #999;
  margin: 4px;
}
.Card-Info {
  font-size: 11px;
  color: #999;
  margin: 2px;
}
.Card-InfoItem {
  font-size: 11px;
  color: #999;
  margin: 0px 2px;
}
</style>
