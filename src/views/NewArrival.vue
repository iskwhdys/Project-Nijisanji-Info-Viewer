<style lang="scss">
#Contents {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

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
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.5);
  background-color: white;
  line-height: 1.2;
  margin: 6px;
}
/*
.Card-Shadow-1{    box-shadow: 0 0 6px rgb(3, 101, 178);}
.Card-Shadow-2{    box-shadow: 0 0 6px rgb(77, 193, 240);}
.Card-Shadow-3{    box-shadow: 0 0 6px rgba(0, 156, 78);}
.Card-Shadow-4{    box-shadow: 0 0 6px rgba(239,122,3);}
.Card-Shadow-5{    box-shadow: 0 0 6px rgba(219,8,45);}
*/
.Card-Score-1,.Card-Score-2 {
  box-shadow: 0 0 10px rgb(77, 193, 240);
}
.Card-Score-1:hover,.Card-Score-2:hover {
  box-shadow: 0 0 20px rgb(77, 193, 240);
}
.Card-Score-3,.Card-Score-4 {
  box-shadow: 0 0 10px rgba(239, 122, 3);
}
.Card-Score-3:hover,.Card-Score-4:hover {
  box-shadow: 0 0 20px rgba(239, 122, 3);
}
.Card-Score-5 {
  box-shadow: 0 0 12px rgba(219, 8, 45);
}
.Card-Score-5:hover {
  box-shadow: 0 0 24px rgba(219, 8, 45);
}
.Card-Link {
  color: inherit;
  text-decoration: inherit;
}
.Card-Link:hover {
  color: #00b5d1;
}
.Card-Link:hover .Card-Thumbnail-Time {
  visibility: hidden;
}

.Card-Thumbnail {
  position: relative;
}
.Card-Thumbnail-Time {
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 0px 4px;
  margin: 0px 0px 4px 0px;
  background: #fff;
  border-radius: 10px; /*角の丸み*/
  font-size: 12px;
}
.Card-Thumbnail-Duration {
  color: #4091dd; /*文字色*/
  border: solid 2px #4091dd; /*線*/
}
.Card-Thumbnail-Total {
  color: #df0000; /*文字色*/
  border: solid 2px #df0000; /*線*/
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
        <div class="Card" :class="(video.liveViews / 1000) | getFrameColor" v-for="video in liveVideos" :key="video.id">
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Total">{{ video.liveStart | toLiveTime }}</span>
            </div>
            <div class="Card-Title">
              {{ video.title }}
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">{{ video.liveStart | toYYYYMMDDHHmm }}</span>
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">👤{{ video.liveViews }}</span>
              <span v-if="video.likes != 0" class="Card-InfoItem">👍{{ video.likes }}({{ video | getRating }})</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="UploadFeald">
      <div class="UploadFealdTitel">新着動画</div>
      <div class="CardList ">
        <div class="Card" :class="(video.views / 20000) | getFrameColor" v-for="video in uploadVideos" :key="video.id">
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Duration">{{ video.duration | toTime }}</span>
            </div>
            <div class="Card-Title">
              {{ video.title }}
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">{{ video.uploadDate | toYYYYMMDDHHmm }}</span>
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">▶{{ video.views }}</span>
              <span v-if="video.likes != 0" class="Card-InfoItem">👍{{ video.likes }}({{ video | getRating }})</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="UploadFeald">
      <div class="UploadFealdTitel">ライブアーカイブ</div>
      <div class="CardList">
        <div class="Card" :class="(video.views / 20000) | getFrameColor" v-for="video in dailyArchives" :key="video.id">
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Duration">{{ video.duration | toTime }}</span>
            </div>
            <div class="Card-Title">
              {{ video.title }}
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">{{ video.liveStart | toYYYYMMDDHHmm }}</span>
            </div>
            <div class="Card-Info">
              <span class="Card-InfoItem">▶{{ video.views }}</span>
              <span v-if="video.likes != 0" class="Card-InfoItem">👍{{ video.likes }}({{ video | getRating }})</span>
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

Vue.filter("toLiveTime", function(startDate: Date) {
  const totalSec = moment(new Date()).diff(moment(startDate)) / 1000;
  const hour = Math.floor(Math.floor(totalSec / 60) / 60);
  const min = Math.floor((totalSec - hour * 60 * 60) / 60);
  const sec = totalSec - hour * 60 * 60 - min * 60;
  const sHour = hour > 0 ? hour + "時間" : "";
  const sMin = min > 0 ? min + "分" : "";
  return sHour + sMin + "経過";
});
Vue.filter("toYYYYMMDDHHmm", function(date: Date) {
  return moment(date).format("YYYY/MM/DD HH:mm");
});
Vue.filter("toTime", function(totalSec: number) {
  const hour = Math.floor(Math.floor(totalSec / 60) / 60);
  const min = Math.floor((totalSec - hour * 60 * 60) / 60);
  const sec = totalSec - hour * 60 * 60 - min * 60;
  const text = (hour > 0 ? hour + ":" : "") + (min >= 0 ? ("0" + min).slice(-2) + ":" : "") + ("0" + sec).slice(-2);

  return text;
});
Vue.filter("getRating", function(video: Video) {
  const sum = video.likes * 5 + video.dislikes;
  const count = video.likes + video.dislikes;
  const rate = sum / count;
  return rate.toFixed(2);
});
Vue.filter("getFrameColor", function(score: number) {
  var colNo = Math.floor(score);
  if (colNo > 5) colNo = 5;
  return "Card-Score-" + colNo;
});

@Component
export default class NewArrival extends Vue {
  apiUrl: string = "http://192.168.11.6:8090/api/";
  videos: Video[] = [];
  liveVideos: Video[] = [];
  dailyArchives: Video[] = [];
  uploadVideos: Video[] = [];

  async created() {
    console.debug("");
    console.debug("created-start");

    this.liveVideos = (await Axios.get(this.apiUrl + "/liveVideos", {})).data;
    this.dailyArchives = (await Axios.get(this.apiUrl + "/dailyArchives", {})).data;
    this.uploadVideos = (await Axios.get(this.apiUrl + "/dailyVideos", {})).data;

    console.debug("created-end");
  }
}
</script>
