<template>
  <div id="field">
    DB<br />
    <button @click="onClickGetChannelList">全情報をDBから取得</button><br />
    <button @click="onClickSortChannelSubscriberCount">登録者数順にソート</button><br />
    <button @click="onClickPatchChannelInfo">現在の全チャンネル情報をDBに反映</button><br />
    <br />
    <br />
    API<br />
    <button @click="onClickUpdateChannelInfo">全てのチャンネル情報をAPI経由で取得してDBに反映</button><br />
    <button @click="onClickGetChannelUserIcon">全てのチャンネルのユーザーアイコンを取得してDBに反映</button><br />
    <button @click="onClickGetChannelLiveData">全てのチャンネルのライブ状況を取得してDBに反映</button><br />

    <br />

    <div v-for="channel in channels" :key="channel.id">
      <img :src="channel.userIcon" />

      <label v-if="channel.info.snippet">
        {{ channel.info.snippet.title }}
      </label>
      <label v-else>
        {{ channel.id }}
      </label>
      <button @click="onClickGetChannelData(channel)">
        API:情報取得
      </button>
      <button @click="onClickPatchChannelData(channel)">
        DB:情報反映
      </button>

      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";
import ApiKey from "../assets/ignore.ApiKey.json";

interface Channel {
  id: string;
  info: any;
  userIcon: string;
  live: string;
}

@Component
export default class Data extends Vue {
  apiYoutubeUrl: string = "https://www.googleapis.com/youtube/v3";
  apiFunctionUrl: string = "http://localhost:8090/api/function";

  dbUrl: string = "http://localhost:3000";

  channels: Channel[] = [];

  async created() {
    console.debug("");
    console.debug("created-start");
    this.channels = await this.getChannelInfoDb();
  }

  async onClickGetChannelList() {
    console.debug("onClickGetChannelList-start");
    this.channels = await this.getChannelInfoDb();
  }

  async onClickGetChannelData(channel: Channel) {
    console.debug("onClickGetChannelData-start");
    channel.info = await this.getChannelInfoApi(channel);
  }

  async onClickPatchChannelData(channel: Channel) {
    console.debug("onClickPatchChannelData-start");
    await this.updateChannelInfoDb(channel);
  }

  async onClickGetChannelUserIcon() {
    console.debug("onClickGetChannelUserIcon-start");

    for (const channel of this.channels) {
      const response = await Axios.get(this.apiFunctionUrl + "/base64file", {
        params: { url: channel.info.snippet.thumbnails.default.url }
      });
      channel.userIcon = "data:image/jpeg;base64," + response.data;
      await Axios.patch(this.dbUrl + "/channels/" + channel.id, { userIcon: channel.userIcon });
      console.debug("onClickGetChannelUserIcon-processing:" + channel.id);
    }
  }

  async onClickGetChannelLiveData() {
    console.debug("onClickGetChannelUserIcon-start");

    //for (const channel of this.channels) {
    for (const channel of this.channels.slice(0, 1)) {
      console.debug(channel.info.snippet.title);

      const response = await Axios.get(this.apiFunctionUrl + "/xml", {
        params: { url: "https://www.youtube.com/feeds/videos.xml?channel_id=" + channel.id },
        responseType: 'document'
      });

      const xml = response.data;

      console.debug(xml);
      console.log(xml.getElementsByTagName("entry"));
      
      console.debug("onClickGetChannelUserIcon-processing:" + channel.id);
    }

    console.debug("onClickGetChannelUserIcon-end");
  }

  async onClickUpdateChannelInfo() {
    console.debug("onClickUpdateChannelInfo-start");

    this.channels = await this.getChannelInfoDb();

    for (const channel of this.channels) {
      channel.info = await this.getChannelInfoApi(channel);
      await this.updateChannelInfoDb(channel);
    }
  }

  async onClickSortChannelSubscriberCount() {
    console.debug("onClickSortChannelSubscriberCount-start");
    this.channels.sort(
      (a, b) => parseInt(b.info.statistics.subscriberCount) - parseInt(a.info.statistics.subscriberCount)
    );
  }

  async onClickPatchChannelInfo() {
    console.debug("onClickPatchChannelInfo-start");
    for (const channel of this.channels) {
      await this.updateChannelInfoDb(channel);
    }
  }

  async getChannelInfoDb() {
    console.debug("getChannelInfoDb-start");
    const channels = (await Axios.get(this.dbUrl + "/channels", {})).data;
    return channels;
  }

  async getChannelInfoApi(channel: Channel) {
    console.debug("getChannelInfoApi-start:" + channel.id);
    const params = {
      part: "id, snippet, brandingSettings, contentDetails, invideoPromotion, statistics, topicDetails",
      id: channel.id,
      key: ApiKey.key
    };
    const data = (await Axios.get(this.apiYoutubeUrl + "/channels", { params: params })).data.items[0];
    return data;
  }

  async updateChannelInfoDb(channel: Channel) {
    console.debug("updateChannelInfoDb-start:" + channel.id);
    await Axios.patch(this.dbUrl + "/channels/" + channel.id, { info: channel.info });
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
</style>
