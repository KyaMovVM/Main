function log(value) {
    console.log(value)
}

log('1')

setTimeout(() => {
    log('setTimeout 1')
    Promise.resolve().then(() => {
        log('promise setTimeout')
    })
}, 0)

setTimeout(() => {
    log('setTimeout 2')
}, 0)

queueMicrotask(() => {
    log('queueMicrotask')
})

Promise.resolve().then(() => {
    log('promise 1')
})

Promise.resolve().then(() => {
    log('promise 2')
})

log('4')

//