<template>
  <div>
    <v-container style="max-width:1185px">
      <v-row dense>
        <v-col>
          <v-btn-toggle
            v-if="!this.$vuetify.breakpoint.xs"
            v-model="gridMode"
            rounded
            mandatory
            dense
            @change="changeGridMode"
          >
            <v-btn value="12"><v-icon>mdi-view-agenda-outline</v-icon> </v-btn>
            <v-btn value="6"> <v-icon>mdi-grid-large</v-icon> </v-btn>
            <v-btn value="4"> <v-icon>mdi-grid</v-icon> </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row dense v-if="loading">
        <v-col>
          <v-progress-circular :size="50" indeterminate></v-progress-circular>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col xs="12" :sm="gridMode" v-for="channel in channels" :key="channel.id">
          <ChannelCard :channel="channel"></ChannelCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelCard from "@/components/ChannelCard.vue";
import { Channel } from "@/types/channel.ts";
import ChannelService from "@/domain/ChannelService";

@Component({
  components: {
    ChannelCard,
  },
})
export default class ChannelList extends Vue {
  channels: Channel[] = [];
  loading: Boolean = true;
  gridMode: string = "";

  async created() {
    if (localStorage.getItem("ChannelGrid") == null) {
      localStorage.setItem("ChannelGrid", "6");
    }
    this.gridMode = localStorage.getItem("ChannelGrid")!;

    const data: Channel[] = await ChannelService.getAllChannel();
    data.forEach(d => {
      this.channels.push(d);
    });

    this.loading = false;
  }

  changeGridMode() {
    localStorage.setItem("ChannelGrid", this.gridMode);
  }
}
</script>
