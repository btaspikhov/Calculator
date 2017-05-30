var table = document.querySelector('table');
var expContainer = document.getElementsByClassName('exp-container')[0];
var exp = document.getElementsByClassName('expression')[0];
var isNewExpression = true;
var dotCount = 0;
var divSym = String.fromCharCode(247);
var mulSym = String.fromCharCode(215);
function clearExpression() {
  exp.innerHTML=0;
  dotCount = 0;
  isNewExpression = true;
}
function isOperation(val) {
  if (val == '+' || val == '-' || val == divSym || val == mulSym) {
    return true;
  } else {return false;}
}
table.addEventListener('click', function(e) {
  var target = e.target;
  if (target.nodeName != 'TD') return;
  //too long expression
  if (exp.offsetWidth+30>=expContainer.clientWidth) {
    alert('Too long expression');
    clearExpression();
    return;
  }
  var val = target.innerHTML;
  if (val == 'AC') {
    clearExpression();
  }
  if (val == 'CE') {
    if (exp.innerHTML.length == 1 || exp.innerHTML.includes('=')) {
      clearExpression();
      return;
    }
    var arr = exp.innerHTML.split('');
    arr.pop();
    for (var i = arr.length-1; i>=0; i--) {
      if (arr[i] == mulSym || arr[i] == divSym || arr[i] == '+' || arr[i] == '-') {
        arr.pop();
        break;
      } else {
          arr.pop();
      }
    }
    exp.innerHTML = arr.length > 0 ? arr.join('') : 0;
  }
  if (val != 'AC' && val != 'CE' && val != '=') {
    if (isNewExpression) {
      if (val == divSym || val == mulSym) {return;}
      isNewExpression = false;
      exp.innerHTML = '';
    }
    if (val == '.' && dotCount>0) {
      return;
    } else if (val == '.' && dotCount==0) {
      dotCount++;
      exp.innerHTML+=val;
    } else if (target.className == 'operation'
               && isOperation(exp.innerHTML[exp.innerHTML.length-1])) {
      return;
    } else if (target.className != 'number'
               && exp.innerHTML[exp.innerHTML.length-1] == '.') {
      return;
    } else {
        exp.innerHTML+=val;
    }
  }
  if (val == '=') {
      if (exp.innerHTML[exp.innerHTML.length-1] == '.') {
        return;
      }
      var reDiv = new RegExp(divSym, "g");
      var reMul = new RegExp(mulSym, "g");
      var expStr = exp.innerHTML.replace(reDiv, '/').replace(reMul, '*');
      var res = eval(expStr);

      exp.innerHTML+=val+res;
      if (exp.offsetWidth+30>=expContainer.clientWidth) {
        exp.innerHTML = exp.innerHTML.replace(/=[.0-9]+/,'<br>='+res);
      }
      dotCount = 0;
      isNewExpression = true;
  }
});
