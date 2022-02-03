const $=el=>{return document.querySelector(el);}
const mock={"upTemp":20,"downTemp":0,"currentTemp":11,"sunset":['19','41'],"sunrise":['07','41'],"sunriseT":['6','35'],"sunsetT":['7','40']};
const current=[1,41];
const MIN=time=>{return (time[0]*60)+Number(time[1])};
var daybreak=[24,0]
const DayBreak= current=>{daybreak[0]+=current[0];daybreak[1]=current[1];}
var DayBreakFlag=true;

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

if(current[0]==0){
    DayBreakFlag=true;
}

if(MIN(current)>MIN(mock.sunset)){
    console.log('Is Night!');
    $('#gold').style.strokeDashoffset='-383';

    sun=((MIN(current)-MIN(mock.sunrise))*360)/(24*60);
    $('.cont-sun--moon').style.transform='rotate(450deg)'; 

    setTimeout(Sun,2000);
    function Sun(){
        $('#dark').style="opacity:1;";
        $('#dark-pluk').style="display:block;";
        $('.bi-moon-stars-fill').style="display:block;";
        $('.bi-sun-fill').style="display:none;";
          

        dark=((MIN(current)-MIN(mock.sunset))*383)/(12*60);
        $('.cont-sun--moon').style.transform=`rotate(${sun+270}deg)`; 
        $('#dark').style.strokeDashoffset=`${383-dark}`;
    }

    $('#sunrise span:first-child').innerText=mock.sunriseT[0];
    $('#sunrise span:last-child').innerText=mock.sunriseT[1];
}else if(DayBreakFlag){
    console.log('Day Break!');
    DayBreak(current);

    // dark=((MIN(daybreak)-MIN(mock.sunset))*383)/(12*60);
    // $('.cont-sun--moon').style.transform=`rotate(${sun+450}deg)`; 
    // $('#dark').style.strokeDashoffset=`${383-dark}`;

    $('#gold').style.strokeDashoffset='-383';

    sun=((MIN(daybreak)-MIN(mock.sunset))*360)/(24*60);
    $('.cont-sun--moon').style.transform='rotate(450deg)'; 

    setTimeout(Sun,2000);
    function Sun(){
        $('#dark').style="opacity:1;";
        $('#dark-pluk').style="display:block;";
        $('.bi-moon-stars-fill').style="display:block;";
        $('.bi-sun-fill').style="display:none;";
          

        dark=((MIN(daybreak)-MIN(mock.sunset))*383)/(12*60);
        $('.cont-sun--moon').style.transform=`rotate(${sun+450}deg)`; 
        $('#dark').style.strokeDashoffset=`${383-dark}`;
    }
}else{
    console.log('Is Day!'); 
    gold=((MIN(current)-MIN(mock.sunrise))*383)/(MIN(mock.sunset)-MIN(mock.sunrise));
    $('#gold').style.strokeDashoffset=`-${gold}`;
    sun=((MIN(current)-MIN(mock.sunrise))*180)/(MIN(mock.sunset)-MIN(mock.sunrise));
    $('.cont-sun--moon').style.transform=`rotate(${sun+270}deg)`;      
}