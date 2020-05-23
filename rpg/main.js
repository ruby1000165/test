let mapArray,ctx,currentImgMainX,currentImgMainY;
let imgMountain,imgMain,imgEnemy;

$(document).ready(function(){
   mapArray=[0,1,1,0,0,0,3,1,2];  //遊戲地圖，0:可走、1:障礙、2:終點、3:敵人
   ctx = $("#myCanvas")[0].getContext("2d");  //Canvas是畫布，用平面(2d)的方式來作畫

   imgMain = new Image();    //把主角擺上去
   imgMain.src = "rpg/images/spriteSheet.png";
   currentImgMainX = 0;      //設定主角的x,y座標
   currentImgMainY = 0;
   imgMain.onload = function(){
       ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
   };

   imgMountain = new Image();  //把障礙物擺上去
   imgMountain.src = "rpg/images/material.png";
   imgEnemy = new Image();     //把敵人擺上去
   imgEnemy.src = "rpg/images/Enemy.png";
   imgMountain.onload = function(){
       imgEnemy.onload = function(){
            for(let x in mapArray)
            {
                if(mapArray[x]==1)    //若位置對應到1:障礙的話，就把山放上去
                {
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
                }
                else if(mapArray[x]==3)  //若位置對應到3:敵人的話，就把敵人放上去
                {
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
                }
            }
       }
   };
});

//當有人按下鍵盤時要做的事情
$(document).keydown(function(event){
    let targetImgMainX,targetImgMainY,targetBlock,cutImagePositionX;  //主角即將要移動過去的目標位置、主角即將要移動過去的那一格編號、依據主角朝什麼方向而決定的圖片
    event.preventDefault();  //可以避免點擊鍵盤出現瀏覽器的其他行為，例:捲動、放大、換頁
    //console.log(event.code);

    //依據使用者按鍵指示，對應計算目標位置，主角新的方向圖片
    switch(event.originalEvent.code){        //人物上下左右變動時的位置
        case "ArrowLeft":
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break; 
        default:    //其他按鍵不回應
            return;
    }

    //在邊界內
    if(targetImgMainX <=400 && targetImgMainX >=0 && targetImgMainY <=400 && targetImgMainY >=0)
    {
        targetBlock = targetImgMainX/200 + targetImgMainY/200*3;
    }else{   //超出邊界
        targetBlock = -1;
    }

    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);   //清除主角原本所在的位置
    if(targetBlock == -1 || mapArray[targetBlock]==1 || mapArray[targetBlock] ==3){  //所有異常(出界、遇到敵人、遇到障礙物都不動)
    }else{   //若遇到正常情況就設定新位置
        $("#talkBox").empty();
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);  //在新的位置上畫上主角
    
    //用文字對應顯示狀態
    switch(mapArray[targetBlock]){
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("抵達終點");
            break;
        case 3:
            $("#talkBox").text("哈囉~");
            break;
    }
});