<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">設定</v-subheader>
        <v-list-item link @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-theme-light-dark </v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            ナイトモード
          </v-list-item-title>
            <v-switch v-model="$vuetify.theme.dark" primary @click="$vuetify.theme.dark = !$vuetify.theme.dark"> </v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--  <v-app-bar app clipped-left color="#2A4871" dense hide-on-scroll>-->
    <v-app-bar app clipped-left dense hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4"></v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">にじさんじライブまとめ</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "ホーム", to: "/" },
      // { icon: "mdi-access-point", text: "ライブ中" },
      // { icon: "mdi-youtube-tv", text: "新着動画" },
      // { icon: "mdi-library-video", text: "アーカイブ" },
      { icon: "mdi-timetable", text: "ライブ予定" },
      { icon: "mdi-account-group", text: "ライバー", to: "/broadcasters" }
    ],
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
};
</script>
