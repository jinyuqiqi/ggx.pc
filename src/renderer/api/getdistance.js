const EARTH_RADIUS = 6378.137; //地球半径  
  
function rad(d) {  
    return d * Math.PI / 180.0;  
}  
  
function getDistance(lng1, lat1, lng2, lat2) {  
    var radLat1 = rad(lat1);  
    var radLat2 = rad(lat2);  
    var a = radLat1 - radLat2;  
    var b = rad(lng1) - rad(lng2);  
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)  
                + Math.cos(radLat1) * Math.cos(radLat2)  
                * Math.pow(Math.sin(b / 2), 2)));  
    s = s * EARTH_RADIUS;  
    s = Math.round(s * 10000) / 10000;  
    return s;  
}  
      
    // alert(getDistance(116.403933,39.914147, 116.403237,39.927919));
export default getDistance