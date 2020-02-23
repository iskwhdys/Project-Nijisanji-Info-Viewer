<template>
  <v-container style="max-width:1185px">
    <v-progress-circular v-if="loading" :size="50" indeterminate></v-progress-circular>
    <v-row dense>
      <v-col xs="12" sm="6" v-for="channel in channels" :key="channel.id">
        <ChannelCardList :channel="channel" :broadcaster="broadcaster"></ChannelCardList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import ChannelCardList from "@/components/ChannelCardList.vue";
import Channel from "@/types/channel.ts";
import Broadcaster from "@/types/broadcaster.ts";
import GrobalValiables from "@/mixins/grobalValiables";
import Axios from "axios";

@Component({
  components: {
    ChannelCardList
  }
})
export default class Broadcasters extends Mixins(GrobalValiables) {
  channels: Channel[] = [];
  broadcasters: Broadcaster[] = [];
  loading: Boolean = true;

  async created() {
    const chnls: Channel[] = (await Axios.get(this.apiUrl + "/channel", {})).data;
    chnls.sort((c1, c2) => c2.subscriberCount - c1.subscriberCount);
    chnls.forEach(d => {
      this.channels.push(d);
    });

    const bros: Broadcaster[] = (await Axios.get(this.apiUrl + "/broadcaster", {})).data;
    bros.forEach(d => {
      this.broadcasters.push(d);
    });

    this.channels.forEach(c => {
      const bro  = this.broadcasters.find(b => b.youtube == c.id || b.youtube2 == c.id);
      if(bro != undefined){
        c.title = bro.name;
      }
    });


    this.loading = false;
  }
}
</script>
