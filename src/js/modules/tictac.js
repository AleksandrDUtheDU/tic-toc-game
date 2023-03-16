export const tictac = () => {
    const board = document.querySelector("#board");
    const party = document.querySelectorAll("[data-party]")

    let currentParty = "circle"

    for (let i = 1; i <= 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.num = i;

        board.append(box);
    }

    const boxes = document.querySelectorAll("[data-num]")

    boxes.forEach(e => {
        e.onclick = function (el) {
            el.target.classList.add(currentParty);
            console.log(el.target.dataset.num)
        };
    })


    // party.onclick = function (e) {
    //     currentParty = e.target.dataset
    //     console.log(currentParty)

    // }

    party.forEach(e => {
        e.onclick = function (el) {
            currentParty = el.target.dataset.party
            console.log(currentParty)
        };
    })

    const addChecked = () => {

    }


    // console.log(party)
    // console.log(currentParty)

}


