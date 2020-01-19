<template>
  <v-app id="inspire">
    <!--  <v-app-bar app clipped-left color="#2A4871" dense hide-on-scroll>-->
    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4"></v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">にじさんじ配信まとめ</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

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
        <v-list-item link @click.stop="clickChangeTheme()">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-theme-light-dark </v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            ナイトモード
          </v-list-item-title>
          <v-switch v-model="$vuetify.theme.dark" primary @click.stop="clickChangeTheme()"> </v-switch>
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
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "ホーム", to: "/" },
      { icon: "mdi-timetable", text: "配信予定", to: "/schedules" },
      { icon: "mdi-account-group", text: "ライバー", to: "/broadcasters" }
    ]
  }),
  methods: {
    clickChangeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("DarkTheme", this.$vuetify.theme.dark ? "True" : "False");
    }
  },
  created() {
    if (localStorage.getItem("DarkTheme") == null) {
      localStorage.setItem("DarkTheme", "True");
    }
    this.$vuetify.theme.dark = localStorage.getItem("DarkTheme") == "True";
  }
};
</script>
