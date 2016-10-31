
function getWeather(lat, lon, id){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"32&appid=9206ce8afda2f891654617959048070e", function(obj){
        createWeatherDiv(id);
        var about = "#about" +id;
        var weathericon = "#weathericon" +id;
        var temp = "#temp" + id;
        $(about).html(obj["name"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + titleCase(obj["weather"][0]["description"]));
        $(weathericon).addClass("wi wi-owm-" + obj["weather"][0]["id"]);
        var celius = Math.round(obj["main"]["temp"] - 273.15);
        var fahrenheit =  Math.round(obj["main"]["temp"] * 9/5 - 459.67);
        $(temp).html(celius + "&#8451 / " +fahrenheit + "&#8457");
        console.log(obj);
    });
}

function createWeatherDiv(id){
    var resultDiv = document.createElement('div');
    resultDiv.className = 'resultDiv';
    resultDiv.id = 'resultDiv'+ id;
    var about = document.createElement('div');
    about.className = 'about';
    about.id = 'about' + id;
    var weathericon = document.createElement('i');
    weathericon.className = 'weathericon';
    weathericon.id = 'weathericon' + id;
    var temp = document.createElement('div');
    temp.className='temp';
    temp.id = 'temp' +id;
    var weather = document.getElementById('weather');
    weather.appendChild(resultDiv);
    resultDiv.appendChild(about);
    resultDiv.appendChild(weathericon);
    resultDiv.appendChild(temp);
}

function titleCase(str) {
     words = str.toLowerCase().split(' ');

     for(var i = 0; i < words.length; i++) {
          var letters = words[i].split('');
          letters[0] = letters[0].toUpperCase();
          words[i] = letters.join('');
     }
     return words.join(' ');
}

$(document).ready(function(){
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeather(lat,lon,0);
    });
     };
     
    
    $("#getNewArea").on('click',function(){
        document.getElementById("getNewArea").style.display = "none";
        document.getElementById("areaForm").style.display = "block";
    });
    
    jQuery(function () 
    {
	 jQuery("#area").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#area").val(selectedObj.value);
		 return false;
		},
		open: function () {
		 jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 jQuery("#area").autocomplete("option", "delay", 100);
	});
    
    var id = 0;  
    console.log(id);
    var area = document.getElementById("areaForm");
    $("#getVal").on('click',function(){
            document.getElementById("getNewArea").style.display = "block";
            document.getElementById("areaForm").style.display = "none";
            var city = jQuery("#area").val();
            id++;
            console.log(id);
            console.log(city);
		    $.getJSON(
	                "http://gd.geobytes.com/GetCityDetails?&fqcn="+city,
                     function (data) {
	            var lat = data.geobyteslatitude;
	            var lon = data.geobyteslongitude;
                getWeather(lat,lon,id);
	       });
    });

})
