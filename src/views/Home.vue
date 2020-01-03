<template>
  <div id="field">
    DB<br />
    <button @click="onClickSortChannelSubscriberCount">登録者数順にソート</button><br />
    <br />
    <br />
    <div class="items">
      <div class="item" v-for="channel in channels" :key="channel.id">
        <img :src="channel.userIcon" />

        <label v-if="channel.info.snippet">
          {{ channel.info.snippet.title }}
        </label>
        <label v-else>
          {{ channel.id }}
        </label>
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

interface Channel {
  id: string;
  info: any;
  userIcon: string;
}

@Component
export default class Home extends Vue {
  dbUrl: string = "http://localhost:3000";

  channels: Channel[] = [];

  async created() {
    console.debug("");
    console.debug("created-start");

    this.channels = (await Axios.get(this.dbUrl + "/channels", {})).data;

    console.debug("created-end");
  }

  async onClickSortChannelSubscriberCount() {
    console.debug("");
    console.debug("onClickSortChannelSubscriberCount-start");
    this.channels.sort(
      (a, b) => parseInt(b.info.statistics.subscriberCount) - parseInt(a.info.statistics.subscriberCount)
    );
    console.debug("onClickSortChannelSubscriberCount-end");
  }
}
</script>

<style lang="scss">

#field {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#item{
  
}

</style>
