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
  rank: Rank;
}

export enum Rank {
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
    video.rank = Rank.none;
    if (idx == 1) video.rank = Rank.low;
    if (idx == 2) video.rank = Rank.low;
    if (idx == 3) video.rank = Rank.middle;
    if (idx == 4) video.rank = Rank.middle;
    if (idx >= 5) video.rank = Rank.high;
  }

  public static getRankColor (rank: Rank): string {
    if (rank == Rank.low) return "#4dc1f0";
    if (rank == Rank.middle) return "#ef7a03";
    if (rank == Rank.high) return "#db082d";
    return "";
  }
}

