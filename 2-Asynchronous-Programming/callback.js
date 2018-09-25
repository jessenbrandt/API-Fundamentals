// //function callbackFunction() {
//     for (let i = 0; i < 100; i++) {
//         console.log(i);
//     }

//     const data = {
//         name: 'Ralf Machio',
//         age: 66,
//         occupation: 'kickboxing',
//     }
//     return data;
// }
// function showGreeting(dataFromFunction) {
//     return "hello " + dataFromFunction.name + ", I hear you're the greatest?!"
// }

// console.log(
//     showGreeting(callbackFunction())
// )


// Promises

/*
The Promise object represents the eventual completin (or failure) of an asynchronous operation,
and its resulting value.
*/

//Boolean declaration
var amIGood = true;

var iCanHasGift = new Promise(
    function (resolve, reject) {
        if (amIGood) {
            let gift = {
                brand: 'HasMattelbro',
                item: 'Turbo-Man action figure'
            };
            resolve(gift);
        } else {
            let naughty = "You've made Santa's naughty list; enjoy your coal!";
            reject(naughty);
        }
    }
);

var checkTwice = function () {
    iCanHasGift
    .then(function (fulfilled) {
        //nice list = gift;
        console.log(fulfilled);
    })
    .catch(function (error) {
        //naughty list = coal
        console.log(error);
    });
}

checkTwice();

var playDate = function (gift) {
    return new Promise(
        function (resolve, reject) {
            var message = "Salutations fellow child I enjoy interactin with! I notice you received a posable plastic Batman figurine during the Yultide season. what do you think of my new " + gift.brand + '?';

            resolve(message);
        }
    );
};

var checkTwice = function () {
    console.log('before Christmas');
    iCanHasGift
    .then(playDate)
    .then(function (fulfilled) {
        console.log(fulfilled);
    })
    .catch(function (error) {
        console.log(error)
    });
    console.log('after opening gifts');
}

checkTwice()


var playDate = function (gift) {
    return new Promise(
        function (resolve, reject) {
            var message = "Salutations fellow cHild I enjoy interacting with! I notice you received a posable plastic Batman figurine during the Yultide season. What do you think of my new " + gift.brand + '' + gift.item + '?';

            return Promise.resolve(message);
        }
    );
};

var checkTwice = function () {
    iCanHasGift
    .then(playDate)
    .then(function (fulfilled) {
        console.log(fulfilled);
    })
    .catch(function (error) {
        console.log(error)
    });
};

checkTwice()