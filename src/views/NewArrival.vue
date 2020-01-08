<style lang="scss">
#Contents {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.CardList {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.Card {
  width: 192px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: white;
  line-height: 1.2;
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
.MovieFeald {
}
.LiveFeald {
  padding: 10px;
  margin: 10px;
  color: #494949; /*文字色*/
  background: #f4f4f4; /*背景色*/
  border-left: solid 5px #ff0000; /*左線*/
  border-bottom: solid 3px #ff0000; /*下線*/
}
.LiveFealdTitel {
  font-size: 18px;
  font-weight: bold;
  border-bottom: solid 3px #ff0000; /*下線*/
}

.UploadFeald {
  padding: 10px;
  margin: 10px;
  color: #494949; /*文字色*/
  background: #f4f4f4; /*背景色*/
  border-left: solid 5px #7db4e6; /*左線*/
  border-bottom: solid 3px #7db4e6; /*下線*/
}

.UploadFealdTitel {
  font-size: 18px;
  font-weight: bold;
  border-bottom: solid 3px #7db4e6; /*下線*/
}
</style>

<template>
  <div id="Contents">
    <div class="LiveFeald">
      <div class="LiveFealdTitel">ライブ配信中</div>
      <div class="CardList ">
        <div class="Card" v-for="video in liveVideos" :key="video.id">
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
            </div>
            <div class="Card-Title">
              {{ video.title }}
            </div>
            <div class="Card-UploadDate">
              <span>{{ video.liveStart | moment }}</span>
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">再生:{{ video.views }}</span>
              <span class="Card-InfoItem">高評価:{{ video.likes }}({{ video | getRating }})</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="UploadFeald">
      <div class="UploadFealdTitel">アップロード動画</div>
      <div class="CardList ">
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
  liveVideos: Video[] = [];

  async created() {
    console.debug("");
    console.debug("created-start");

    this.videos = (await Axios.get(this.apiUrl + "/dailyVideos", {})).data;
    this.liveVideos = (await Axios.get(this.apiUrl + "/liveVideos", {})).data;

    this.getUploadedVideo(this.videos).forEach(v => this.uploadVideos.push(v));
    
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
}
</script>
