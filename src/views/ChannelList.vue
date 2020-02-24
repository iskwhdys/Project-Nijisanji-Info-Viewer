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
import { Component, Vue } from "vue-property-decorator";
import ChannelCardList from "@/components/ChannelCardList.vue";
import { Channel } from "@/types/channel.ts";
import ChannelService from "@/domain/ChannelService";

@Component({
  components: {
    ChannelCardList
  }
})
export default class ChannelList extends Vue {
  channels: Channel[] = [];
  loading: Boolean = true;

  async created() {
    const data: Channel[] = await ChannelService.getAllChannel();
    data.forEach(d => {
      this.channels.push(d);
    });

    this.loading = false;
  }
}
</script>
