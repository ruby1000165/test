$(document).ready(function(){ 
    setTable();
    //如果有人來設定日期
    $("#inputDate").change(function(){     //inputdate會輸出一個字串的格式
        let inputDate = $(this).val(); 
        console.log(inputDate);            //yyyy-mm-dd這是輸出的形式
        //用"-"符號把年月日劃分開來，並一一放入splitText陣列
        let splitText = inputDate.split("-"); 
        console.log(splitText);
        //splitText[0]是"年",splitText[1]是"月"，splitText[2]是"日"
        setMonthAndDay(splitText[1],splitText[2]);  
        setTable();
    });
 
});
 
function setTable(){
    //empty()是要先將上一個table先刪除。hide只是在網頁上不顯現，但empty是直接把後台所有資料刪除
    $("#courseTable").empty();    
 
    //一次產生固定標題列，新增表格標題內容
    $("#courseTable").append(
        "<tr><th>場次</th><th>時間</th><th>主題</th></tr>"
    );
    //反覆產生資料列
    let topicCount = topicsArray.length;
 
    //計算一天有多少毫秒
    let oneDayMilliseconds = 24*60*60*1000;
 
    for(let x=0; x<topicCount; x++){
        let thisDate = new Date(startDate.getTime()+7*x*oneDayMilliseconds);
        let trSpecial = "<tr>";     //可以指定特定的tr
        if(topicsArray[x]=="不上課"){
            trSpecial = "<tr style='background-color:lightyellow'>";
        }
        $("#courseTable").append(
            trSpecial +
            "<td>"+ (x+1) +"</td>"+
            "<td>"+ thisDate.toLocaleDateString().slice(5) +"</td>"+
            "<td>" + topicsArray[x]+"</td>"+
            "</tr>"
        ); //每一列有場次、預計日期、主題
    }
}


