
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GrobalValiables extends Vue {
    // 本番用
    apiUrl:string = "http://ik1-330-25303.vs.sakura.ne.jp:8090/api/"
    // 開発用
    // apiUrl: string = "http://localhost:8090/api/"
}