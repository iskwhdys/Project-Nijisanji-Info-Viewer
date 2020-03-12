export class AppConfig {
  private static INSTANCE: AppConfig;
  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new AppConfig();
    }
    return this.INSTANCE;
  }

  public get apiUrl(): string {
    // 本番用
    return "http://nijisanji-live.com:8090/api";
    // 開発用-ローカル
    // return "http://192.168.11.6:8090/api"
  }
}

export default AppConfig.instance;