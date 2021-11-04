// Language: javascript
// Path: Algorithms.js

const operators = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
  'n': 4
};

//Function that evaluates a postfix expression
const evaluatePostfix = (postfix) => {
const stack = [];
for (let i = 0; i < postfix.length; i += 1) {
  const char = postfix[i];
  if (char === ' ') {
    continue;
  }
  if (char in operators) {
    const a = stack.pop();
    const b = stack.pop();
    console.log(`a: ${a} b: ${b}`);
    switch (char) {
      case '+':
        stack.push(a + b);
        break;
      case '-':
        if(b < 0){
          stack.push(a - b)
          break
        }
        stack.push(b - a)
        break;
      case '*':
        stack.push(a * b)
        break;
      case '/':
        stack.push(b / a)
        break;
      case '^':
        stack.push(Math.pow(b, a));
        break;
      case 'n':
        console.log(`operator is n`)
        stack.push(-a);
    }
  } else {
    stack.push(Number(char));
  }
}
return stack.pop();
}


const infixToPostfix = (infix) => {
let stack = [];
let outputExpression = [];

for (let i = 0; i < infix.length; i += 1) {
  const char = infix[i];
  if (char === ' ') {
    continue;
  }
  if (char === '(') {
    stack.push(char);
  } 
  else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        outputExpression.push(stack.pop());
      }
      if(stack[stack.length - 1] !== '(') {
        return 'Invalid Expression';
      }
      else{
        stack.pop();
      }
  } 
  else if (char in operators) {
    
    // if(char === '-' && infix[i-1] === '-'){
    //   stack.push('+')
    //   continue
    // }
    if(char === '-' && infix[i-1] !== /[0-9]/ && infix[i-1] !== '-' && infix[i-1] !== ')'){
      stack.push('n')
      continue
    }
    while (stack.length > 0 && operators[stack[stack.length - 1]] >= operators[char]) {
      outputExpression.push(stack.pop());
    }
    stack.push(char);
    console.log(`Stack so far: ${stack}`);
  } 
  else {
    outputExpression.push(char);
    console.log(`outputExpression so far: ${outputExpression}`);
  }
}
while (stack.length > 0) {
  if (stack[stack.length - 1] === '(' || stack[stack[0] === ')']) {
    outputExpression = 'Invalid Expression'
    return outputExpression;
  }
  outputExpression.push(stack.pop());
}
console.log(`Final output expression: ${outputExpression}`)
  return outputExpression.join('');
}

postfix = infixToPostfix(test)
if(postfix === 'Invalid Expression'){
  console.log('Invalid Expression')
}
else{
  console.log(evaluatePostfix(postfix))
}