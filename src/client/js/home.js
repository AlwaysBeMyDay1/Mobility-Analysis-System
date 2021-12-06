import "../scss/styles.scss"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
}
function onGeoError(error){
    console.log(error);
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)