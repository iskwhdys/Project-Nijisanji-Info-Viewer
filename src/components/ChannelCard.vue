<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="changeOpen">
        <v-list-item-avatar width="64px" height="64px" color="grey">
          <v-img :src="channel.id | channelThumbnailUrl"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ channel.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn @click.stop="" icon :href="`https://www.youtube.com/channel/${channel.id}`">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>
            {{ channel.subscriberCount | toSubscribeText }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-icon>
          {{ !showVideos ? "mdi-chevron-down-circle-outline" : "mdi-chevron-up-circle-outline" }}
        </v-icon>
      </v-list-item>
    </v-card>

    <ChannelVideos v-if="showVideos" :channel="channel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { Channel } from "@/types/channel.ts";
import AppConfig from "@/domain/AppConfig";

import ChannelVideos from "@/components/ChannelVideos.vue";
@Component({
  components: {
    ChannelVideos,
  },
  filters: {
    toSubscribeText: function(count: number) {
      if (10000 > count) return count + "人";
      if (100000 > count) return (count / 10000).toFixed(2) + "万人";
      if (1000000 > count) return (count / 10000).toFixed(1) + "万人";
      return count + "人";
    },
    channelThumbnailUrl: function(id: string) {
      return `${AppConfig.apiUrl}/image/channel/${id}`;
    },
  },
})
export default class ChannelCard extends Vue {
  @Prop() private channel!: Channel;
  @Prop() private open!: boolean;

  private showVideos: boolean = false;
  created() {
    this.showVideos = this.open;
  }
  changeOpen() {
    this.showVideos = !this.showVideos;
  }
}
</script>
