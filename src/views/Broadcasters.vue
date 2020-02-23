<template>
  <v-container style="max-width:1185px">
    <v-progress-circular v-if="loading" :size="50" indeterminate></v-progress-circular>
    <v-row dense>
      <v-col xs="12" sm="6" v-for="channel in channels" :key="channel.id">
        <ChannelCardList :channel="channel"></ChannelCardList>
      </v-col>
    </v-row>
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
  loading: Boolean = true;

  async created() {
    const url = this.apiUrl + "/channel";
    const data: Channel[] = (await Axios.get(url, {})).data;

    data.sort((c1, c2) => c2.subscriberCount - c1.subscriberCount);
    data.forEach(d => {
      this.channels.push(d);
    });

    this.loading = false;
  }
}
</script>
