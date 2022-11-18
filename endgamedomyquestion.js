const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore')
const mostRecentScore1 = localStorage.getItem('mostRecentScore1');


const score1 = JSON.parse(localStorage.getItem("score1")) || [];

const MAX_SCORE1 = 5
// console.log(score1)
// const score = localStorage.setItem('score', []);
// We need to convert this array into a JSON to make it useful
// const score = localStorage.setItem('score', JSON.stringify([]))
// console.log(localStorage.getItem('score'))
// You need to convert this to array using JSON.parse
// console.log(JSON.parse(localStorage.getItem('score')));
finalScore.innerText = mostRecentScore1;



username.addEventListener('keyup', () => {
    // console.log(username.value)
    saveScoreBtn.disabled = !username.value
});

saveMyScore = e => {
    console.log("clicked")
    e.preventDefault()

    const score = {
        // score: mostRecentScore1,
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    score1.push(score);
    score1.sort((a, b) => b.score - a.score)
    score1.splice(5);

    localStorage.setItem('score1', JSON.stringify(score1));
    window.location.assign("index.html");
    console.log(score1);
};
