var map;
var tenYearArry = []

var markers = [];

var allYears = [];

var MauiLocs = []
var MauiTowns = []



var SESSION = false;



  var currentUNIX = Math.floor(Date.now()); //current time in UNIX seconds
  var myDateObj = new Date(currentUNIX)
  var theDay = myDateObj.getDate();
  var theMonth = myDateObj.getMonth()
  var theYear = myDateObj.getFullYear()
  var current = Math.floor((myDateObj / 1000)); //current time in UNIX seconds
  var year = 31536000; //one year in seconds
  var yearCount = year * 1; //ten years in seconds
  var final = current - yearCount; //final time ten years from now
  
  
  
  
  
  //this returns just a name of place clicked.  Run it only once
function geoLocate(){
    var lat = $("#lat").val();
  var lng = $("#lng").val();
  console.log(lat +" "+lng)
  var geocoder = new google.maps.Geocoder;
  var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
  
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var placeClicked = results[1].formatted_address
      console.log(placeClicked);
      MauiTowns.push(placeClicked)
      $('#CityState').html(placeClicked)
    }else{
      console.log('THIS GEOLOC NOT WORKING becaue '+status)
    }
  });
}


// function getGeoLocate(lat, lng){
//   console.log(lat +" "+lng)
//   var geocoder = new google.maps.Geocoder;
//   var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
  
//   geocoder.geocode({'location': latlng}, function(results, status) {
//     if (status === google.maps.GeocoderStatus.OK) {
//       console.log(results)
//       var placeClicked = results[1].formatted_address
//       console.log(placeClicked);

//       $('#CityState').html(placeClicked)
//     }else{
//       console.log('THIS GEOLOC NOT WORKING becaue '+status)
//     }
//   });
// }


  
  
   function getSecondsDateYear(){
    var count = allYears.length
    for (var x = 0; x<count;x++){
      console.log(new Date(allYears[x], theMonth, theDay))
    }
  }



  function timeConverter(unixTime) {
    var a = new Date(unixTime * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    // return time;
    return(time);
  }
  
    function getTime(unixTime) {
    var a = new Date(unixTime * 1000);
    var hour = a.getHours();
    if (hour)
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =hour + ':' + min
    // return time;
    return(time);
  }
  
  
  
  
  function getAllYears(dateObj, numYears){
     var thisYear = dateObj.getFullYear()

    for (var x = 0; x<numYears; x++ ){
      allYears.push(thisYear)
      thisYear--
    }
  }


  function timeZoneDifference(myTimeZone, clickedLocTimeZone){
    if(myTimeZone < clickedLocTimeZone){
      console.log(myTimeZone - clickedLocTimeZone+' myTimeZone - clickedLocTimeZone')
    return Math.abs(myTimeZone - clickedLocTimeZone)
    }else{
      console.log(clickedLocTimeZone - myTimeZone+' clickedLocTimeZone - myTimeZone')
      return Math.abs(clickedLocTimeZone - myTimeZone)
    }
  
  }


function initMap() {
  var maui = {
    lat: 20.78881630731087,
    lng: -156.3409423828125
  };


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: maui,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    addMarker(event.latLng);
   var lat= $('#lat').val(event.latLng.lat)
    var lng = $('#lng').val(event.latLng.lng)
    
    var town = [lat.val() , lng.val()]
    
    MauiLocs.push(town)
    
      //apiCall(event.latLng)
    apiCall()
    
    geoLocate()
    
  });

  // Adds a marker at the center of the map.
  //addMarker(portland);

  // Create a heatmap.
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 8
  });
}

