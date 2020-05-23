$(document).ready(function(){
    let currentQuiz = null;                    //建立currentQuiz，儲存目前作答到第幾題
    $("#startButton").click(function(){
        if(currentQuiz == null){               //如果還沒有作答就從這裡開始
            currentQuiz = 0;                   //假設目前作答到第0題
            $("#question").text(questions[0].question); //顯示題目
            $("#options").empty();                      //清空選項區域
            for (let x = 0;x<questions[0].answers.length;x++){    //加入選項
                $("#options").append(
                    "<input name='options'  type='radio' value=" + x + 
                    "<label>" + questions[0].answers[x][0] + "</label><br><br>"
                );
            }
            $("#startButton").attr("value","Next");  //將文字按鈕換成Next或下一題
        }else{       //如果已經開始作答就從這裡開始
            $.each(  //網頁中每一個radio都來看一看，巡訪每個選項是否被選取
                $(":radio"),function(i,val){  //i表示index，val表示那一項的值
                    if(val.checked){          //如果這個選項被選取
                        if(isNaN(questions[currentQuiz].answers[i][1])){  //分成是否已經產生最終結果(A~D)
                            //isNaN(is not a number)是檢查它不是數字，若不是則表示會跳到最後結果的部分
                            let finalResult = questions[currentQuiz].answers[i][1];
                            $("#question").text(finalAnswers[finalResult][0]); //顯示最終成果的標題
                            $("#options").empty();
                            //顯示最終成果的內容
                            $("#options").append(finalAnswers[finalResult][1] + "<br><br>"); 
                            currentQuiz = null;                          //清空答題數
                            $("#startButton").attr("value","Restart");  //修改按鈕為重新開始
                        }else{    //繼續作答時
                            //指定下一個要顯示的題目，原始資料是從一開始，所以要-1
                            currentQuiz = questions[currentQuiz].answers[i][1]-1;  
                            $("#question").text(questions[currentQuiz].question);  //顯示新的題目
                            $("#options").empty();
                            for(let x = 0;x < questions[currentQuiz].answers.length;x++){  //顯示新的選項題目
                                $("#options").append(
                                "<input name = 'options' type = 'radio' value = " + x + "<label>" + 
                                questions[currentQuiz].answers[x][0]+"</label><br><br>"
                            );
                            }    
                        }
                        return false; //完成後即跳離迴圈
                    }
                }
            );
        }
    });
});