let topicsArray = [
    "課程介紹",
    "隨機性",
    "不上課",
    "日期時間",
    "不上課",
    "條件判斷"
]

let startDate = new Date();

function setMonthAndDay(startMonth,startDay){  
    //一次設定好月分與日期
    startDate.setMonth(startMonth-1,startDay);
    //時間先忽略，全部分為0
    startDate.setHours(0);   
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

//在還沒選擇時間的時候，設第一天的起始值
setMonthAndDay(4,1);


