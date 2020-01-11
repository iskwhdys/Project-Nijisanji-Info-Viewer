<template>
  <div>
    <div>
      <div v-for="batch of batchList" :key="batch.name">
        <button v-on:click="onClickRunBatch(batch.name)">{{ batch.name }}</button> <br />
        <br>
      </div>
    </div>
    <div>
      <span>{{ responseMessage }}</span>
    </div>
    <div>
      <span>{{ startTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";
import moment from "moment";

@Component
export default class Manager extends Vue {
  batchUrl: string = "http://192.168.11.6:8090/batch/?name=";
  batchList = [{ name: "update10min" }, { name: "updateRealTime" }, { name: "updateLiveVideo" }, { name: "updateVideoType" }, { name: "update1day" }];
  responseMessage: string = "";

  startTime:String = "";

  created(){      
    setInterval(()=>{
      this.startTime = moment(new Date()).format("HH:mm:ss");
      this.onClickRunBatch(this.batchList[0].name);
      console.log(this.startTime);
    }, 1000 * 60 * 10);
  }

  async onClickRunBatch(name: string) {
    console.debug("");
    console.debug("onClickRunBatch-start");
    
    this.responseMessage = "processing"
    this.responseMessage = await Axios.get(this.batchUrl + name, {});

    console.debug("onClickRunBatch-end");
  }
}
</script>
