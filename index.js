const $=el=>{return document.querySelector(el);}

    var value=0;
    setInterval(x,2000)
    function x(){
        $('.contDeg').style=`transform: translate(-50%,-10px) rotateZ(${value +270}deg);`;
        value=(value+18>180)? 0 : (value+18);
    }