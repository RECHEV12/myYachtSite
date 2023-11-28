let nowUser = 0;
let roundNum = 1;
let winner = "";

const f_list = [
    function calAces() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 1) {
                result += nowNumCal[i]
            }
        }
        return result;
    },

    function calTwos() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 2) {
                result += nowNumCal[i]
            }
        }
        return result;

    },

    function calThrees() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 3) {
                result += nowNumCal[i]
            }
        }
        return result;

    },

    function calFours() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 4) {
                result += nowNumCal[i]
            }
        }
        return result;

    },

    function calFives() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 5) {
                result += nowNumCal[i]
            }
        }
        return result;

    },

    function calSixes() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            if (nowNumCal[i] === 6) {
                result += nowNumCal[i]
            }
        }
        return result;

    },


    function calChoices() {
        let result = 0;

        for (let i = 0; i < nowNumCal.length; i++) {
            result += nowNumCal[i]
        }
        return result;

    },

    function calFOKA() {
        let result = 0;
        if (
            (
                nowNumCal[0] === nowNumCal[1] &&
                nowNumCal[2] === nowNumCal[3] &&
                nowNumCal[0] === nowNumCal[2]
            ) ||
            (
                nowNumCal[1] === nowNumCal[2] &&
                nowNumCal[3] === nowNumCal[4] &&
                nowNumCal[1] === nowNumCal[3]
            )
        ) {
            for (let i = 0; i < nowNumCal.length; i++) {
                result += nowNumCal[i]
            }

        }

        return result;

    },

    function calFullHouse() {

        let result = 0;

        if (
            ((nowNumCal[0] === nowNumCal[1]) && (nowNumCal[2] === nowNumCal[3] && nowNumCal[3] === nowNumCal[4])) ||
            ((nowNumCal[0] === nowNumCal[1] && nowNumCal[1] === nowNumCal[2]) && (nowNumCal[3] === nowNumCal[4]))
        ) {
            for (let i = 0; i < nowNumCal.length; i++) {
                result += nowNumCal[i]
            }

        }
        return result;

    },

    function calSSght() {
        let result = 0;

        const set = new Set(nowNumCal);
        const arr = Array.from(set);
        if (set.size >= 4) {
            if (arr[0] + 1 === arr[1] &&
                arr[1] + 1 === arr[2] &&
                arr[2] + 1 === arr[3]) {
                result = 15
            }

        }
        return result;

    },

    function calLSght() {
        let result = 0;

        const set = new Set(nowNumCal);
        const arr = Array.from(set);
        if (set.size === 5) {
            if (arr[0] + 1 === arr[1] &&
                arr[1] + 1 === arr[2] &&
                arr[2] + 1 === arr[3] &&
                arr[3] + 1 === arr[4]) {
                result = 30
            }

        }
        return result;

    },

    function calYacht() {
        let result = 0;
        const set = new Set(nowNumCal)
        if (set.size === 1) {
            result = 50
        }
        return result;

    },


]

function calSubTotal(num) {
    let result;

    result = `${num}/63`
    return result;

}

function calBonus(num) {
    let result = 0;
    if (num >= 63) {
        result = 35
    }
    return result;

}

function calTotal() {
    let result = 0;
    for (let i = 0; i < tableRow.length; i++) {
        let now = tableRow[i].children[nowUser];
        if (now.style.color === "black") {
            result += parseInt(now.textContent);
        }
    }
    console.log(`1차 ${result}`)
    result += calBonus(subTotalChk());
    console.log(calBonus(subTotalChk()))
    console.log(`${result}`)
    return result;

}


function turnChk() {
    if (gameTurn === "A") {
        nowUser = 1
    } else {
        nowUser = 2

    }

}

// tableRow[0].children[] 1 = A / 2 = B


function setNumToRow() {

    turnChk();

    for (let i = 0; i < f_list.length; i++) {
        let nowRow = tableRow[i].children[nowUser]

        if (nowRow.style.color !== "black") {
            nowRow.textContent = f_list[i]().toString();
            nowRow.style.color = "gray"

        }

    }

}

function changeUser() {

    turnChk();

    for (let i = 0; i < f_list.length; i++) {
        let nowRow = tableRow[i].children[nowUser]

        nowRow.addEventListener("click", () => {
            if (nowRow.style.color !== "black" && nowRow.textContent !== "") {
                nowRow.style.color = "black";
                nowRow.style.fontWeight = "bold";

                setCantEditNum();
                deleteGrayNum();
                returnDice();

                if (gameTurn === "A") {
                    gameTurn = "B";
                    showNowUser.textContent = `${secondName}'s turn`;
                } else if (gameTurn === "B") {
                    gameTurn = "A";
                    roundNum++;
                    showNowUser.textContent = `${firstName}'s turn`;
                    if (roundNum === 13) {
                        resultShow();
                    } else {
                        round.textContent = `Round ${roundNum}/12`;
                    }
                }
            }

            rollingChance = 3;
            chanceText.textContent = `chance : ${rollingChance}`;
            showAlert.textContent = "";


        })


    }

}

function resultShow() {
    if (roundNum === 13) {
        const userA_total = parseInt(cantEdit[2].children[1].textContent);
        const userB_total = parseInt(cantEdit[2].children[2].textContent);
        if (userA_total === userB_total) {
            for (let i = 0; i < imgList.length; i++) {
                imgList[i].style.display = "none";
                mainScene.textContent = "비겼습니다";
                return;
            }
        } else {
            const img = new Image();
            img.src = "images/crown.png";

            if (userA_total > userB_total) {


                winner = firstName;
                userAList.appendChild(img);

            } else {
                winner = secondName;
                userBList.appendChild(img);

            }
            mainScene.textContent = `${winner} 승리!`;
        }

    }
}

function setCantEditNum() {
    const cantEditVal = [];
    cantEditVal.push(calSubTotal(subTotalChk()));
    cantEditVal.push(calBonus(subTotalChk()));
    cantEditVal.push(calTotal());

    for (let i = 0; i < cantEdit.length; i++) {
        let nowRow = cantEdit[i].children[nowUser]
        nowRow.textContent = cantEditVal[i];
    }
}

function deleteGrayNum() {

    turnChk();

    for (let i = 0; i < f_list.length; i++) {
        let nowRow = tableRow[i].children[nowUser]
        if (nowRow.style.color === "gray") {
            nowRow.textContent = "";
        }

    }
}

function subTotalChk() {
    let nowSub = 0;

    turnChk();

    for (let i = 0; i < 6; i++) {
        let nowRow = tableRow[i].children[nowUser]
        if (nowRow.style.color === "black") {
            nowSub += parseInt(nowRow.textContent)
        }

    }
    return nowSub;

}

function returnDice() {
    let nowUserList

    if (gameTurn === "A") {
        nowUserList = userAList;

    } else {
        nowUserList = userBList;
    }

    for (let i = 0; i < nowUserList.children.length; i++) {
        let list = nowUserList.children[i];
        mainScene.append(list);
        i--;
    }

}


