import Axios from 'axios';
import AppCongig from "@/domain/AppConfig";
import { Channel } from "@/types/channel.ts";

export class ChannelService {
  private static INSTANCE: ChannelService;
  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new ChannelService();
    }
    return this.INSTANCE;
  }

  readonly BASE_URL = AppCongig.apiUrl;

  async getAllChannel(): Promise<Channel[]> {
    const url = this.BASE_URL + "/channel";
    const data: Channel[] = (await Axios.get(url, {})).data;

    data.sort((c1, c2) => c2.subscriberCount - c1.subscriberCount);
    return data;
  }

  async get(id: string): Promise<Channel> {
    const url = `${this.BASE_URL}/channel/${id}`;
    return (await Axios.get(url, {})).data;
  }




}

export default ChannelService.instance;
