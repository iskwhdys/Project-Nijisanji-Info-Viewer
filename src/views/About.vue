<template>
  <v-container style="max-width:1185px">
    <div>
      <h2>このサイトについて</h2>

      <div class="my-4">
        <h3>どんなサイト？</h3>
        <hr />
        <div class="my-2">
          このサイトはにじさんじライバーの
          <ul>
            <li>配信中のライブ</li>
            <li>アーカイブ</li>
            <li>投稿動画</li>
            <li>プレミア公開予定動画</li>
            <li>配信予定のライブ</li>
          </ul>
          をまとめているサイトです。
        </div>
      </div>

      <div class="my-4">
        <h3>なにが良いの？</h3>
        <hr />
        <div class="my-2">
          <ul>
            <li>ひと目で分かる配信中ライブ</li>
            <li>ライバーごとのアーカイブに即アクセス</li>
            <li>あらゆる端末で見やすいレイアウト</li>
            <li>人気配信もコア配信も見つけやすい</li>
            <li>にじさんじオンリー</li>
          </ul>
        </div>
      </div>

      <div class="my-4">
        <h3>誰がやってるの？</h3>
        <hr />
        <div class="my-2">
          このサイトはにじさんじファンが運営している非公式のサイトです。<br />
          要望、不具合、その他の問い合わせは
          <a href="https://twitter.com/2j3j_live_com">@2j3j_live_com</a>
          までお願いします。<br />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class About extends Vue {}
</script>
