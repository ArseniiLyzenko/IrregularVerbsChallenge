function showIntro() {
    document.getElementById('section-one').scrollIntoView({behavior: "smooth"});
}

function showGameArea() {
    document.getElementById('section-two').scrollIntoView({behavior: "smooth"});
}

function showOverlay() {
    document.getElementById('section-three').scrollIntoView({behavior: "smooth"});
}

var verb = [];

function init() {
    verb = verbs[Math.floor(Math.random() * 13)];
    document.getElementById("verb-id").innerHTML = verb[0];
    document.getElementById("verb-rus").innerHTML = verb[4];
}

function game() {
    var verbsForm = document.getElementById("verbs-form");
    var verbs = [];
    for (var i = 0; i < 3 ;i++) {
        //verb[] = verbsForm.elements[i].value;
    }
}

var verbs = JSON.parse('[["1","say","said","said","говорить"],["2","make","made","made","делать"],["3","go","went","gone","идти"],["4","take","took","taken","брать"],["5","come","came","come","приходить"],["6","see","saw","seen","видеть"],["7","know","knew","known","знать"],["8","get","got","got","получать"],["9","give","gave","given","давать"],["10","find","found","found","находить"],["11","think","thought","thought","думать"],["12","tell","told","told","сказать"],["13","become","became","become","становиться"]]');