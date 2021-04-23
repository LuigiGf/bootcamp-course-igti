function changeNum(){
  const numExtense = document.querySelector("#numExtense");
  const numInteger = document.querySelector("#numInteger");
  function changeExtense(event){
    const integers = parseInt(num.value);
    const intSecond = parseInt(num.value[1]);
    const intThird = parseInt(num.value[2]);
    const intSecondPlus = parseInt(num.value[1] + num.value[2]);

    function oneDigit(entry){
      if(entry === 0) return "zero";
      if(entry === 1) return "um";
      if(entry === 2) return "dois";
      if(entry === 3) return "três";
      if(entry === 4) return "quatro";
      if(entry === 5) return "cinco";
      if(entry === 6) return "seis";
      if(entry === 7) return "sete";
      if(entry === 8) return "oito";
      if(entry === 9) return "nove";
    }
    function twoDigits(entry){
      if(entry === 10) return "dez";
      if(entry === 11) return "onze";
      if(entry === 12) return "doze";
      if(entry === 13) return "treze";
      if(entry === 14) return "quatorze";
      if(entry === 15) return "quinze";
      if(entry === 16) return "dezesseis";
      if(entry === 17) return "dezessete";
      if(entry === 18) return "dezoito";
      if(entry === 19) return "dezenove";
      if(entry < 30 && entry >= 20) return "vinte";
      if(entry < 40 && entry >= 30) return "trinta";
      if(entry < 50 && entry >= 40) return "quarenta";
      if(entry < 60 && entry >= 50) return "cinquenta";
      if(entry < 70 && entry >= 60) return "sessenta";
      if(entry < 80 && entry >= 70) return "setenta";
      if(entry < 90 && entry >= 80) return "oitenta";
      if(entry < 100 && entry >= 90) return "noventa";
    }
    function threeDigits(entry){
      if(entry === 100) return "cem";
      if(entry < 200 && entry > 100) return "cento";
      if(entry < 300 && entry >= 200) return "duzentos";
      if(entry < 400 && entry >= 300) return "trezentos";
      if(entry < 500 && entry >= 400) return "quatrocentos";
      if(entry < 600 && entry >= 500) return "quinhentos";
      if(entry < 700 && entry >= 600) return "seiscentos";
      if(entry < 800 && entry >= 700) return "setecentos";
      if(entry < 900 && entry >= 800) return "oitocentos";
      if(entry < 1000 && entry >= 900) return "novecentos";
    }
    if(integers < 10) event.innerHTML = oneDigit(integers);
    else if (integers < 20) event.innerHTML = twoDigits(integers);
    else if (integers < 100) event.innerHTML = `${twoDigits(integers)} e ${oneDigit(intSecond)}`;
    else{
      if(intSecond === 0 && intThird === 0) event.innerHTML = threeDigits(integers);
      else if(intSecond === 0 && intThird !== 0) event.innerHTML = `${threeDigits(integers)} e ${oneDigit(intThird)}`;
      else event.innerHTML = `${threeDigits(integers)} e ${twoDigits(intSecondPlus)} e ${oneDigit(intThird)}`;
    }
  }
  addEventListener('input', () => {numInteger.innerHTML = num.value});
  addEventListener('input',changeExtense(numExtense));
}

const num = document.querySelector("#test5");
num.addEventListener('input', changeNum);