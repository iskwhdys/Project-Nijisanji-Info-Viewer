
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GrobalValiables extends Vue {
    // 本番用
    apiUrl:string = "http://nijisanji-live.com:8090/api"

    // 開発用-ローカル
    //apiUrl: string = "http://192.168.11.6:8090/api"

    // 開発用-ローカル(Docker)
    // apiUrl: string = "http://192.168.11.6:18090/api"
}