/*
$(document).ready(function(){     //當整份文件準備好的時候
    $("input").click(function(){  //因為只有一個button，因此input只會對應到那個button
        alert("Hi");
        $("H1").text("Hello");
    })
})

$(document).ready(function(){
    $("input").click(function(){
        //alert("Hi");
        //$("H1").text("Hello");
        $("H1").text($("li:first").text());   //抓出清單內的第一個值
    })
})

$(document).ready(function(){
    $("input").click(function(){
        //alert("Hi");
        //$("H1").text("Hello");
        $("H1").text($("li:last").text());   //抓出清單內的最後一個值
    })
})

$(document).ready(function(){
    $("input").click(function(){
        ///alert("Hi");
        //$("H1").text("Hello");
        //Math.randam():0~0.999999 
        //Math.randam():0~0.999999 *3 = 0~2.99999
        //要變成整數
        $("H1").text($("li").eq(1).text());   //抓出清單內的第二個值
    })
})
*/
$(document).ready(function(){ 
    $("input").click(function(){                 //按下button做input後執行
        let numberOfListItem = $("#choices li").length;   //抓清單的長度，要加上特定的id，整合時才不會抓到全部的list
        //Math.randam():0~0.999999 
        //Math.randam():0~0.999999 *3 = 0~2.99999
        //Math.floor()會回傳小於等於所給數字的最大整數
        //要變成整數，才能在0~2之間取隨機變數
        let randomChildNumber = Math.floor(Math.random()*numberOfListItem); 
        $("#random-result").text($("#choices li").eq(randomChildNumber).text());   //抓出清單內相對應的文字
        $("#random-pic").attr("src", picture[randomChildNumber]);     //抓出清單內相對應的圖片
    })
})



