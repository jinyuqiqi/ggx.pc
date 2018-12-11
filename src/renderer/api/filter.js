export const trim = str => {
    return str.replace(/\s/g,"")
}

export const filter_status = str => {
    let newStr = ''
    switch(str){
        case '0':
           newStr = '待抢单';
           break;
        case '2':
           newStr = '未开始';
           break;
        case '4':
           newStr = '已开始';
           break;
        case '7':
           newStr = '已完成';
           break;
        case '8':
           newStr = '已取消';
           break;
    }
    return newStr
}

export const filter_r_status = str => {
    let newStr = ''
    switch(str){
        case '2':
           newStr = '未开始';
           break;
        case '4':
           newStr = '已开始';
           break;
        case '7':
           newStr = '已完成';
           break;
        case '8':
           newStr = '已取消';
           break;
    }
    return newStr
}

export const filter_title_status = (type,str) => {
    let newStr = ''
    if(type == 1){
      switch(str){
        case '0':
           newStr = '待抢单';
           break;
        case '2':
           newStr = '未开始';
           break;
        case '4':
           newStr = '已开始';
           break;
        case '7':
           newStr = '已完成';
           break;
        case '8':
           newStr = '已取消';
           break;
      }
    }
    if(type == 2){
      switch(str){
        case '2':
           newStr = '未开始';
           break;
        case '4':
           newStr = '已开始';
           break;
        case '7':
           newStr = '已完成';
           break;
        case '8':
           newStr = '已取消';
           break;
      }
    }
    
    return newStr
}

export const filter_text_status = str => {
    let newStr = ''
    switch(str){
        case '2':
           newStr = '订单已生成，请联系对方，确保订单无误';
           break;
        case '4':
           newStr = '订单已开始，完成后记得评价';
           break;
        case '7':
           newStr = '恭喜完成订单，系统奖励会发到您的账户';
           break;
    }
    return newStr
}

export const filter_parsefloat = num => {
    return Math.round(num*100)/100
}

export const formatDate = input =>{
  var d = new Date(input);
  var year = d.getFullYear();
  var month = (d.getMonth() + 1) <10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
  var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
  var hour = d.getHours() <10 ? '0' + d.getHours() : '' + d.getHours();
  var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
  var seconds = d.getSeconds() <10 ? '0' + d.getSeconds() : '' + d.getSeconds();
  return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
}


