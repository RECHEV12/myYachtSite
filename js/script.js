let randNum = [];
let nowNumCal = [];
let nowLockNum = [];
let rollingChance = 3;
let firstName = "";
let secondName = "";
let gameTurn = "A";

const chanceText = document.querySelector(".chance");
const mainScene = document.querySelector(".diceMain");
let imgList = document.querySelectorAll(".diceMain>img");
const lockDiceList = document.querySelectorAll(".user_lockDice");
const tableRow = document.querySelectorAll(".canCal");
const cantEdit = document.querySelectorAll(".cantEdit");
const round = document.querySelector(".round");
const showAlert = document.querySelector(".showAlert");
const confirmBtn = document.querySelector(".confirmBtn");
const inputName = document.querySelector(".inputName");
const userA_name = document.querySelector(".userA_name");
const userB_name = document.querySelector(".userB_name");
const input = document.querySelectorAll(".inputName>div>input");
const scoreName = document.querySelectorAll(".scoreName");
const showNowUser = document.querySelector(".showNowUser");
const userAList = lockDiceList[0];
const userBList = lockDiceList[1];

imgList.forEach(el => {
    el.addEventListener("click", function () {
        if (rollingChance !== 3) {
            if (el.parentNode === mainScene) {
                if (gameTurn === "A") {
                    userAList.appendChild(el);
                } else {
                    userBList.appendChild(el);
                }
            } else {
                mainScene.appendChild(el);
            }

        }

    })
})

function rollingDice() {
    changeUser()
    if (rollingChance === 0) {
        showAlert.textContent = "굴릴 횟수가 전부 차감되었습니다.";
        return;
    } else {

    }
    //횟수 차감
    rollingChance--;
    chanceText.textContent = `chance : ${rollingChance}`;

// 랜덤 숫자 배열 털기
    randNum = [];
    nowNumCal = [];
    imgList = document.querySelectorAll(".diceMain>img");
    // 랜덤 숫자 담기
    for (let i = 0; i < imgList.length; i++) {
        let rand = Math.floor(Math.random() * 6) + 1;
        randNum.push(rand);
        nowNumCal.push(rand);
    }

    // 배열에 맞춰 담기
    for (let i = 0; i < randNum.length; i++) {
        imgList[i].src = `images/${randNum[i]}.jpg`;

    }

    // 잠궈둔 숫자 가져오기
    if (nowNumCal.length < 5) {
        let nowUser

        if (gameTurn === "A") {
            nowUser = userAList;

        } else {
            nowUser = userBList;
        }

        for (let i = 0; i < nowUser.children.length; i++) {
            let listNum = parseInt(nowUser.children[i].src.substring(nowUser.children[i].src.length - 5, nowUser.children[i].src.length - 4));
            nowNumCal.push(listNum);

        }
    }

    // 배열 정렬
    nowNumCal.sort(function (a, b) {
        return a - b
    });

    // 값을 담아서 보여주기
    setNumToRow();

    // confirmNum();


}

confirmBtn.addEventListener("click", () => {
    if (input[0].value === "") {
        firstName = "USER A"
    } else {
        firstName = input[0].value;

    }
    if (input[1].value === "") {
        secondName = "USER B"
    } else {
        secondName = input[1].value;
    }
    userA_name.textContent = firstName;
    scoreName[0].textContent = firstName;
    userB_name.textContent = secondName;
    scoreName[1].textContent = secondName;
    showNowUser.textContent = `${firstName}'s turn`;
    inputName.style.display = "none";
})


