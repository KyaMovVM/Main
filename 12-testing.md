## 12 Тестирование

Пирамида

E2E
Integration
Screenshots
Unit

Jest - Unit tests
React-testing-library (react-router-dom + redux)
WebdriverIO (cypress, puppeteer, hermione...)
Storybook + Chromatic

#### Функциональное
Модульное
Интеграционное
End-2-end (e2e)

#### Нефункциональное

### Unit

``` ts
conts square = (number) => {
  if(number === 1){
    return 1;
  }
  return Math.pow(number, 2)
}

const valodateValue = (value) => {
  if(value < 0 || value > 100){
    return false;
  }
  return true;
}

const mapArrToString = (arr) => {
  return arr
    .filter(item => Number.isInteger(item))
    .map(String);
}

class HTMLParser {
  method1(){
    // ...
  }

  method2(){
    // ...
  }

  method3(){
    // ...
  }
}
```

### Integration Tests
Тесты модулей в связке, которые проверяют взаимодействие нескольких
компонентов и функций.  В этом разделе описывается, как устроены
интеграционные тесты и какие именно функции они проверяют.

**Функции, которые участвуют в интеграционных тестах**
* `square()` – проверяет корректность вычисления квадрата числа.
* `convertDate()` – преобразует строку‑дата в объект `Date` и
  проверяет правильность формата.
* `validate()` – валидирует входные данные (число должно быть в
  диапазоне 0–100).

**Пример JSX‑структуры**
```tsx
<Component>
  <OtherComponent id={1} />
  <OtherComponent id={2} />
</Component>
```
В этом примере родительский компонент `Component` рендерит два
дочерних `OtherComponent`.  Интеграционные тесты проверяют, что
данные, передаваемые родителем, корректно передаются и обрабатываются
дочерними компонентами.

**Разница между unit‑ и integration‑тестами**
* **Unit‑тесты** проверяют отдельные функции или методы в изоляции.
* **Интеграционные тесты** проверяют взаимодействие между несколькими
  модулями/компонентами, гарантируя, что они работают совместно.
  Это важно для обнаружения ошибок, которые не видны в unit‑тестах.

### E2E
Важный функционал. Нажатия и тд.

Квадрат тестирования

1 1.1
0 1

``` ts
const validateValue = (value) => {
  if(value < 0 || value > 100) {
    return false;
  }
  return true;
}

```

Установка Jest
``` js
npm init
npm i -D jest
```
src/validateValue/validateValue.js
``` js
const validateValue = (value) => {
  if(value < 0 || value > 100) {
    return false;
  }
  return truel
}

module.exports = validateValue;
```

validateValue.test.js

``` js
const validateValue = require('./validateValue');

test('Валидное значение, ' () => {
  expect(validateValue(50)).toBe(true);
})

npm run test validateValue.test.js

describe('validateValue', () => {
    test('Валидное значение, ' () => {
      expect(validateValue(50)).toBe(true);
    })

    test('значение2, ' () => {
      expect(validateValue(-1)).toBe(false);
    })

    test('значение4, ' () => {
      expect(validateValue(101)).toBe(false);
    })

    test('значение5, ' () => {
      expect(validateValue(0)).toBe(true);
    })

    test('значение6, ' () => {
      expect(validateValue(100)).toBe(true);
    })
})
```
