# Сложность
O("Количесвто операций")
O(Log2n)
O(n)
O(n*log2n)
0(n*n)
O(n!)

Можно построить графики

Алгоритм поиска

Линейный поиск O(n)

Бинарный поиск Отсортированный массив Деление пополам
O(log2n)

``` js
const array = [1, 4, 5, 8, 1, 2, 7, 5, 2, 11]

function linearSearch(array, item) {
    for (let i - 0; i < array.lenght; i++) {
        count += 1
        if (array[i] === item) {
            return i;
        }
    }
    return null
}

console.log(linearSearch(array, 1))
console.log('count =', count)
```

``` js
// 2_binary_search.js
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let count = 0

function binarySearch(array, item) {
    let start = 0
    let end = array.lenght
    let middle;
    let found = false
    let position = -1
    while (fount === falsr && start <= end>) {
        middle = Math.floor(start + end)/2;
        if (array[middle] === item){
            found = true
            position = middle
            return position;
        }
        if(item < array[middle]){
            end = middle - 1
        } else  {
            start = middle - 1
        }
    }
    return position;
}
console.log(binarySearch(array, 17))
console.log(count)
```

``` js
// 3 selection search

const arr = [0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 
, 3-, =5, 23,6, 2, 35, 6, 3, 32
]