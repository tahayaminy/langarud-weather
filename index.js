const $=el=>{return document.querySelector(el);}
const mock={"upTemp":20,"downTemp":0,"currentTemp":11,"sunset":['19','41'],"sunrise":['07','41'],"sunriseT":['6','35'],"sunsetT":['19','40']};
const current=[6,35];
const MIN=time=>{return (time[0]*60)+Number(time[1])};
var daybreak=[24,0]
const DayBreak= current=>{daybreak[0]+=current[0];daybreak[1]=current[1];}
var DayBreakFlag=false;

// FOR TEMP
$('.current-temp').innerText=`${mock.currentTemp} °C`;
$('#upTemp').innerText=mock.upTemp;
$('#downTemp').innerText=mock.downTemp;
$('.speedmeter__hand').style=`transform: translate(-50%,-10px) rotateZ(${(((mock.currentTemp+10)*180)/50) + 270}deg);`;

// FOR SVG
$('#sunrise span:first-child').innerText=mock.sunrise[0];
$('#sunrise span:last-child').innerText=mock.sunrise[1];
$('#sunset span:first-child').innerText=mock.sunset[0];
$('#sunset span:last-child').innerText=mock.sunset[1];

var gold;
var sun;
var dark;
var distance=(MIN([23,59]) - MIN(mock.sunset)) + MIN(mock.sunriseT);

if(MIN(current)>=0 && MIN(current)<=MIN(mock.sunriseT)){
    DayBreakFlag=true;
}

if(MIN(current)>MIN(mock.sunset)){
    //OK
    console.log('Is Night!');
    //COMPLETE DAY
    $('#gold').style.strokeDashoffset='-383';
    $('.cont-sun--moon').style.transform='rotate(450deg)'; 

    
    sunMoon=((MIN(current)-MIN(mock.sunset))*180)/(distance+1);
    setTimeout(Night,2000);

    function Night(){
        $('#dark').style="opacity:1;";
        $('#dark-pluk').style="display:block;";
        $('.bi-moon-stars-fill').style="display:block;";
        $('.bi-sun-fill').style="display:none;";
        dark=((MIN(current)-MIN(mock.sunset))*383)/(distance+1);
        $('.cont-sun--moon').style.transform=`rotate(${sunMoon+450}deg)`; 
        $('#dark').style.strokeDashoffset=`${383-dark}`;
    }

    $('#sunrise span:first-child').innerText=mock.sunriseT[0];
    $('#sunrise span:last-child').innerText=mock.sunriseT[1];
}




else if(DayBreakFlag){
    //OK
    console.log('Day Break!');
    DayBreak(current);

    //COMPELETE DAY
    $('#gold').style.strokeDashoffset='-383';
    $('.cont-sun--moon').style.transform='rotate(450deg)'; 

    
    sunMoon=((MIN(daybreak)-MIN(mock.sunset))*180)/(distance+1);
    setTimeout(Sun,2000);
    function Sun(){
        $('#dark').style="opacity:1;";
        $('#dark-pluk').style="display:block;";
        $('.bi-moon-stars-fill').style="display:block;";
        $('.bi-sun-fill').style="display:none;";
          

        dark=((MIN(daybreak)-MIN(mock.sunset))*383)/(distance+1);
        $('.cont-sun--moon').style.transform=`rotate(${sunMoon+450}deg)`; 
        $('#dark').style.strokeDashoffset=`${383-dark}`;
    }
    $('#sunrise span:first-child').innerText=mock.sunriseT[0];
    $('#sunrise span:last-child').innerText=mock.sunriseT[1];
}











else{
    //OK
    console.log('Is Day!'); 
    gold=((MIN(current)-MIN(mock.sunrise))*383)/(MIN(mock.sunset)-MIN(mock.sunrise));
    $('#gold').style.strokeDashoffset=`-${gold}`;
    sun=((MIN(current)-MIN(mock.sunrise))*180)/(MIN(mock.sunset)-MIN(mock.sunrise));
    $('.cont-sun--moon').style.transform=`rotate(${sun+270}deg)`;      
}