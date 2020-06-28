<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left dense :collapse-on-scroll="isShowBottomMenu">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <h1 class="title">{{ env.VUE_APP_TITLE }}</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="$ga.event('AppBar', 'Home', 'Tweet');"
        :href="`https://twitter.com/share?url=https://nijisanji-live.com/&text=「にじさんじライブ新着」で、にじさんじライバーの配信中ライブ・アーカイブ・予約などをひと目で確認！`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <template v-if="!$vuetify.breakpoint.xs">共有</template>
        <v-icon color="blue">mdi-twitter</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="page in pages" :key="page.text" link :to="page.to">
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ page.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>設定</v-subheader>
        <v-list-item dense link @click.stop="clickChangeTheme()">
          <v-list-item-action>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-action>
          <v-list-item-title>ナイトモード</v-list-item-title>
          <v-switch dense v-model="$vuetify.theme.dark" @click.stop="clickChangeTheme()" />
        </v-list-item>

        <v-subheader class="mt-4">{{ env.VUE_APP_TITLE }}</v-subheader>
        <v-list-item link to="/about">
          <v-list-item-title>このサイトについて</v-list-item-title>
        </v-list-item>
        <v-list-item :href="env.VUE_APP_TWITTER_URL">
          <v-list-item-title>お問い合わせ(Twitter)</v-list-item-title>
        </v-list-item>

        <v-subheader class="mt-4">外部リンク</v-subheader>
        <v-list-item v-for="page in links" :key="page.text" :href="page.to">
          <v-list-item-title>{{ page.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation v-if="isShowBottomMenu" app grow>
      <v-btn v-for="page in pages" :key="page.text" :to="page.to" link>
        <span>{{ page.text }}</span>
        <v-icon>{{ page.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import WebStorage from "@/domain/WebStorage";

export default {
  data: () => ({
    env: process.env,
    drawer: null,
    pages: [
      { icon: "mdi-home", text: "ホーム", to: "/" },
      { icon: "mdi-timetable", text: "配信予定", to: "/schedules" },
      { icon: "mdi-account-group", text: "ライバー", to: "/broadcasters" },
      { icon: "mdi-youtube-subscription", text: "チャンネル", to: "/channels" }
    ],
    links: [
      {
        text: process.env.VUE_APP_OFFICIAL_WEB_SITE_NAME,
        to: process.env.VUE_APP_OFFICIAL_WEB_SITE_URL
      },
      {
        text: process.env.VUE_APP_UNOFFICIAL_WIKI_NAME,
        to: process.env.VUE_APP_UNOFFICIAL_WIKI_URL
      }
    ]
  }),
  methods: {
    clickChangeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      WebStorage.darkTheme = this.$vuetify.theme.dark;
    },

    clickTweet() {}
  },
  computed: {
    isShowBottomMenu() {
      return (
        this.$vuetify.breakpoint.xs ||
        this.$vuetify.breakpoint.sm ||
        this.$vuetify.breakpoint.md
      );
    }
  },

  created() {
    this.$vuetify.theme.dark = WebStorage.darkTheme;
  }
};
</script>
