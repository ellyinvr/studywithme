// Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCPnGpzMz-aIVT_g3fhrykYjzAqceK5uTk",
            authDomain: "studywithme-9fa22.firebaseapp.com",
            projectId: "studywithme-9fa22",
            storageBucket: "studywithme-9fa22.appspot.com",
            messagingSenderId: "216847830911",
            appId: "1:216847830911:web:4882a24b0330f0afdc944a"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const ref = firebase.database().ref('mokuhyo');
        const ref1 = firebase.database().ref('tassei');

//Benkyo部屋で設定した時間を表示させる
ref.on("child_added", function(data){
const v = data.val(); //変数.val();で取得する必要がある
const k = data.key;

const t = '<span id="mytext">'+v.aimjikan+'分</span>';
$("#aim").html(""); //htmlの中身を空文字にする
$("#aim").append(t);

});


//送信
$("#send").on("click", function(){
const time = $("#time").val();
const text = $("#text").val();
const now = new Date();
const month = now.getMonth() + 1;  //月+１を足す
const date = now.getDate();        //日

//日時表示文字列の作成
const date2 =  month + "月" + date　+ "日" ;
　　　　
//何も入力されてない場合
　　if(!text.trim()) return alert('何か入力してね');

const msg = {//右側が上で定義した変数
    time:time, 
    text:text,
    date:date2
}
ref1.push(msg); //Firebase送信
});


$("#send").on('click', function() {
    const time1 = $("#time").val();
    const time2 = parseInt($("#mytext").text());
    if(time1 >= time2) {
  alert('目標達成ですね😊可愛いネコちゃんの動画をどうぞ🐱');
  $(".curaka img").show();
	setTimeout(function(){
  $(".curaka img").hide();
  },6000);}
});


//受信
ref1.on("child_added", function(data){
const v = data.val(); //変数.val();で取得する必要がある
const k = data.key;
    
//テキストと時刻を表示させる
const tassei = '<p class="mytext">'+v.text+'</p>';
const jikan = 　'<p class="mytext">'+v.time+'分</p>';
const hizuke = '<p class="mytext">'+v.date+'</p>';
　　　　
//outputにhを表示させる
$("#output1").prepend(tassei);
$("#output2").prepend(jikan);
$("#output3").prepend(hizuke);

// const deletebtn = '<button id="delete_btn">delete</button>';
// $("#delete").append(deletebtn);


const now = new Date();
// const year = now.getFullYear();    //年
const month = now.getMonth() + 1;  //月+１を足す
const date = now.getDate();        //日
//日時表示文字列の作成
const nowdate_1 =  month + "月" + (date -1) + "日";
const nowdate_2 =  month + "月" + (date -2) + "日";
const nowdate_3 =  month + "月" + (date -3) + "日";
const nowdate_4 =  month + "月" + (date -4) + "日";
const nowdate_5 =  month + "月" + (date -5) + "日";
const nowdate_6 =  month + "月" + (date -6) + "日";

//v.timeを数値として認識させる
const showtime = parseInt(v.time);
//チャート用データ
var dataPlot = [
  { label: nowdate_6,  y: 60 }, 
  { label: nowdate_5,  y: 120 }, 
  { label: nowdate_4,  y: 100 }, 
  { label: nowdate_3,  y: 180 }, 
  { label: nowdate_2,  y: 140 },
  { label: nowdate_1,  y: 120 },
  { label: v.date,  y: showtime }
];

//チャートの生成
CanvasJS.addColorSet("adobe",["#7fffd4","#ff7f50","#ffff00","#7fffd4","#ff7f50","#ffff00"]);
var chart = new CanvasJS.Chart("chartContainer", {
  title: {
    text: '１週間のBenkyo時間の推移'
  },
  axisX: {
    title: "日付"
  },
  axisY: {
    title: "Benkyo時間(分)"
  },
  colorSet:"adobe",
  data: [{
    type: 'column',
    theme:'theme1',
    dataPoints: dataPlot
  }]
});
chart.render();


});


