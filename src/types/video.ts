export interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  duration: number;
  uploadDate: Date;
  published: Date;
  liveStart: Date;
  liveSchedule: Date;
  liveViews: number;
  type: string;
  status: string;
  channel: string;
  // channelTitle: string;

  rank: Rank;
}

export enum Rank {
  none,
  low,
  middle,
  high,
}

export class VideoCommon {

  public static getRankColor(rank: Rank): string {
    if (rank == Rank.low) return "#4dc1f0";
    if (rank == Rank.middle) return "#ef7a03";
    if (rank == Rank.high) return "#db082d";
    return "";
  }
}

