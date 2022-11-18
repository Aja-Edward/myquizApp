const highScoreList = document.getElementById('highscorelist')
const score1 = JSON.parse(localStorage.getItem("score1")) || [];



// console.log(
//     score1.map(score => {
//         // console.log(score);
//         // console.log(`${score.name} - ${score.score}`);
//         // console.log(`<li class="high-score" >${score.name} - ${score.score}</li>`);
//         return `<li class="high-score" >${score.name} - ${score.score}</li>`;
//     })
//         .join("")
// );

highScoreList.innerHTML = score1
    .map(score => {
        return `<li class="high-score" >${score.name} ---------${score.score}</li>`;
    })
    .join("");


