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

//ユーザー名の設定
const uname = prompt("ログイン: ユーザー名を入れてね");
//ユーザー名と部屋名を表示
const n = Math.ceil(Math.random()*3);
         if (n == 1) room("「study01」");      
    else if (n == 2) room("「study02」");       
    else if (n == 3) room("「study03」"); 

function room(a) {
   $("#yourroom").append('<div class="roomName">こんにちは、<span>'+uname+'</span>さん！あなたの部屋は<span>'+a+'</span>です。</div>');
}


//firebaseに送信
$("#send").on("click", function(){
// const uname = $("#uname").val();
const text = $("#text").val();
const aimjikan = $("#aimjikan").val();
const now = new Date();
const h = now.getHours(); //時
const m = now.getMinutes(); //分
//日時表示文字列の作成
const date2 =  h + ":" + m;

//何も入力されてない場合
　　if(!text.trim()) return alert('何か入力してね');

const msg = {//右側が上で定義した変数
    uname:uname, 
    text:text,
    date: date2,
    aimjikan:aimjikan
}
ref.push(msg); //Firebase送信
});

//firebaseに受信
ref.on("child_added", function(data){
const v = data.val(); //変数.val();で取得する必要がある
const k = data.key;
    
//テキストと時刻を表示させる
const h = '<p class="mytext">'+v.uname+' : '+v.text+'<br>　<span>目標集中時間は'+v.aimjikan+'分　　'+v.date+'</span></p>';
　　　　　
//outputにhを表示させる
$("#output").append(h);

//自動スクロール
const messagesArea = document.getElementById('output');
messagesArea.scrollTop = messagesArea.scrollHeight;

});


//TimerのJS
let start = document.getElementById('start');
let reset = document.getElementById('reset');

let h = document.getElementById("hour");
let m = document.getElementById("minute");
let s = document.getElementById("sec");

let bell = new Audio("bell1.mp3");

let startTimer = null;

//スタートボタンを押したら、1秒毎に表示させる
start.addEventListener('click', function(){
   
    function startInterval(){
        startTimer = setInterval(function() {
            timer();
        }, 1000);
    }
    startInterval();

})

//リセットボタンを押したら、セットインターバルを解除
reset.addEventListener('click', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    
    stopInterval()
})

function timer(){
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
        //1回bellが鳴ったら、setInterval解除
        $.when(bell.play()).done(stopInterval());  

    } else if(s.value != 0){
        s.value--;
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}


function stopInterval() {
    clearInterval(startTimer);
}

