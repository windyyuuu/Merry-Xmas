var sound1
function preload(){
  sound1 = loadSound("We Wish You A Merry Christmas Super Simple Songs.mp3") //先把音樂檔載入到sound1程式碼中
}
var face_colors = "b23a48-c75146-ad2e24-81171b-540804-8c2f39".split("-").map(a=>"#"+a)
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_x=[]
var v_y=[]
var txts=[]
var face_move_var = false 
//語音辨識的初始設定
var lang = navigator.language //取得瀏覽器的語系
var myRec = new p5.SpeechRec(lang)

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#f5ebe0");

  //文字框的設定
  inputElement = createInput("𝐌𝐞𝐫𝐫𝐲 𝐗𝐦𝐚𝐬") //產生一個文字方塊
  inputElement.position(10,10)
  inputElement.size(140,20) //文字框的大小(長寬)
  //以下的style，可以搜尋html input css 找到資料
  inputElement.style("font-size","20px") //文字的大小
  inputElement.style("color","#7f5539") //文字的顏色
  inputElement.style("background","#fefae0") //文字框的背景顏色
  

  //按鈕的設定
  btnMoveElement = createButton("移動")
  btnMoveElement.position(170,10)
  btnMoveElement.size(80,25)
  btnMoveElement.style("font-size","15px")
  btnMoveElement.style("background","#fefae0")
  btnMoveElement.mousePressed(face_move)
  
  btnStopElement = createButton("暫停")
  btnStopElement.position(270,10)
  btnStopElement.size(80,25)
  btnStopElement.style("font-size","15px")
  btnStopElement.style("background","#fefae0")
  btnStopElement.mousePressed(face_stop)

  //語音按鈕
  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(550  ,10)
  btnVoiceElement.size(80,25)
  btnVoiceElement.style("font-size","15px")
  btnVoiceElement.style("background","#fefae0")
  btnVoiceElement.mousePressed(voice_go)
  
  musicElement = createButton("音樂")
  musicElement.position(650  ,10)
  musicElement.size(80,25)
  musicElement.style("font-size","15px")
  musicElement.style("background","#fefae0")
  musicElement.mousePressed(music_btn_pressed)

  //radio的設定，多個選項只能選一個(單選題)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10) //選鈕位置
  radioElement.size(160,30)
  radioElement.style("font-size","15px")
  radioElement.style("background","#fefae0")
  //checkBox的設定，多個選項可以選多個(複選題)
}

function draw() {
  background("#fefae0");
  mode = radioElement.value()
  for(var i=0;i<pos_x.length;i=i+1)
  {
    push()
    txts = inputElement.value();
     translate(pos_x[i],pos_y[i])
     if(mode=="旋轉"){
      rotate(sin(frameCount/20))
   }
     drawface(colors[i],0,sizes[i])
    pop()

    if(face_move_var|| mode=="移動"){ //在face_move_var為true時，臉會移動，||是or的意思
      pos_y[i] = pos_y[i] + v_y[i] //物件移動的指令
      
    }
    
    if(pos_y[i]>height || pos_y[i]<0)
    {
      pos_x.splice(i,1)
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)

    }
  }
}
function drawface(face_clr=255,sizes){
  push()  
  fill("#254441")
  stroke("#003e1f")
  textSize(30)
  text(txts,-80,300)
  
  //scale(size)
    fill("#FFFAF4")
    ellipse(0,0,230,) //臉頰
    fill(face_clr)
    triangle(0 ,-280, -110, -50, 110, -50); //聖誕帽
    fill("#ffffff")
    ellipse(0,-280,50,) //聖誕帽上圓形
    rect(-130,-50,260,30) //聖誕帽下方型
    stroke(550)
    //鬍子
    ellipse(110,50,50)
    ellipse(70,55,60)
    ellipse(40,55,60)
    ellipse(10,55,60)
    ellipse(-110,50,50)
    ellipse(-70,55,60)
    ellipse(-40,55,60)
    ellipse(90,80,50) 
    ellipse(-90,80,50)
    ellipse(50,80,50)
    ellipse(-50,80,50)
    ellipse(10,80,50)
    ellipse(-10,80,50)
    ellipse(70,110,50)
    ellipse(-70,110,50)
    ellipse(30,110,50)
    ellipse(-30,110,50)
    ellipse(10,110,50)
    ellipse(50,140,50)
    ellipse(-50,140,50)
    ellipse(10,140,50)
    ellipse(-10,140,50)
    ellipse(30,170,50)
    ellipse(-30,170,50)
    ellipse(6,170,50)
    ellipse(10,200,50)
    ellipse(-10,200,50)
    //鼻子
    fill("#c1121f")
    ellipse(5,30,45) 
    //眼睛
    fill("#000000")
    ellipse(60,10,15)
    ellipse(-50,10,15)
  pop()
}
function mousePressed(){
  if(mouseY>60){
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.2,0.8))
  colors.push(face_colors[int(random(face_colors.length))])
  v_y.push(-1,1)
  
}
}
 
function face_move(){
  face_move_var = true
  
}

function face_stop(){
  face_move_var = false
 
}

function voice_go(){
  myRec.onResult = showResult //取得語音辨識後去執行function showResult
  myRec.start()  //開始做辨識
}

function music_btn_pressed(){
 if(sound1.isPlaying()){
   sound1.stop();

 }
 else{
  sound1.play();

  }
}

function showResult(){
    if(myRec.resultValue == true)
    {
      print(myRec.resultString)
      if(myRec.resultString.indexOf("走") !== -1){
        face_move_var = true
      }
     if(myRec.resultString.indexOf("停") !== -1){
        face_move_var = false
        dace_Rot_var = false
    }
    if(myRec.resultString.indexOf("轉") !== -1){
       face_Rot_var = true
  }
}
}

