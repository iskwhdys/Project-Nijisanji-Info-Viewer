<style lang="scss">
.title-text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 0.6em;
  line-height: 1.1em;
}
v-card-text {
  color: inherit;
  text-decoration: inherit;
}
.info-text {
  font-size: 0.8em;
  line-height: 0.3em;
}
.Card-Channel-Icon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.Card-Thumbnail-Time {
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 0px 4px;
  margin: 0px 0px 0px 0px;
  background: #fff;
  border-radius: 10px; /*角の丸み*/
  font-size: 12px;
}
.Card-Thumbnail-Duration {
  color: #4091dd;
  border: solid 2px #4091dd;
}
.Card-Thumbnail-Total {
  color: #df0000;
  border: solid 2px #df0000;
}
.Card-Buttom-Frame {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <v-card :width="$vuetify.breakpoint.xs ? 144 : 176" :href="'https://www.youtube.com/watch?v=' + video.id">
    <div>
      <v-img
        :width="$vuetify.breakpoint.xs ? 144 : 176"
        :height="$vuetify.breakpoint.xs ? 80 : 98"
        :src="apiUrl + 'video/' + this.video.id + '/thumbnail_mini'"
      >
        <span v-if="type == 'live'" class="Card-Thumbnail-Time Card-Thumbnail-Total">
          {{ video.liveStart | toLiveTime }}
        </span>
        <span
          v-else-if="type == 'upload' || type == 'archive' || type == 'premier'"
          class="Card-Thumbnail-Time Card-Thumbnail-Duration"
        >
          {{ video.duration | toTime }}
        </span>
        <span v-else-if="type == 'schedule'" class="Card-Thumbnail-Time Card-Thumbnail-Duration"> </span>
      </v-img>

      <div style="position:relative">
        <div
          class="Card-Buttom-Frame"
          :style="type == 'live' ? video.liveViews / 1000 : (video.views / 20000) | getFrameStyle"
        ></div>
        <v-card-title style="padding:8px; height:60px">
          <div class="title-text">
            {{ video.title }}
          </div>
        </v-card-title>
        <v-card-text style="padding:8px;">
          <div>
            <div v-if="(type == 'live') | (type == 'archive')" class="info-text">
              {{ video.liveStart | toFormatDate }}
            </div>
            <div v-else-if="type == 'upload'" class="info-text">{{ video.uploadDate | toFormatDate }}</div>
            <div v-else-if="type == 'premier'" class="info-text">{{ video.liveSchedule | toFormatDateYYYY }} 公開</div>
            <div v-else-if="type == 'schedule'" class="info-text">{{ video.liveSchedule | toFormatDateYYYY }} 開始</div>
            <span class="info-text">
              <span v-if="type == 'live'">👤{{ video.liveViews }}</span>
              <span v-else-if="type == 'premier' || type == 'schedule'"></span>
              <span v-else>▶{{ video.views }}</span>
              <span v-if="video.likes != 0">👍{{ video.likes }}</span>
              <span v-if="video.likes != 0 && !($vuetify.breakpoint.xs && showIcon)">({{ video | getRating }})</span>
            </span>
          </div>
        </v-card-text>
      </div>
    </div>
    <a v-if="showIcon" :href="'https://www.youtube.com/channel/' + video.channelId" :title="video.channelTitle">
      <v-img class="Card-Channel-Icon" :src="apiUrl + 'channel/' + this.video.channelId + '/thumbnail_mini'" />
    </a>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import moment from "moment";
import Video from "@/types/video.ts";
import Channel from "@/types/channel.ts";
import GrobalValiables from "@/mixins/grobalValiables";

@Component({
  components: {
    VideoCard
  },
  filters: {
    toLiveTime: function(startDate: Date) {
      const totalSec = moment(new Date()).diff(moment(startDate)) / 1000;
      const hour = Math.floor(Math.floor(totalSec / 60) / 60);
      const min = Math.floor((totalSec - hour * 60 * 60) / 60);
      const sec = totalSec - hour * 60 * 60 - min * 60;
      const sHour = hour > 0 ? hour + "時間" : "";
      const sMin = min > 0 ? min + "分" : "";
      return sHour + sMin + "経過";
    },
    toFormatDate: function(date: Date) {
      return moment(date).format("M/DD HH:mm");
    },
    toFormatDateYYYY: function(date: Date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    },
    toTime: function(totalSec: number) {
      const hour = Math.floor(Math.floor(totalSec / 60) / 60);
      const min = Math.floor((totalSec - hour * 60 * 60) / 60);
      const sec = totalSec - hour * 60 * 60 - min * 60;
      const text = (hour > 0 ? hour + ":" : "") + (min >= 0 ? ("0" + min).slice(-2) + ":" : "") + ("0" + sec).slice(-2);
      return text;
    },
    getRating: function(video: Video) {
      const sum = video.likes * 5 + video.dislikes;
      const count = video.likes + video.dislikes;
      const rate = sum / count;
      return rate.toFixed(2);
    },
    getFrameStyle: function(score: number) {
      var colNo = Math.floor(score);
      const header = "border: solid 2px";
      if (colNo == 1) return header + "#4dc1f0";
      if (colNo == 2) return header + "#4dc1f0";
      if (colNo == 3) return header + "#ef7a03";
      if (colNo == 4) return header + "#ef7a03";
      if (colNo >= 5) return header + "#db082d";
      return "";
    }
  }
})
export default class VideoCard extends Mixins(GrobalValiables) {
  @Prop() private video!: Video;
  @Prop() private type!: String;
  @Prop() private showIcon!: Boolean;
}
</script>
