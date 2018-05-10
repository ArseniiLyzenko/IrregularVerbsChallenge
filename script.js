/**
 * 
 */

function onLoad() {
    document.getElementById("v1_input").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit-verbs_btn").click();
            document.getElementById("v1_input").focus();
        }
    });

    document.getElementById("v2_input").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit-verbs_btn").click();
            document.getElementById("v1_input").focus();
        }
    });

    document.getElementById("v3_input").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit-verbs_btn").click();
            document.getElementById("v1_input").focus();
        }
    });

    document.getElementById("name_input").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit-name_input").click();
            document.getElementById("back-to-intro").focus();
        }
    });
}
//-----------------------------------------------------------------------------
var verb = (function (newVerb) {
    var _verb;
    return {
        get:function () {return _verb;},
        set:function (newVerb) { _verb = newVerb;}
    }
})();

var score = (function () {
    var _score = 0;
    return {
        get:function () {return _score},
        plusPlus:function () {_score++; return;}
    }   
})();

/*var verbNum = (function () { //change to verbsNum
    var _verbNum = 13;
    return {
        get:function () {return _verbNum;}
    }
})();

var newVerbNumOnly = (function () {
    var _newVerbNumOnly;
    return {
        get:function () {return _newVerbNumOnly;}
    }
})();*/

var verbs = (function () {
    var _verbs = JSON.parse('[["1","say","said","said","говорить"],\
                             ["2","make","made","made","делать/производить"],\
                             ["3","go","went","gone","идти"],\
                             ["4","take","took","taken","брать"],\
                             ["5","come","came","come","приходить"],\
                             ["6","see","saw","seen","видеть"],\
                             ["7","know","knew","known","знать"],\
                             ["8","get","got","got","получать"],\
                             ["9","give","gave","given","давать"],\
                             ["10","find","found","found","находить"],\
                             ["11","think","thought","thought","думать"],\
                             ["12","tell","told","told","сказать/рассказать"],\
                             ["13","become","became","become","становиться"]]');
    return {
        get:function () {return _verbs},
        length:function () {return _verbs.length;}
    }
})();
//СЛИТЬ ДВА ОБЪЕКТА
var newVerbsOnly = (function (verbID) {
    var _newVerbsOnly = verbs.get().slice();
    return {
        get:function () {return _newVerbsOnly},
        reSet:function () {_newVerbsOnly = verbs.get().slice();},
        length:function () {return _newVerbsOnly.length;},
        splice:function (verbID, param) {_newVerbsOnly.splice(verbID, param); return;},
        setNewVerb:function (verbID) {
            this.pickNewVerb(this.randNewVerbID());
            //document.getElementById("verb-id_p").innerHTML = "for_dev : " + verb.get()[0];
            console.log("picked_verb_id: " + verb.get()[0]);
            document.getElementById("verb-rus_p").innerHTML = verb.get()[4];
        },
        pickNewVerb:function (verbID) {
            var newVerb = newVerbsOnly.get();
        
            verb.set(newVerbsOnly.get()[verbID]);
            newVerbsOnly.splice(verbID, 1);
        },
        randNewVerbID:function () {
            return Math.floor(Math.random() * newVerbsOnly.length());
        }
    }   
})();
//-----------------------------------------------------------------------------
/*function setVerb(verbID) {
    pickVerb(verbID);
    //document.getElementById("verb-id_p").innerHTML = "for_dev : " + verb.get()[0];
    console.log("picked_verb_id: " + verb.get()[0]);
    document.getElementById("verb-rus_p").innerHTML = verb.get()[4];
}

function pickVerb(verbID) {
    verb.set(verbs.get()[verbID]);
}

function randVerbID() {
    return Math.floor(Math.random() * verbs.length());
}

function pickNewVerb(verbID) {
    var newVerb = newVerbsOnly.get();

    verb.set(newVerbsOnly.get()[verbID]);
    newVerbsOnly.splice(verbID, 1);
}

function randNewVerbID() {
    return Math.floor(Math.random() * newVerbsOnly.length());
}

function setNewVerb(verbID) {
    pickNewVerb(verbID);
    //document.getElementById("verb-id_p").innerHTML = "for_dev : " + verb.get()[0];
    console.log("picked_verb_id: " + verb.get()[0]);
    document.getElementById("verb-rus_p").innerHTML = verb.get()[4];
}*/
//-----------------------------------------------------------------------------
function bringItOn() {
    resetVerbInputs();
    //setNewVerb(newVerbsOnly.randNewVerbID());
    newVerbsOnly.setNewVerb();
    //verbs.setNewVerb();
    scrollToGameAreaSector();
}
//-----------------------------------------------------------------------------
function submitVerbs() {
    for (var i = 0; i < 3 ;i++) {
        if (verb.get()[i+1] != document.getElementById("verbs_form").elements[i].value) {
            giveUp();
            return;
        }
    }
    score.plusPlus();
    if (newVerbsOnly.length() == 0) {
        //go to sector 4
        document.getElementById("verb-rus_p").innerHTML = "Поздравляшки!"
        return;
    }
    newVerbsOnly.setNewVerb();
    resetVerbInputs();
}

function giveUp() {
    document.getElementById("score_p").innerHTML = score.get();
    newVerbsOnly.reSet();
    scrollToGameOverSector();
}

function resetVerbInputs() {
    document.getElementById("reset_btn").click();
}
//-----------------------------------------------------------------------------
function scrollToIntroSector() {
    document.getElementById('section-one_div').scrollIntoView({behavior: "smooth"});
}

function scrollToGameAreaSector(callback) {
    document.getElementById('section-two_div').scrollIntoView({behavior: "smooth"});
}

function scrollToGameOverSector() {
    document.getElementById('section-three_div').scrollIntoView({behavior: "smooth"});
}