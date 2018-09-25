let promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        if (false) {
            resolve("success");
        } else {
            reject('failure :(');
        }
    }, 3000);
})

promise
    .then(newResult => {
        return newResult + ' we are returning from our first .then'
    })
    .then(result => {
        console.log(result);
    })

    .catch(err => {
        console.log(err);
    })

console.log('this code is after our promise and .then.');

