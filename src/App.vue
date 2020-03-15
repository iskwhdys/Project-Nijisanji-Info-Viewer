<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <h1 class="title">にじさんじライブ新着</h1>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="page in pages" :key="page.text" link :to="page.to">
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ page.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">設定</v-subheader>
        <v-list-item link @click.stop="clickChangeTheme()">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-theme-light-dark </v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            ナイトモード
          </v-list-item-title>
          <v-switch v-model="$vuetify.theme.dark" primary @click.stop="clickChangeTheme()"> </v-switch>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">にじさんじライブ新着</v-subheader>
        <v-list-item link to="/about">
          <v-list-item-title class="grey--text text--darken-1">このサイトについて</v-list-item-title>
        </v-list-item>
        <v-list-item href="https://twitter.com/2j3j_live_com">
          <v-list-item-title class="grey--text text--darken-1">お問い合わせ(Twitter)</v-list-item-title>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">外部リンク</v-subheader>
        <v-list-item v-for="page in links" :key="page.text" :href="page.to">
          <v-list-item-title class="grey--text text--darken-1">
            {{ page.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    pages: [
      { icon: "mdi-home", text: "ホーム", to: "/" },
      { icon: "mdi-timetable", text: "配信予定", to: "/schedules" },
      { icon: "mdi-account-group", text: "ライバー", to: "/broadcasters" },
      { icon: "mdi-youtube-subscription", text: "チャンネル", to: "/channels" },
    ],
    links: [
      { text: "にじさんじ公式", to: "http://nijisanji.ichikara.co.jp/" },
      { text: "にじさんじ非公式wiki", to: "https://wikiwiki.jp/nijisanji/" },
    ],
  }),
  methods: {
    clickChangeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("DarkTheme", this.$vuetify.theme.dark ? "True" : "False");
    },
  },
  created() {
    if (localStorage.getItem("DarkTheme") == null) {
      localStorage.setItem("DarkTheme", "True");
    }
    this.$vuetify.theme.dark = localStorage.getItem("DarkTheme") == "True";
  },
};
</script>
