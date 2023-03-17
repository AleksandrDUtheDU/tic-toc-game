export const tictac = () => {
    const board = document.querySelector("#board");
    const party = document.querySelectorAll("[data-party]")
    const arrMoves = []
    const obj = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
    }
    const arrMovesAI = []

    let startGame = false

    let currentParty = "circle"
    let aiParty = "cross"



    for (let i = 1; i <= 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.num = i;
        board.append(box);
    }

    const boxes = document.querySelectorAll('[data-num]')
    // const boxes = document.querySelectorAll(`[data-num-${}]`)

    const aiSkynet = (num) => {
        if (currentParty == "cross") {
            aiParty = 'circle'
        }
        const parsed = parseInt(num);

        const MM = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ]

        const currentMoves = MM.filter(e => e.find(item => item == parsed)) //
        console.log(currentMoves)

        const arrFreeBox = currentMoves.map(item => {
            const arrItem = item.filter(e => arrMoves[e - 1] !== (currentParty || aiParty))
            return arrItem
        })

        // for (let i = 0; i < arrFreeBox.length; i++) {
        //     // code
        //     if (arrFreeBox[i].length == 1) {
        //         const node = document.querySelector(`[data-num='${arrFreeBox[i][0]}']`)
        //         node.classList.add(aiParty);
        //         console.log(node)
        //         break;
        //     } else {
        //         const node = document.querySelector(`[data-num='${arrFreeBox[i][0]}']`)
        //         node.classList.add(aiParty);
        //         break;
        //     }
        // }

        // if ()

        const crit = arrFreeBox.filter(e => e.length == 1).join()
        const five = arrFreeBox.filter(e => e.find(el => el == 5))
        const odd = arrFreeBox.filter(e => e.find(el => el % 2 !== 0))


        console.log(crit)
        console.log(five)
        console.log(odd)


        if (crit) {
            const num = crit[0][0]
            const node = document.querySelector(`[data-num='${num}']`)
            node.classList.add(aiParty);
        } else if (five && !arrMoves[4]) {
            const node = document.querySelector(`[data-num='5']`)
            node.classList.add(aiParty);
        } else if (arrMoves[4]) {
            const node = document.querySelector(`[data-num='${odd[0][0]}']`)
            node.classList.add(aiParty);

            // arrFreeBox[0][0]
        }


        // arrFreeBox.forEach(e => {
        //     if (e.length == 1) {
        //         const node = document.querySelector(`[data-num='${e[0]}']`)
        //         node.classList.add(aiParty);
        //         console.log(node)
        //         console.log(e[0])

        //         // .classList.add(aiParty);
        //         // arrMoves[e[0] - 1] = aiParty
        //     } else {
        //         console.log("биба")

        //     }
        // })

        // arr.forEach()

        console.log(arrFreeBox)
        console.log(aiParty)
    }

    party.forEach(item => {
        item.addEventListener("click", (e) => {
            if (!startGame) {
                party.forEach(el => el.classList.remove("active"))
                e.target.classList.add("active");
                currentParty = e.target.dataset.party
                console.log(currentParty)
            }
        });
    })


    boxes.forEach(e => {
        e.addEventListener("click", (e) => {
            startGame = true
            if (e.target.classList.value == 'box') {
                e.target.classList.add(currentParty);
                arrMoves[e.target.dataset.num - 1] = currentParty
                aiSkynet(e.target.dataset.num)
                console.log(arrMoves)
            } else (
                alert('ЗАНЯТО!!!')
            )
        });
    })

}


