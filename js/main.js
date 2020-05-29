// コンポーネント
// Vue.component('hello-component',{
//   template: '<p>Hello</p>'
// })


var app = new Vue({
  el: '#app',
  data:{
    bpi:null,
    hasError:false,
    loading:true
  },

  mounted:function(){
    // API=（coindesk）をaxios使ってデータを取得
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')

    // データを使うには下記記載。responceにAPIからの戻り値が入ってる
    .then(function(response){
      // デバックのためコンソールに表示
      // console.log(response.data.bpi)
      // console.log(response.data.bpi.USD.rate_float)
      // response.data.bpiを上記のdata:bpi:に代入
      this.bpi = response.data.bpi
    }.bind(this))

    // 通信エラーのキャッチ(エラーをキャッチしたら下記実行）
    .catch(function(error){
      console.log(error)
      this.has_Error =true
    }.bind(this))

    // 通信に関する全ての処理が終わった時に呼び出される
    .finally(function(){
      this.loading=false
    }.bind(this))
  },

  filters:{
    currencyDecimal(value){
      return value.toFixed(2)
    }
  }
})