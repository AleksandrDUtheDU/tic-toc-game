export const tictac = () => {
  const board = document.querySelector("#board");
  const party = document.querySelectorAll("[data-party]");

  const createArrayofNumbersFromOneToNum = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
  };

  let arrMoves = createArrayofNumbersFromOneToNum(9);
  let allFreeMoves = createArrayofNumbersFromOneToNum(9);
  let startGame = false;
  let currentParty = "circle";
  let aiParty = "cross";

  for (let i = 1; i <= 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.num = i;
    board.append(box);
  }

  const boxes = document.querySelectorAll("[data-num]");

  const aiSkynet = (num) => {
    allFreeMoves = arrMoves.filter((e) => Number.isInteger(e));

    if (allFreeMoves.length > 0) {
      if (currentParty == "cross") {
        aiParty = "circle";
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
      ];

      const restartGame = () => {
        if (window.confirm("Хотите начать игру заново?")) {
          window.location.reload();
        }
      };

      const findArr = (haystack, arr) => {
        return arr.filter((v) => haystack.includes(v));
      };

      const winArr = (paty) =>
        MM.map((item) => {
          const arrItem = item.filter((e) => arrMoves[e - 1] == paty);
          return arrItem;
        })
          .filter((e) => e.length == 3)
          .flat();

      const aiMove = (num) => {
        const node = document.querySelector(`[data-num='${num}']`);
        arrMoves[num - 1] = aiParty;
        node.classList.add(aiParty);
      };

      const currentMoves = MM.filter((e) => e.find((item) => item == parsed));

      const arrFreeBox = currentMoves.map((item) => {
        const arrItem = item.filter(
          (e) => arrMoves[e - 1] !== currentParty && arrMoves[e - 1] !== aiParty
        );
        return arrItem;
      });

      const arrFoCrit = (party) =>
        MM.map((item) => {
          const arrItem = item.filter((e) => arrMoves[e - 1] !== party);
          return arrItem;
        });

      const arrCrit = (party) =>
        arrFoCrit(party)
          .filter((e) => e.length == 1)
          .flat();

      const critPlayer = findArr(allFreeMoves, arrCrit(currentParty));
      const critAi = findArr(allFreeMoves, arrCrit(aiParty));

      const odd = arrFreeBox.filter((e) => e.find((el) => el % 2 !== 0)).flat();

      if (critAi.length > 0) {
        aiMove(critAi[0]);
        console.log("сработал крит AI");
      } else if (critPlayer.length > 0) {
        aiMove(critPlayer[0]);
        console.log("сработал крит Play");
      } else if (arrMoves[4] == 5) {
        aiMove(5);
        console.log("сработал 5");
      } else if (odd.length > 0) {
        aiMove(odd[0]);
        console.log("сработал нечет");
      } else if (allFreeMoves.length > 0) {
        aiMove(allFreeMoves[0]);
        console.log("свободные");
      }

      if (winArr(currentParty).length == 3) {
        setTimeout(function () {
          alert("Победил кожанный мешок!!");
          restartGame();
        }, 1);
      } else if (winArr(aiParty).length == 3) {
        setTimeout(function () {
          alert("Победил скайнет!!");
          restartGame();
        }, 1);
      }
    } else if (allFreeMoves.length == 0) {
      setTimeout(function () {
        alert("НИЧЬЯ!!");
        restartGame();
      }, 1);
    }
  };

  party.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (!startGame) {
        party.forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
        currentParty = e.target.dataset.party;
      }
    });
  });

  boxes.forEach((e) => {
    e.addEventListener("click", (e) => {
      startGame = true;
      if (e.target.classList.value == "box") {
        e.target.classList.add(currentParty);
        arrMoves[e.target.dataset.num - 1] = currentParty;
        aiSkynet(e.target.dataset.num);
      } else alert("ЗАНЯТО!!!");
    });
  });
};
