<template>
  <v-container style="max-width:1185px">
    <div v-for="channel in channels" :key="channel.id">
      <ChannelCardList :channel="channel"></ChannelCardList>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import ChannelCardList from "@/components/ChannelCardList.vue";
import Channel from "@/types/channel.ts";
import GrobalValiables from "@/mixins/grobalValiables";
import Axios from "axios";

@Component({
  components: {
    ChannelCardList
  }
})
export default class Broadcasters extends Mixins(GrobalValiables) {
  channels: Channel[] = [];

  async created() {
    const url = this.apiUrl + "channel";
    const data: Channel[] = (await Axios.get(url, {})).data;
    data.forEach(d => {
      this.channels.push(d);
    });
    this.channels.sort((c1, c2) => c2.subscriberCount - c1.subscriberCount);
  }
}
</script>
