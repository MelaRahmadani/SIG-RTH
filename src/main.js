
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCmIfe6uYdwYtS6c7ET-IDEOKMq_sbDsQ",
    authDomain: "latihan-168007.firebaseapp.com",
    databaseURL: "https://latihan-168007.firebaseio.com",
    projectId: "latihan-168007",
    storageBucket: "latihan-168007.appspot.com",
    messagingSenderId: "760935327738"
  };
  firebase.initializeApp(config);

  var markerRef=firebase.database().ref('markers');

  function saveMarker(coord, info=null, imageIcon=null){
    var newMarkerRef  = markerRef.push();
    newMarkerRef.set(
        {
            coord:coord,
            info:info,
            imageIcon:imageIcon
        }
    );
    console.log(newMarkerRef);
  }
  markerRef.on('value',getData,showError);

  function getData(data){
    var markers=[];
    
    // console.log(keys);
    data.forEach(function(datamarker) {
      // console.log(datamarker.val().coord,datamarker.val().info);
      lat = parseFloat(datamarker.val().coord.lat);
      lng = parseFloat(datamarker.val().coord.lng);
      info = datamarker.val().info;
      // console.log(datamarker.key);
      loc = {lat:lat,lng:lng};
      markers.push(createMarker(loc,info,'images/placeholder.png'));
    });
    // var marker= data.val();
    // var keys = Object.keys(data.val());
    // for (var i=0;i<keys.length;i++){
    //   var k = keys[i];
    //   // console.log(parseFloat(marker[k].coord.lat));
    //   lat = parseFloat(marker[k].coord.lat);
    //   lng = parseFloat(marker[k].coord.lng);
    //   loc = {lat:lat,lng:lng};
    //   // console.log(loc);
    //   markers.push(createMarker(loc,marker[k].info,'images/placeholder.png'));
    // }
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'images/m'});
  }
  function showError(err){
    document.querySelector('.alert').style.display='block';
    document.getElementById("alert").innerHTML = "Gagal Menyimpan Data";
    document.querySelector('.alert').style.background='red';
    setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },3000);
  }


  //Map preparing
  var map=null;
  var center =  {lat:-5.367284,lng:105.244935};
       function initMap(){
            document.getElementById("save").disabled = true;
            getLocation();
            console.log(center);
            map=new google.maps.Map(document.getElementById('map'),{zoom:11,center:center});
            console.log(map);
            marker=createMarker(center,'<h3>Jurusan Ilmu Komputer</h3><hr>'+
                                 '<p><a href="http://ilkom.unila.ac.id" target="blank">http://ilkom.unila.ac.id</a>');
            marker.setMap(map);
            google.maps.event.addListener(map, "click", function (e) {
                // //lat and lng is available in e object
                var latLng = e.latLng;
                marker.setPosition(latLng);
                // // console.log(marker.getPosition().lat());
                setValue('lat',latLng.lat());
                setValue('lng',latLng.lng());
                document.getElementById("save").disabled = false;
                // createMarker(e.latLng);
                // coord={lat:latLng.lat(),lng:latLng.lng()};
                // saveMarker(coord);
                 });
        }
        function createMarker(coords,contentString=null,imageIcon=null){
           // var marker=new google.maps.Marker({position:coords,map:map});
           var marker=new google.maps.Marker({position:coords,icon:imageIcon});
            if(contentString){
                var infowindow = new google.maps.InfoWindow();
                infowindow.setContent(contentString);
                marker.addListener('click',function(){
                    infowindow.open(map,marker);
                });
            }
            // console.log(marker);
            return marker;
        }
        function setValue(id,val){
            document.getElementById(id).value=val;
        }

        document.getElementById("save").addEventListener("click",function(){
            // console.log("save click");
            lat=parseFloat(document.getElementById('lat').value);
            lng=parseFloat(document.getElementById('lng').value);
            coord={lat:lat,lng:lng};
            var info=null;
            if (document.getElementById('info').value){
                info=document.getElementById('info').value;
            }
            saveMarker(coord, info);
            document.getElementById("save").disabled = true;
            document.querySelector('.alert').style.display='block';
            document.getElementById("alert").innerHTML = "Data Disimpan ke Firebase";
            setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },3000);

        });