
import Channel from "@/types/channel.ts";

export default interface Video {
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
  channelId: string;
  channelTitle: string;
}
