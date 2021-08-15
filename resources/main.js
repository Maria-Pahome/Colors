//Global functions and variables - etapa de invocare a elementelor cu care lucrezi 
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

//Functions


//Color generator
function generateHex(){
    const hexColor = chroma.random();
    return hexColor;
}

function randomColors(){
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();
        
        //add the color to the bg
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        //Check for contrast 
        checkTextContrast(randomColor, hexText);
        //Initial Colorize sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        console.log(sliders);
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });
}

function colorizeSliders(color, hue, brightness, saturation){
    //scale saturation
    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);
    //update input colors 
    saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)}, ${scaleSat(1)})`;
}

function checkTextContrast(color,text){
    const luminance = chroma(color).luminance();
    if(luminance >0.5){
        text.style.color = "black";
    }else {
        text.style.color ="white";
    }
}

randomColors();