//api for forcast.io ee56df7c95dbc07fbfe02bb565ee45fd
//function apiCall(position){
function apiCall() {
  var lat = $("#lat").val();
  var lng = $("#lng").val();
  console.log(lat + " " + lng)
  var url = 'https://api.forecast.io/forecast/ee56df7c95dbc07fbfe02bb565ee45fd/' + lat + ',' + lng;
  
  var UTC_API = 'https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyAi_4W1hVR6KsZJS5C_LHthpthxvSpxTcY&location='+Math.round(lat*100)/100+','+Math.round(lng*100)/100
  
  

  
  
 


  
  
  
  
    
  // $.ajax({
  //     url: UTC_API + '&timestamp='+Date()+'?callback=?',
  //     dataType: 'jsonp',
  //     success: function(result) {
  //       if(!result){
  //         console.log('NO RESULT FORM YOUR NEW TIME ZONE API')
  //       }else{
  //     console.log(result) 
  //       }
  //     }
  //     })
  
  // https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY

  
  
  
  

  
  getAllYears(myDateObj, (yearCount/year))
  
 


  for (var x = current; x > final; x -= year) {
    var dataTime = timeConverter(x)
    $('#dataTime').html(dataTime)



    $.ajax({
      url: url + ',' + x + '?callback=?',
      dataType: 'jsonp',
      success: function(result) {
      //MAGICAL CODE FOR SINGLE DAY WATHER DATA POINT
      var propValueList = []
      var propList = []
        tenYearArry.push(result)//master data collection
       console.log(tenYearArry.length+" length of the tenYearArry");//see dataCollection
       
       //this code will only grab the data from the last index of collection
        for(var x = tenYearArry.length; x<=tenYearArry.length;x++){
          var y = x-1;
          console.log('the count is '+x+' for the tenYearArry loop...')
          var data = tenYearArry[y].daily.data[0]
          var timeZone = tenYearArry[y].timezone
          $('#timeZone').html(timeZone)
          
          console.log(data)
          
          for(var k in data){

            propList.push(k)
            propValueList.push(data[k])
            if(SESSION === false){
            $('#specificData').append('<option>'+k+'</option>')
            }
            
          } SESSION=true
          

        console.log(propList)// this is k
        console.log(propValueList)//this is data[k]
        var resultDiv = $('#resultList')//for testing
        
        var output = '';
        
       var getPropVal = function(theSummary){
         return theSummary
       }
        
        
        
  var myTimeZone = new Date().getTimezoneOffset()/60*-1
  var clickedLocTimeZone = tenYearArry[y].offset
  
  

  var timeDiff = timeZoneDifference(myTimeZone, clickedLocTimeZone)*60*60
  //THE TIMEZONE FUNCTION

        
      function iPropList(propList){
        for (var i in propList) {
          switch(propList[i]) {
            case 'summary':
              $('#dataHeader').html(propValueList[i])
              propList[i] = 'Todays Weather';//today weather
              break;
            case 'icon':
              var icon = getPropVal(propValueList[i])
              $('#dataIcon').html(icon)
              propList[i] = 'Symbol';// Font Icon
              break;
            case 'sunriseTime':
              var time = getTime(propValueList[i]+timeDiff)
              $('#dataSunRise').html(time)
              propList[i] = 'Sunrise';//sunrise
              break;
            case 'sunsetTime':
              var time = getTime(propValueList[i]+timeDiff)
              $('#dataSunSet').html(time)
              propList[i] = 'Sunset';//sunset
              break;
            case 'moonPhase':
              var moon = getPropVal(propValueList[i])
              var nightSky =  function(){
                var night;
                if(moon <= 0.5){
                  night =  (moon*200) - 100
                }else{
                  night =  ((1 - moon)*(200))-100
                }
                return Math.abs(night)
                  
              }//nightSky
              var crescent = function(){
                var cres;
                if(moon <= 0.5){
                  cres =  moon*20
                }else{
                  cres =  (moon - 0.5)*(20)-10
                }
                return cres
                  
              }//crescent
              console.log(nightSky())
              $('#dataMoonPerc').html(moon)
              $('.moonDataBox').css(
        "background", "linear-gradient(black "+nightSky()+"%, #041931)"
              );
              $('.moonIcon').css("box-shadow", "inset "+crescent()+"rem 0 whitesmoke")
              propList[i] = 'Moon';//moonphase
              break;
              
            case 'precipIntensity':
               var dataRainIndex = getPropVal(propValueList[i])
              $('#dataRainIndex').html(dataRainIndex)
              propList[i] = 'Precipitation Intensity';// rain index?
              break;
              
            case 'precipIntensityMax':
               var dataRainMax = getPropVal(propValueList[i])
              $('#dataRainMax').html(dataRainMax)
              propList[i] = 'Maximum Rainfall';// max rain
              break;
              
            case 'precipProbability':
               var dataRainChance = getPropVal(propValueList[i])
              $('#dataRainChance').html(dataRainChance)
              propList[i] = 'Chance of Rain';//Rain probobility
              break;
            case 'temperatureMin':
               var dataTempLow = getPropVal(propValueList[i])
              $('#dataTempLow').html(dataTempLow)
              propList[i] = 'Todays Low';// Low of the Day temp
              break;
            case 'temperatureMinTime':
               var dataTempLowTime = getTime(propValueList[i]+timeDiff)
              $('#dataTempLowTime').html(dataTempLowTime)
              propList[i] = 'Time of day minimum Temp.';//time of min temp
              break;
            case 'temperatureMax':
               var dataTempHigh = getPropVal(propValueList[i])
              $('#dataTempHigh').html(dataTempHigh)
              propList[i] = 'Todays High';//High temp of the day
              break;
            case 'temperatureMaxTime':
               var dataTempHighTime = getTime(propValueList[i]+timeDiff)
              $('#dataTempHighTime').html(dataTempHighTime)
              propList[i] = 'Time of day max temp';//time of max temp
              break;
            case 'dewPoint':
               var dataDewPoint = getPropVal(propValueList[i])
              $('#dataDewPoint').html(dataDewPoint)
              propList[i] = 'Dew Point Temp.';//Temp of DewPoint
              break;
            case 'humidity':
               var dataHumidity = getPropVal(propValueList[i])
              $('#dataHumidity').html(dataHumidity)
              propList[i] = '% Humidity';//Humidity %
              break;
            case 'windSpeed':
               var dataWindSpeed = getPropVal(propValueList[i])
              $('#dataWindSpeed').html(dataWindSpeed)
              propList[i] = 'Wind Speed mph';//windspeed mph??
              break;
            case 'windBearing':
               var dataWindDirrection = getPropVal(propValueList[i])
              $('#dataWindDirrection').html(dataWindDirrection)
              propList[i] = 'Wind Dirrection';//bearing is degree reading
              break;
            case 'visibility':
               var dataVisibility = getPropVal(propValueList[i])
              $('#dataVisibility').html(dataVisibility)
              propList[i] = 'Visibility #'; //Vistability
              break;
            case 'cloudCover':
               var dataCloudCover = getPropVal(propValueList[i])
              $('#dataCloudCover').html(dataCloudCover)
              propList[i] = 'Cloud Cover %';//% Cloud Cover
              break;
            case 'Barametric preasure':
               var dataPreassure = getPropVal(propValueList[i])
              $('#dataPreassure').html(dataPreassure)
              propList[i] = 'Is Preasuure on ya heads?';//mm Merc
              break;
            case 'ozone':
               var dataSunIndex = getPropVal(propValueList[i])
              $('#dataSunIndex').html(dataSunIndex)
              propList[i] = 'Sun Intensity';//Always Wear Sunscreen!!!
              break;
              //extra switch......
              // case 'apparentTemperatureMax':
              // propList[i] = 'Max Temp';
              // break;
              
            // default: 
            // propList[i] = "Sorry, please try again."
            // break; 
            
          }
        }

      }
       iPropList(propList)

        console.log(output)

        }
        
        console.log(tenYearArry.length+ ' tenYearArry.length again, but why?')
        console.log(tenYearArry+ ' tenYearArry')
 var dailyData = tenYearArry[0].daily.data//more data lives here
        console.log('the prop list is '+ propList);
        console.log('the propValueList '+ propValueList);
        
      }//END OF AJAX

    })

  }

}

