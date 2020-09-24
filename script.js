var html_result, html_score;

var score_player = 0, score_cpu = 0;

const figures = {
    rock: 0,
    paper: 1,
    scissors: 2
}

window.addEventListener("load", function() {
    html_result = document.getElementById("move-result");
    html_score = document.getElementById("score");

    updateScoreHTML();
    setResultHTML(document.title);

    var html_buttons = document.getElementsByClassName("rps-button");

    for (var i = 0; i < html_buttons.length; i ++) {
        html_buttons[i].addEventListener("click", function(event) {
            var figure_player = figures[event.currentTarget.getAttribute("figure")];
            var figure_cpu = randint(0, 2);

            if (figure_player == figure_cpu) { // Draw
                setResultHTML("➖ Draw - Nobody scores");
            }
            else if ( // Win combinations
                figure_player == figures.rock && figure_cpu == figures.scissors ||
                figure_player == figures.paper && figure_cpu == figures.rock ||
                figure_player == figures.scissors && figure_cpu == figures.paper
            ) { // Win
                score_player ++;
                updateScoreHTML();
                setResultHTML("✔️ Won - Score +1");
            }
            else { // Lose
                score_cpu ++;
                updateScoreHTML();
                setResultHTML("❌ Lost - Enemy Score +1");
            }
        });
    }

    if (window.location.hash == "#alternative") {
        document.body.classList.add("alternative");
    }
});

function updateScoreHTML() {
    html_score.innerHTML = score_player + " - " + score_cpu;
}
function setResultHTML(text) {
    html_result.innerHTML = text;

    window.requestAnimationFrame(function() {
        html_result.style.animation = "";
        window.requestAnimationFrame(function() {
            html_result.style.animation = "highlight 0.35s ease";
        });
    });
}


function randint(min, max) { // Thanks to W3Schools
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}