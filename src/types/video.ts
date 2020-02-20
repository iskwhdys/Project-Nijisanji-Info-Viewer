
import Channel from "@/types/channel.ts";

export interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  duration: number;
  uploadDate: Date;
  liveStart: Date;
  liveSchedule: Date;
  liveViews: number;
  type: string;
  channelId: string;
  channelTitle: string;
  rank: rank;
}

export enum rank {
  none,
  low,
  middle,
  high,
}

export class VideoCommon {

  public static setVideoRank (fealdType: string, video: Video) {
    var score;
    if (fealdType == 'live') {
      score = video.liveViews / 1000;
    } else {
      score = video.views / 20000;
    }
    var idx = Math.floor(score);
    video.rank = rank.none;
    if (idx == 1) video.rank = rank.low;
    if (idx == 2) video.rank = rank.low;
    if (idx == 3) video.rank = rank.middle;
    if (idx == 4) video.rank = rank.middle;
    if (idx >= 5) video.rank = rank.high;
  }


  public static getViewsColor (type: string, count: number): string {
    var score;
    if (type == 'live') {
      score = count / 1000;
    } else {
      score = count / 20000;
    }
    var colNo = Math.floor(score);
    const header = "border: solid 2px";
    if (colNo == 1) return header + "#4dc1f0";
    if (colNo == 2) return header + "#4dc1f0";
    if (colNo == 3) return header + "#ef7a03";
    if (colNo == 4) return header + "#ef7a03";
    if (colNo >= 5) return header + "#db082d";
    return "";
  }

}

