<style lang="scss">
.Size-MovieFeald {
  width: 100%;
  padding: 5px;
  margin: 5px 0px;
  font-size: 16px;
  font-weight: bold;
}
.Size-Card {
  width: 144px;
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.5);
  line-height: 1.2;
  margin: 8px;
}
.Card-Thumbnail-Image {
  width: 144px;
  height: 80px;
  object-fit: cover;
}
@media screen and (min-width: 560px) {
  .Size-Card {
    width: 176px;
  }
  .Card-Thumbnail-Image {
    width: 176px;
    height: 98px;
  }
}
@media screen and (min-width: 960px) {
  .Size-MovieFeald {
    width: 1152px;
    padding: 5px;
    margin: 5px 0px;
    font-size: 18px;
    font-weight: bold;
  }
}

.CardList {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
}

.Action-Item {
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.5);
  border-radius: 50%;
  background: #ffffff; /*背景色*/
  display: flex;
  align-items: center;
  justify-content: center;
}
.Action-Item-Title {
  width: 30px;
  height: 30px;
  margin: 2px 5px;
}
.Action-Item-List {
  width: 40px;
  height: 40px;
  margin: 0px 10px;
}

.Card {
  justify-content: center;
  background-color: white;
  position: relative;
  font-weight: normal;
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
  padding: 2px;
}
.Card-InfoItem {
  font-size: 11px;
  color: #999;
  margin: 0px 2px;
  text-align: left;
}
.Card-Channel {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.Card-Channel-Thumbnail {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.MovieFeald {
  color: #494949; /*文字色*/
  background: #f4f4f4; /*背景色*/
}
.LiveFeald {
  border-left: solid 5px #ff0000; /*左線*/
  border-bottom: solid 3px #ff0000; /*下線*/
}
.LiveFealdTitle {
  border-bottom: solid 3px #ff0000; /*下線*/
}
.UploadFeald {
  border-left: solid 5px #48d87f; /*左線*/
  border-bottom: solid 3px #48d87f; /*下線*/
}
.UploadFealdTitle {
  border-bottom: solid 3px #48d87f; /*下線*/
}
.ArchiveFeald {
  border-left: solid 5px #7db4e6; /*左線*/
  border-bottom: solid 3px #7db4e6; /*下線*/
}
.ArchiveFealdTitle {
  border-bottom: solid 3px #7db4e6; /*下線*/
}
.Card-Score-1,
.Card-Score-2 {
  box-shadow: 0 0 10px rgb(77, 193, 240);
}
.Card-Score-1:hover,
.Card-Score-2:hover {
  box-shadow: 0 0 20px rgb(77, 193, 240);
}
.Card-Score-3,
.Card-Score-4 {
  box-shadow: 0 0 10px rgba(239, 122, 3);
}
.Card-Score-3:hover,
.Card-Score-4:hover {
  box-shadow: 0 0 20px rgba(239, 122, 3);
}
.Card-Score-5 {
  box-shadow: 0 0 12px rgba(219, 8, 45);
}
.Card-Score-5:hover {
  box-shadow: 0 0 24px rgba(219, 8, 45);
}
</style>

<template>
  <div>
    <div class="Size-MovieFeald MovieFeald LiveFeald">
      <div class="LiveFealdTitle CardList">
        <span>ライブ配信中</span>
        <span
          class="Action-Item Action-Item-Title fas fa-redo"
          v-on:click="reloadLiveVideos"
          :class="isLiveReloading ? 'fa-sync fa-spin' : ''"
        />
      </div>
      <div class="CardList ">
        <div
          class="Size-Card Card"
          :class="(video.liveViews / 1000) | getFrameColor"
          v-for="video in liveVideos"
          :key="video.id"
        >
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Total">{{ video.liveStart | toLiveTime }}</span>
            </div>
            <div class="Card-Info">
              <div class="Card-Title">{{ video.title }}</div>
              <div class="Card-InfoItem">{{ video.liveStart | toFormatDate }}</div>
              <div class="Card-InfoItem">
                <span>👤{{ video.liveViews }}</span>
                <span v-if="video.likes != 0">👍{{ video.likes }}({{ video | getRating }})</span>
              </div>
            </div>
          </a>
          <div class="Card-Channel" v-if="video.channel">
            <a :href="'https://www.youtube.com/channel/' + video.channelId" :title="video.channel.title">
              <img class="Card-Channel-Thumbnail" :src="video.channel.thumbnail" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="Size-MovieFeald MovieFeald UploadFeald">
      <div class="UploadFealdTitle CardList">
        <span>新着動画</span>
        <span
          class="Action-Item Action-Item-Title fas fa-redo"
          v-on:click="reloadUploadVideos"
          :class="isUploadReloading ? 'fa-sync fa-spin' : ''"
        />
      </div>
      <div class="CardList ">
        <div
          class="Size-Card Card"
          :class="(video.views / 20000) | getFrameColor"
          v-for="video in uploadVideos"
          :key="video.id"
        >
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Duration">{{ video.duration | toTime }}</span>
            </div>
            <div class="Card-Info">
              <div class="Card-Title">{{ video.title }}</div>
              <div class="Card-InfoItem">{{ video.uploadDate | toFormatDate }}</div>
              <div class="Card-InfoItem">
                <span>▶{{ video.views }}</span>
                <span v-if="video.likes != 0">👍{{ video.likes }}({{ video | getRating }})</span>
              </div>
            </div>
          </a>
          <div class="Card-Channel" v-if="video.channel">
            <a :href="'https://www.youtube.com/channel/' + video.channelId" :title="video.channel.title">
              <img class="Card-Channel-Thumbnail" :src="video.channel.thumbnail" />
            </a>
          </div>
        </div>
        <div class="Action-Item Action-Item-List" v-on:click="getUploadVideos">
          <i class="fas fa-lg" :class="isUploadGetting ? 'fa-sync fa-spin' : 'fa-arrow-right'"></i>
        </div>
      </div>
    </div>

    <div class="Size-MovieFeald MovieFeald ArchiveFeald">
      <div class="ArchiveFealdTitle CardList">
        <span>ライブアーカイブ</span>
        <span
          class="Action-Item Action-Item-Title fas fa-redo"
          v-on:click="reloadArchiveVideos"
          :class="isArchiveReloading ? 'fa-sync fa-spin' : ''"
        />
      </div>
      <div class="CardList">
        <div
          class="Size-Card Card"
          :class="(video.views / 20000) | getFrameColor"
          v-for="video in archiveVideos"
          :key="video.id"
        >
          <a class="Card-Link" :href="'https://www.youtube.com/watch?v=' + video.id">
            <div class="Card-Thumbnail">
              <img class="Card-Thumbnail-Image" :src="video.thumbnail" />
              <span class="Card-Thumbnail-Time Card-Thumbnail-Duration">{{ video.duration | toTime }}</span>
            </div>
            <div class="Card-Info">
              <div class="Card-Title">{{ video.title }}</div>
              <div class="Card-InfoItem">{{ video.liveStart | toFormatDate }}</div>
              <div class="Card-InfoItem">
                <span>▶{{ video.views }}</span>
                <span v-if="video.likes != 0">👍{{ video.likes }}({{ video | getRating }})</span>
              </div>
            </div>
          </a>
          <div class="Card-Channel" v-if="video.channel">
            <a :href="'https://www.youtube.com/channel/' + video.channelId" :title="video.channel.title">
              <img class="Card-Channel-Thumbnail" :src="video.channel.thumbnail" />
            </a>
          </div>
        </div>
        <div class="Action-Item Action-Item-List" v-on:click="getArchiveVideos">
          <i class="fas fa-lg" :class="isArchiveGetting ? 'fa-sync fa-spin' : 'fa-arrow-right'"></i>
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
  title: string;
  description: string;
  subscriberCount: number;
  thumbnail: string;
}
interface Video {
  id: string;
  channelId: string;
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
  channel: Channel;
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
Vue.filter("toFormatDate", function(date: Date) {
  return moment(date).format("M/DD HH:mm");
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
export default class Home extends Vue {
  // 本番用
  apiUrl: string = "http://ik1-330-25303.vs.sakura.ne.jp:8090/api/";
  // 開発用
  // apiUrl: string = "http://localhost:8090/api/";

  liveVideos: Video[] = [];
  uploadVideos: Video[] = [];
  archiveVideos: Video[] = [];

  isLiveReloading: boolean = false;
  isUploadReloading: boolean = false;
  isArchiveReloading: boolean = false;

  // isLiveGetting: boolean = false;
  isUploadGetting: boolean = false;
  isArchiveGetting: boolean = false;

  async created() {
    this.reloadLiveVideos();
    this.reloadUploadVideos();
    this.reloadArchiveVideos();
  }

  async reloadLiveVideos() {
    if (this.isLiveReloading) return;
    this.isLiveReloading = true;
    this.liveVideos = [];
    Axios.get(this.apiUrl + "liveVideos", {})
      .then(async response => {
        this.liveVideos = await this.downloadChannelThumbnail(response.data);
      })
      .finally(() => (this.isLiveReloading = false));
  }

  async reloadUploadVideos() {
    if (this.isUploadReloading) return;
    this.isUploadReloading = true;
    this.uploadVideos = [];
    Axios.get(this.apiUrl + "dailyVideos", {})
      .then(async response => {
        this.uploadVideos = await this.downloadChannelThumbnail(response.data);
      })
      .finally(() => (this.isUploadReloading = false));
  }

  async reloadArchiveVideos() {
    if (this.isArchiveReloading) return;
    this.isArchiveReloading = true;
    this.archiveVideos = [];
    Axios.get(this.apiUrl + "dailyArchives", {})
      .then(async response => {
        this.archiveVideos = await this.downloadChannelThumbnail(response.data);
      })
      .finally(() => (this.isArchiveReloading = false));
  }

  async getUploadVideos() {
    if (this.isUploadGetting) return;
    this.isUploadGetting = true;
    const lastVideo = this.uploadVideos[this.uploadVideos.length - 1];
    const from = moment(lastVideo.uploadDate).format("YYYY-MM-DD HH:mm:ss");
    Axios.get(this.apiUrl + "uploadVideos?from=" + from + "&count=10", {})
      .then(async response => {
        const data = await this.downloadChannelThumbnail(response.data);
        data.forEach(d => this.uploadVideos.push(d));
      })
      .finally(() => (this.isUploadGetting = false));
  }
  async getArchiveVideos() {
    if (this.isArchiveGetting) return;
    this.isArchiveGetting = true;
    const lastVideo = this.archiveVideos[this.archiveVideos.length - 1];
    const from = moment(lastVideo.liveStart).format("YYYY-MM-DD HH:mm:ss");
    Axios.get(this.apiUrl + "archiveVideos?from=" + from + "&count=30", {})
      .then(async response => {
        const data = await this.downloadChannelThumbnail(response.data);
        data.forEach(d => this.archiveVideos.push(d));
      })
      .finally(() => (this.isArchiveGetting = false));
  }

  async downloadChannelThumbnail(videos: Video[]) {
    var channels: Channel[] = [];

    for (const v of videos) {
      var channel: Channel = channels.find(c => c.id == v.channelId) as Channel;
      if (channel == null) {
        channel = (await Axios.get(this.apiUrl + "channel/" + v.channelId + "?MiniThumbnail=0", {})).data;
        channels.push(channel);
      }
      v.channel = channel;
    }
    return videos;
  }
}
</script>