//   $('#roadBtn').on('click', function(){
//       google.maps.MapOptions({
//           MapTypeId: ROADMAP
//       })
//   })
//   $('#terrainBtn').on('click', function(){
//       google.maps.MapOptions({
//           MapTypeId: TERRAIN
//       })
//   })





// Adds a marker to the map and push to the array.
function addMarker(location) {
console.log(MauiTowns.length+" length of the MauiTowns")
var x = MauiTowns.length
  //info window 
  var infowindow = new google.maps.InfoWindow({
    
    content: location.toString() +" Town "+ MauiTowns[x]
  });

  // console.log(location.lat.toString())

  //new marker
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  //add event click show infowindow
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  //push to collection array
  markers.push(marker);
}



// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}
$('#hideMarkerBtn').on('click', function() {
  clearMarkers()
})

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
$('#setMarkerBtn').on('click', function() {
  showMarkers()
})

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
$('#deleteMarkerBtn').on('click', function() {
  deleteMarkers()
})

// heatMap
function showHeatMap() {
  clearMarkers();

}
$('#deleteMarkerBtn').on('click', function() {
  deleteMarkers()
})


function showDataSet(){
var showTheData =  $('#dataSelect').val()
 $('#'+showTheData).toggleClass('hide')
}

$('#dataSelect').on('change', function(){
  console.log($('#dataSelect').val())
  showDataSet()
})

//FUNCTION ON CHANGE SELECT OPTION
$('#specificData').on('change', function(){
  var dataSelected = $('#specificData').val()
  console.log(dataSelected)
  $('#dataTitle').html(dataSelected)
  

  
  for(var x = 0;x<tenYearArry.length;x++){
    
  var dataObj = tenYearArry[x].daily.data[0]
  console.log(dataObj[dataSelected])
  
  if(dataSelected !== 'moonPhase'){
  var tableRow = '<tr><td>'+dataObj[dataSelected]+'</td><td>'+timeConverter(dataObj.time)+'</td></tr>'
  }else{
    var tableRow = '<div class="column small-4 moonDataBox">';
        tableRow += '<div class="row">';
				tableRow +=	'<div class="moonIcon"></div>';
				tableRow +=	'<h5>Moon phase:</h5>';
				tableRow +=	'<div id="dataMoonPerc" class="column small-12">';
				tableRow += '</div></div></div>';
  }
  $('#dataTable').append(tableRow)
  
  
  
  
  var  hyperTextML = '';
  hyperTextML = '<li>'+dataObj[dataSelected]+'</li>'
  
  $('#compareList').append(hyperTextML)
  }
})

