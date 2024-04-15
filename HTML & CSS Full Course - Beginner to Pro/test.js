

  //result: a+p+p+l+e
    //replace(/ +(?= )/g,'') : 공백이 2개 이상일 경우 1개로 치환
  
    str
    str = str.replace(/ +(?= )/g,'').split('').join('+');
    console.log(str)