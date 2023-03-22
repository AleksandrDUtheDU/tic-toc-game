export const tictac = () => {
    const board = document.querySelector("#board");
    const party = document.querySelectorAll("[data-party]")
    const arrMoves = Array.from({ length: 9 }, (_, i) => i + 1)
    let allFreeMoves = []


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

        const currentMoves = MM.filter(e => e.find(item => item == parsed))

        const arrFreeBox = currentMoves.map(item => {
            const arrItem = item.filter(e => (arrMoves[e - 1] !== currentParty) && (arrMoves[e - 1] !== aiParty))
            return arrItem
        })

        const arrFoCrit = currentMoves.map(item => {
            const arrItem = item.filter(e => arrMoves[e - 1] !== currentParty)
            return arrItem
        })

        // const crit = arrFoCrit.filter(e => e.length == 1).join().split(',')
        const crit = arrFoCrit.filter(e => e.length == 1).flat()

        const five = arrFreeBox.filter(e => e.find(el => el == 5))
        const odd = arrFreeBox.filter(e => e.find(el => el % 2 !== 0))

        let arr1 = [1, 2, 3];
        let arr2 = [2, 3];

        const findOne = (haystack, arr) => {
            return arr.filter(v => haystack.includes(v));
        };

        console.log(crit)

        console.log(findOne(allFreeMoves, crit))


        console.log(arrFreeBox)

        console.log(allFreeMoves)

        if (Array.isArray(crit) && crit[0]) {
            const num = crit[0]
            const node = document.querySelector(`[data-num='${num}']`)
            arrMoves[num - 1] = aiParty
            node.classList.add(aiParty);
            console.log('сработал крит')
        } else if (five && arrMoves[4] == 5) {
            const node = document.querySelector(`[data-num='5']`)
            arrMoves[4] = aiParty
            node.classList.add(aiParty);
            console.log('сработал 5')
        } else if (arrMoves[4] && arrFreeBox) {
            const node = document.querySelector(`[data-num='${odd[0][0]}']`)
            arrMoves[odd[0][0] - 1] = aiParty
            node.classList.add(aiParty);
            console.log('сработал нечет')
            console.log(odd)
        }

        allFreeMoves = arrMoves.filter(e => Number.isInteger(e))

    }

    party.forEach(item => {
        item.addEventListener("click", (e) => {
            if (!startGame) {
                party.forEach(el => el.classList.remove("active"))
                e.target.classList.add("active");
                currentParty = e.target.dataset.party
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
            } else (
                alert('ЗАНЯТО!!!')
            )
        });
    })

}


