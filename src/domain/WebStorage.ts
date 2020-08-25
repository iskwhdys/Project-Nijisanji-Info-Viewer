export class WebStorage {
  private static INSTANCE: WebStorage;
  public static get instance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new WebStorage();
    }
    return this.INSTANCE;
  }

  public get filterArk(): boolean {
    return this.getBoolean("filterArk", false);
  }
  public set filterArk(value: boolean) {
    this.setBoolean("filterArk", value);
  }

  public get enabledAutoReload(): boolean {
    return this.getBoolean("enabledAutoReload", false);
  }
  public set enabledAutoReload(value: boolean) {
    this.setBoolean("enabledAutoReload", value);
  }

  public get darkTheme(): boolean {
    return this.getBoolean("darkTheme", true);
  }
  public set darkTheme(value: boolean) {
    this.setBoolean("darkTheme", value);
  }

  public get broadcasterViewCount(): string {
    return this.getString("broadcasterViewCount", "");
  }
  public set broadcasterViewCount(value: string) {
    this.setString("broadcasterViewCount", value);
  }

  public get broadcasterGridMode(): string {
    return this.getString("broadcasterGridMode", "6");
  }
  public set broadcasterGridMode(value: string) {
    this.setString("broadcasterGridMode", value);
  }

  public get broadcasterSortKind(): string {
    return this.getString("broadcasterSortKind", "登録者数");
  }
  public set broadcasterSortKind(value: string) {
    this.setString("broadcasterSortKind", value);
  }

  public get broadcasterSortMode(): string {
    return this.getString("broadcasterSortMode", "-1");
  }
  public set broadcasterSortMode(value: string) {
    this.setString("broadcasterSortMode", value);
  }

  public get channelGrid(): string {
    return this.getString("channelGrid", "6");
  }
  public set channelGrid(value: string) {
    this.setString("channelGrid", value);
  }





  private setBoolean(key: string, value: boolean) {
    localStorage.setItem(key, value + "");
  }
  private getBoolean(key: string, defaultValue: boolean): boolean {
    if (localStorage.getItem(key) == null) {
      this.setBoolean(key, defaultValue);
    }
    return localStorage.getItem(key) == "true";
  }

  private setNumber(key: string, value: number) {
    localStorage.setItem(key, value + "");
  }
  private getNumber(key: string, defaultValue: number): number {
    if (localStorage.getItem(key) == null) {
      this.setNumber(key, defaultValue);
    }
    return Number(localStorage.getItem(key));
  }

  private setString(key: string, value: string) {
    localStorage.setItem(key, value + "");
  }
  private getString(key: string, defaultValue: string): string {
    if (localStorage.getItem(key) == null) {
      this.setString(key, defaultValue);
    }
    return localStorage.getItem(key) + "";
  }


}

export default WebStorage.instance;
