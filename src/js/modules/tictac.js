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

    const boxes = document.querySelectorAll("[data-num]")

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
        console.log(currentMoves)

        const fafafa = currentMoves.map(item => {
            item.filter(e => arrMoves[e - 1] !== currentParty)
        })

        let dfsdf1 = currentMoves[0].filter(e => arrMoves[e - 1] !== currentParty)
        let dfsdf2 = currentMoves[1].filter(e => arrMoves[e - 1] !== currentParty)
        let dfsdf3 = currentMoves[2].filter(e => arrMoves[e - 1] !== currentParty)



        console.log(fafafa)
        console.log(dfsdf1, dfsdf2, dfsdf3)

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


