const $=el=>{return document.querySelector(el);}

var value=0;
setInterval(temp,2000)
function temp(){
    $('.speedmeter__hand').style=`transform: translate(-50%,-10px) rotateZ(${value +270}deg);`;
    value=(value+18>180)? 0 : (value+18);
}

setTimeout(Sun,5000);
function Sun(){
    $('#dark').style="display:block;";
    $('#dark-pluk').style="display:block;";
    $('.bi-moon-stars-fill').style="display:block;";
    $('.bi-sun-fill').style="display:none;";
}