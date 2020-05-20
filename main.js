window.onload = function(){
    var cityName = "tempe";
    var key = "eebf4bac9b5fc6b31ad38ec7cb3d7c45";
    var link = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key;
    var request = new XMLHttpRequest();
    var temp, text;
    request.open('GET',link,true);
    request.onload = function(){
        var obj = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            temp = obj.main.temp;
            console.log("Current temperature :" + temp);
            text = "Current temperature : " + temp;
            displayInfo("cur_temp",text);
            text = "Lowest temperature : " + obj.main.temp_min;
            displayInfo("low_temp",text);
            text = "Highest temperature : " + obj.main.temp_max;
            displayInfo("high_temp",text);
            text = "Wind speed : " + obj.wind.speed;
            displayInfo("wind_speed",text);
        }
        else{
            console.log("The city doesn't exist! Kindly check");
        }
    }
    request.send();


}

displayInfo = (info,text) => {
    var temp = document.getElementById(info);
    temp.textContent = text;
}