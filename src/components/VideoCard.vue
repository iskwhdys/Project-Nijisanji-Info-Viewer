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
  left: 140px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.Card-Channel-Icon-XS {
  position: absolute;
  left: 108px;
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
  border-radius: 10px;
  font-size: 12px;
}
.Card:hover .Card-Thumbnail-Time {
  transition: all 0.3s;
  opacity: 0;
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
  <div style="position:relative">
    <v-card :width="$vuetify.breakpoint.xs ? 144 : 176" :href="'https://www.youtube.com/watch?v=' + video.id">
      <div class="Card">
        <v-img
          :width="$vuetify.breakpoint.xs ? 144 : 176"
          :height="$vuetify.breakpoint.xs ? 80 : 98"
          :src="this.video.id | videoThumbnailMiniUrl"
        >
          <span v-if="video.fieldType == 'live'" class="Card-Thumbnail-Time Card-Thumbnail-Total">
            {{ video.liveStart | toLiveTime }}
          </span>
          <span
            v-else-if="video.fieldType == 'upload' || video.fieldType == 'archive' || video.fieldType == 'premier'"
            class="Card-Thumbnail-Time Card-Thumbnail-Duration"
          >
            {{ video.duration | toTime }}
          </span>
        </v-img>

        <div style="position:relative">
          <div class="Card-Buttom-Frame" :style="getRankColor(video.rank)"></div>
          <v-card-title style="padding:8px; height:60px">
            <div class="title-text">{{ video.title }}</div>
          </v-card-title>
          <v-card-text style="padding:8px;">
            <div>
              <div class="info-text">{{ video | generateStartTime }}</div>
              <span class="info-text">
                <span>{{ video | genarateViews }}</span>
                <span v-if="video.likes != 0">
                  👍{{ video.likes }}
                  <span v-if="!($vuetify.breakpoint.xs && showIcon)"> ({{ video | getRating }}) </span>
                </span>
              </span>
            </div>
          </v-card-text>
        </div>
      </div>
    </v-card>
    <div v-if="showIcon" @click.stop="showChannelCard()">
      <v-img
        :class="$vuetify.breakpoint.xs ? 'Card-Channel-Icon-XS' : 'Card-Channel-Icon'"
        :src="this.video.channelId | channelThumbnailUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import moment from "moment";
import { Video, Rank, VideoCommon } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";
import AppConfig from "@/domain/AppConfig";

@Component({
  components: {
    VideoCard,
  },
  filters: {
    generateStartTime: function(video: Video) {
      const type = video.fieldType;
      const startDate =
        type == "live" || type == "archive"
          ? video.liveStart
          : type == "upload"
          ? video.uploadDate
          : video.liveSchedule;

      const start = moment(startDate).format("YYYY/MM/DD");
      const yesterday = moment(new Date().setDate(new Date().getDate() - 1)).format("YYYY/MM/DD");
      const today = moment(new Date()).format("YYYY/MM/DD");
      const tomorrow = moment(new Date().setDate(new Date().getDate() + 1)).format("YYYY/MM/DD");

      const prefix = start == yesterday ? "昨日" : start == today ? "今日" : start == tomorrow ? "明日" : "";
      const suffix =
        type == "live" || type == "archive"
          ? "～"
          : type == "premier"
          ? " 公開予定"
          : type == "schedule"
          ? " 配信予定"
          : "";

      if (prefix != "") {
        return `${prefix} ${moment(startDate).format("HH:mm")}${suffix}`;
      } else {
        if (new Date(startDate).getFullYear() == new Date().getFullYear()) {
          return `${moment(startDate).format("M/D HH:mm")}${suffix}`;
        } else {
          return `${moment(startDate).format("YYYY/M/D HH:mm")}${suffix}`;
        }
      }
    },

    genarateViews: function(video: Video) {
      if (video.fieldType == "live") {
        const count = video.liveViews == null ? "取得中" : video.liveViews;
        return `👤${count}`;
      }
      if (video.fieldType == "archive" || video.fieldType == "upload") return `▶${video.views}`;
      return "";
    },

    toLiveTime: function(startDate: Date) {
      const totalSec = moment(new Date()).diff(moment(startDate)) / 1000;
      const hour = Math.floor(Math.floor(totalSec / 60) / 60);
      const min = Math.floor((totalSec - hour * 60 * 60) / 60);
      const sec = totalSec - hour * 60 * 60 - min * 60;
      const sHour = hour > 0 ? hour + "時間" : "";
      const sMin = min > 0 ? min + "分" : "";

      if (sHour + sMin == "") {
        return "開始直後";
      } else {
        return sHour + sMin + "経過";
      }
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

    videoThumbnailMiniUrl: function(id: string) {
      return `${AppConfig.apiUrl}/image/video/${id}/thumbnail_mini`;
    },
    channelThumbnailUrl: function(id: string) {
      return `${AppConfig.apiUrl}/image/channel/${id}/thumbnail`;
    },
  },
})
export default class VideoCard extends Vue {
  @Prop() private video!: Video;
  @Prop() private showIcon!: Boolean;

  async showChannelCard() {
    this.$emit("child-event");
  }

  getRankColor(rank: Rank) {
    const color = VideoCommon.getRankColor(rank);
    if (color == "") return "";
    return "border: solid 2px" + color;
  }
}
</script>
