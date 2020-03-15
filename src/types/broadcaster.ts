import { Channel } from './channel';

export interface Broadcaster {
  id: string;
  name: string;
  kana: string;
  group: string;
  twitter: string;
  youtube: string;
  youtube2: string;
  startDate: Date;
  endDate: Date;
  official: string;
  icon: string;

  channel: Channel;
  channel2: Channel;


}