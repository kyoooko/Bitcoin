// コンポーネント
// Vue.component('hello-component',{
//   template: '<p>Hello</p>'
// })


var app = new Vue({
  el: '#app',
  data:{
    bpi:null
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

    // 通信エラーのキャッチ
    .catch(function(error){
      console.log(error)
    })
  }
})