
const copyMsg=document.querySelector('[data-copy-Msg]');
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const indicator=document.querySelector("[data-indicator]");

const copyBtn=document.querySelector("[data-copy]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const generateBtn=document.querySelector(".generateButton");
// includes all the checkboxes
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~!@#$%^&8()_-+={[}]|:;"<,>.?/';

//setting initial values
let password="";
let passwordLength=10;
let checkCount=0;

handleSlider();

//creating function

//set passwordlength
function handleSlider(){
    console.log("kite1");
     inputSlider.value=passwordLength;
     lengthDisplay.innerText=passwordLength;

     //or kuch bhi karna h
   
     const min=inputSlider.min;
     const max=inputSlider.max;
     
     inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100";
     console.log("kite");
}
function setIndicator(color){
  indicator.style.backgroundColor=color;
  indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRandomInteger(max, min){
    return Math.floor(Math.random()*(max-min))+min;
}
function getRandomUpppercase(){
   return String.fromCharCode(getRandomInteger(65,91));

}
function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getRandomNumbers(){
    return getRandomInteger(0,9);
}
function getRandomSymbols(){
//create string of symbol(line 16)
  const randNum=getRandomInteger(0,symbols.length);
  return symbols.charAt(randNum);
}
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked){
        // checkCount=checkCount+1;
        hasUpper=true;
    }
    if(lowercaseCheck.checked){
        hasLower=true;
    }
    if(numberCheck.checked){
        hasNum=true;
    }
    if(symbolsCheck.checked){
        hasSym=true;
    }
    if(hasUpper && hasLower &&(hasNum ||hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower)&&(hasNum||hasSym)&&passwordLength>=6){
        setIndicator('#ff0');
    }
    else{
        setIndicator("#f00");
    }
}
 async function copyContent(){
     try{
    await navigator.clipboard.writeText(passwordDisplay.value);

    let msg="copied";
    copyMsg.innerText=msg;
   
     }

     catch(e){
         copyMsg.innerText="failed";
     }

    copyMsg.classList.add("active");

    setTimeout(()=>{
     copyMsg.classList.remove("active");
    },2000);

}
function shufflePassword(array){
    //fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;

}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++
    })
    //special case
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);

})

inputSlider.addEventListener('input',(e)=>{
passwordLength=e.target.value;
handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})


generateBtn.addEventListener('click',()=>{
   if(checkCount <= 0) return;
   
   if(passwordLength<checkCount){
    passwordLength=checkCount;
    console.log("hii");

    handleSlider();
   }

   //let's create a new password

   //remove old passsword
   password="";

   //lets create with help of checked checkbox
 
let funcArr=[];
   if(uppercaseCheck.checked){
    funcArr.push(getRandomUpppercase);
   }
   if(lowercaseCheck.checked){
    funcArr.push(getRandomLowercase);
   }
   console.log("password");
   if(numberCheck.checked){
    funcArr.push(getRandomNumbers);
   }
   
   if(symbolsCheck.checked){
    funcArr.push(getRandomSymbols);
   }
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();

}
console.log("password");
//remaining addition
for(let i=0;i<passwordLength-funcArr.length;i++){
   let randIndex=getRandomInteger(0,funcArr.length);
   password+=funcArr[randIndex]();
}
//shuffle the password
password=shufflePassword(Array.from(password));

//show in UI
passwordDisplay.value=password;

//calculate strength
calcStrength();
})







