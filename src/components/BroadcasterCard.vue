<template>
  <div>
    <v-card class="">
      <v-list-item @click.stop="showChannelCardList(broadcaster.channel)">
        <v-list-item-avatar width="64px" height="64px" color="white">
          <v-img :src="broadcaster.id | icomlUrl"> </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> {{ broadcaster.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-btn @click.stop="" icon :href="broadcaster.twitter | twitterUrl">
              <v-icon color="blue">mdi-twitter</v-icon>
            </v-btn>

            <v-btn @click.stop="showChannelCardList(broadcaster.channel)" icon>
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>

            <span v-if="broadcaster.channel"> {{ broadcaster.channel.subscriberCount | toSubscribeText }} </span>

            <v-btn @click.stop="showChannelCardList(broadcaster.channel2)" icon v-if="broadcaster.youtube2">
              <v-icon color="red">mdi-youtube</v-icon>
            </v-btn>

            <span v-if="broadcaster.channel2"> {{ broadcaster.channel2.subscriberCount | toSubscribeText }} </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-icon> mdi-chevron-down-circle-outline </v-icon>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Channel } from "@/types/channel.ts";
import { Broadcaster } from "@/types/broadcaster.ts";
import AppConfig from "@/domain/AppConfig";

@Component({
  components: {},
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
  },
})
export default class BroadcasterCard extends Vue {
  @Prop() private broadcaster!: Broadcaster;

  showChannelCardList(channel: Channel) {
    this.$emit("child-event", channel);
  }
}
</script>
