function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    // калькулятор со скобками и приоритетами
    // объект с операциями +-*/
    let operators = {
      "+": (a, b) => parseFloat(b) + parseFloat(a),
      "-": (a, b) => b - a,
      "*": (a, b) => b * a,
      "/": (a, b) => b / a,
      }
    // объект с приоритетами операций
    let priority = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      }
    // массив для цифр
    let stackDigits = [];
    // массив для операторов
    let stackOperators = [];
    
    // Заменяем пробелы на строку без пробелом. Возвращаем массив со всеми сопоставлениями
    let arr = expr.replace(/\s/g, '').match(/[()+/*-]|([0-9\.\s]+)/g)
    
    // если количество скобок не парное - возвращается ошибка
    if (arr.map(a => a == "(" || a == ")").filter(a => a == true).length % 2 != 0) {
        throw new Error("ExpressionError: Brackets must be paired")
        }
    
    // цикл
    for (let i = 0; i < arr.length; i++) {
      // находим элементы массива цифры и складываем их в массив с цифрами
      if(/[0-9]/.test(arr[i])) {
        stackDigits.push(arr[i]);
        // если приоритет оператора выше последнего приоритета оператора -  добавляем его в массив с операторами
        } else if (priority[arr[i]] > priority[stackOperators[stackOperators.length - 1]]) {
          stackOperators.push(arr[i])
          // ( складываем в массив с операторами
          } else if (arr[i] == "(") {
            stackOperators.push(arr[i])
            // ) удаляем из массива с операторами
            } else if (arr[i] == ")") {
              // пока не встретится ( добавляем в массив с цифрами результат с математической операцией двух последних цифр из массива с цифрами. Резултат складываем в массив с цифрами, а 2 слагаемых удаляем из массива цифр
              while (stackOperators[stackOperators.length - 1] !== "(") {
                stackDigits.push(operators[stackOperators.pop()] (stackDigits.pop(), stackDigits.pop()))
                }
              // удаляем )
              stackOperators.pop()
              } else {
              // Пока последний оператор в массиве с операторами по приоритету больше или равен оператору из цикла, производится операция с двумя последними цифрами (и удлание) в массиве цифр, а результат добавляется в массив цифр 
              while (priority[arr[i]] <= priority[stackOperators[stackOperators.length - 1]]) {
                stackDigits.push(operators[stackOperators.pop()] (stackDigits.pop(), stackDigits.pop()))
                }
              // Добавляем операторы в массив с операторами
              stackOperators.push(arr[i])
              }
      }
      // пока массив массив с операторами содержит невыполенные операции. Производится расчет цифр из 
      while (stackOperators.length > 0) {
        stackDigits.push(operators[stackOperators.pop()] (stackDigits.pop(), stackDigits.pop()))
        }
        // результат функции - возвращаем число из массива. Если получем Infinity (при деление на 0) выводим ошибку
        if (parseFloat(stackDigits) == "Infinity") {
            throw new Error ("TypeError: Division by zero.");
            } else {
              return parseFloat(stackDigits)
              }
    }


module.exports = {
    expressionCalculator
}