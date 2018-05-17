var x = document.getElementById("myloc");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    center =  {lat:position.coords.latitude,lng:position.coords.longitude};
    console.log(center);
    setValue('lat',position.coords.latitude);
    setValue('lng',position.coords.longitude);
    document.getElementById("save").disabled = false;
    document.querySelector('.myloc').style.display='block';
    setTimeout(function(){
        document.querySelector('.myloc').style.display='none';
    },3000);
}

function showError(error) {
    document.querySelector('.myloc').style.display='block';
    document.querySelector('.myloc').style.background='red';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
    setTimeout(function(){
        document.querySelector('.myloc').style.display='none';
    },3000);
}
