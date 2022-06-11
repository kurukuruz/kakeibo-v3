const priorityOf = (operator: string) => {
  let p = 0;
  switch (operator) {
    case '*':
    case '/':
      p = 3;
      break;
    case '+':
    case '-':
      p = 2;
      break;
    default:
      throw new Error(`対応外の演算子: ${operator}`);
  }
  return p;
}

export const parseFormula = (formula: string) => {
  if (!/^([0-9]+[\\+\\-\\*\\/])*[0-9]+$/.test(formula)) {
    throw SyntaxError('対応外の数式です');
  }

  // 出力キュー
  const queue = [] as string[];
  // 演算子スタック
  const opeStack = [] as string[];

  // 入力トークン
  const tokens = formula.matchAll(/([0-9]+|[\\+\\-\\*\\/])/g);
  let token = tokens.next();
  while (!token.done) {
    const currValue = token.value[0];
  
    if (/^[0-9]+$/.test(currValue)) {
      queue.push(currValue);
    } else {
      let loop = true;
      while(loop) {
        if(opeStack.length > 0) {
          const lastOpe = opeStack.slice(-1)[0];
          if (priorityOf(currValue) <= priorityOf(lastOpe)) {
            queue.push(opeStack.pop()!);
          } else {
            loop = false;
          }
        }
      }
      opeStack.push(currValue);
    }

    token = tokens.next();
  }
  let ope: string | undefined;
  while(ope = opeStack.pop()) {
    queue.push(ope);
  }

  const calcStack = [] as number[];
  let q: string | undefined;
  while(q = queue.shift()) {
    if (/^[0-9]+$/.test(q)) {
      calcStack.push(Number(q));
    } else {
      const b = calcStack.pop();
      const a = calcStack.pop();
      if (!a || !b) {
        throw Error('数値のスタック不足');
      }
      switch(q) {
        case '+':
          calcStack.push(a + b);
          break;
        case '-':
          calcStack.push(a - b);
          break;
        case '*':
          calcStack.push(a * b);
          break;
        case '/':
          calcStack.push(a / b);
          break;
        default:
          throw Error('対応外の演算子');
      }
    }
  }
  if (calcStack.length > 2) {
    throw Error('演算子不足');
  }
  return calcStack[0];
};
