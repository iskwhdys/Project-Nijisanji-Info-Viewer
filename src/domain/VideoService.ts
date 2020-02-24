import Axios from 'axios';
import AppConfig from "@/domain/AppConfig";
import { Video, Rank } from "@/types/video.ts";
import { Channel } from "@/types/channel.ts";

export class VideoService {
  private static INSTANCE: VideoService;
  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new VideoService();
    }
    return this.INSTANCE;
  }

  readonly BASE_URL = AppConfig.apiUrl;

  private async get(url: string): Promise<Video[]> {
    const data: Video[] = (await Axios.get(url, {})).data;
    data.forEach(d => {
      d.fieldType = this.typeToFieldId(d.type);
      this.setVideoRank(d.fieldType, d);
    });
    return data;
  }

  async getChannelVideo(channelId: string): Promise<Video[]> {
    const data: Video[] = await this.get(`${this.BASE_URL}/video/channel/${channelId}`);

    let result: Video[] = [];

    // 予定を抽出
    data.forEach(d => {
      if (d.type == "PremierReserve" || d.type == "LiveReserve") result.push(d);
    });
    // ライブを抽出
    data.forEach(d => {
      if (d.type == "PremierLive" || d.type == "LiveLive") result.push(d);
    });
    // 上記以外を抽出
    data.forEach(d => {
      if (d.type != "PremierReserve" && d.type != "LiveReserve" && d.type != "PremierLive" && d.type != "LiveLive") {
        result.push(d);
      }
    });

    return result;
  }

  async getFieldVideo(field: string, mode: string): Promise<Video[]> {
    return await this.get(`${this.BASE_URL}/video/${field}?mode=${mode}`);
  }

  async getFieldVideoFrom(field: string, mode: string, from: string): Promise<Video[]> {
    return await this.get(`${this.BASE_URL}/video/${field}?mode=${mode}&from=${from}`);
  }

  private setVideoRank(fealdType: string, video: Video) {
    var score;
    if (fealdType == 'live') {
      score = video.liveViews / 1000;
    } else {
      score = video.views / 20000;
    }
    var idx = Math.floor(score);
    video.rank = Rank.none;
    if (idx == 1) video.rank = Rank.low;
    if (idx == 2) video.rank = Rank.low;
    if (idx == 3) video.rank = Rank.middle;
    if (idx == 4) video.rank = Rank.middle;
    if (idx >= 5) video.rank = Rank.high;
  }

  private typeToFieldId(type: string): string {
    switch (type) {
      case "Upload":
        return "upload";
      case "PremierReserve":
        return "premier";
      case "PremierLive":
        return "live";
      case "PremierUpload":
        return "upload";
      case "LiveReserve":
        return "schedule";
      case "LiveLive":
        return "live";
      case "LiveArchive":
        return "archive";
      default:
        return "";
    }
  }
}

export default VideoService.instance;
