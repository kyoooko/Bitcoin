// * API=coindesk
// * APIとの通信＝HTTPクライアントのaxiosというライブラリ（自分で実装もできるが工数削減できる）
// * axiosのCDN取得に利用したサイト＝jsDeliver
// （jsDeliver利用せずGHから取得もできるがバージョン明記がなかったのでjsDeliver利用した）

var app = new Vue({
  el: '#app',
  data:{
    bpi:null,
    // エラーかどうかを管理するプロパティ
    hasError:false,
    loading:true
  },

  // データをbpiから取得するタイミングはmountedとする
  mounted:function(){
    // API=（coindesk）をaxios使ってデータを取得
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')

    // ■データを使うには下記記載。responceにAPIからの戻り値が入ってる
    .then(function(response){
      // デバックのためコンソールに表示
      // console.log(response.data.bpi)
      // console.log(response.data.bpi.USD.rate_float)
      // response.data.bpiを上記のdata:bpi:に代入
      this.bpi = response.data.bpi
    //  bind(this)の指定の意味は、「thisを何にするかを指定するもの」。bind(this)が無い場合、this.bpi のthisは、Windowオブジェクトを意味する。指定した場合、this.bpi のthisはVueオブジェクト（=Vueインスタンス）を意味する（JSの範囲）
    }.bind(this))



    // ■通信エラーのキャッチ(エラーをキャッチしたら下記実行）
    .catch(function(error){
      console.log(error)
      this.has_Error =true
    }.bind(this))

    // ■finallyは通信に関する全ての処理が終わった時に呼び出される
    .finally(function(){
      this.loading=false
    }.bind(this))
  },

  // 小数点は４→２にする
  filters:{
    currencyDecimal(value){
      // 固定小数点表記を２に
      return value.toFixed(2)
    }
  }
})