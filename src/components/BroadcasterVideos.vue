<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="cardClick">
        <v-list-item-avatar width="64px" height="64px" color="white">
          <v-img :src="broadcaster.id | icomlUrl"> </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> {{ broadcaster.name }} </v-list-item-title>

          <v-list-item-subtitle>
            <v-btn @click.stop="" icon :href="broadcaster.twitter | twitterUrl">
              <v-icon color="blue">mdi-twitter</v-icon>
            </v-btn>
            <v-btn @click.stop="" icon :href="broadcaster.name | wikiUrl">
              <v-icon>mdi-wikipedia</v-icon>
            </v-btn>
            <v-btn @click.stop="" icon :href="broadcaster.youtube | youtubelUrl">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>
            <span v-if="broadcaster.channel"> {{ broadcaster.channel.subscriberCount | toSubscribeText }} </span>
          </v-list-item-subtitle>

          <v-list-item-subtitle>
            <v-btn @click.stop="" icon v-if="broadcaster.youtube2" :href="broadcaster.youtube2 | youtubelUrl">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>
            <span v-if="broadcaster.channel2"> {{ broadcaster.channel2.subscriberCount | toSubscribeText }} </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-icon>mdi-close </v-icon>
      </v-list-item>

      <ChannelVideos :channel="broadcaster.channel"></ChannelVideos>
      <ChannelVideos v-if="broadcaster.channel2" :channel="broadcaster.channel2"></ChannelVideos>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";

import AppConfig from "@/domain/AppConfig";
import VideoService from "@/domain/VideoService";
import { Channel } from "@/types/channel.ts";
import { Broadcaster } from "@/types/broadcaster.ts";

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
export default class BroadcasterVideos extends Vue {
  @Prop() private broadcaster!: Broadcaster;

  cardClick() {
    this.$emit("child-event");
  }
}
</script>
