let obj = {
    player1 : [1,2,3,4],
    player2 : [1,4]
}

let res = {
    player1 : 0,
    player2 : 0
}


let search = [2,4,10,1,1]
search.forEach(value => {
    for (let key in obj) {
        obj[key].forEach(nilai => {
            if (nilai == value) {
                res[key] += 1
            }
        })
    }
})
console.log(res)
