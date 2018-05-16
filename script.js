"use strict";
/**
 * 
 */

const span = '<span aria-hidden="true"></span>';
// how to make constant-global variables and declare them after page loading?!?!?
var bringItOn_btn;
var verbs_form;
var rusVerb_p;
var v1_input;
var v2_input;
var v3_input;
var submitVerbs_btn;
var reset_btn;
var giveUp_btn;
var gameOver_p;
var score_p;
var name_input;
var submitName_btn;
var backToIntro_btn;
var sectionOne_div;
var sectionTwo_div;
var sectionThree_div;

function onLoad() {

    bringItOn_btn     = document.getElementById("bring-it-on_btn");
    verbs_form        = document.getElementById("verbs_form");
    rusVerb_p         = document.getElementById("verb-rus_p");
    v1_input          = document.getElementById("v1_input");
    v2_input          = document.getElementById("v2_input");
    v3_input          = document.getElementById("v3_input");
    submitVerbs_btn   = document.getElementById("submit-verbs_btn");
    reset_btn         = document.getElementById("reset_btn");
    giveUp_btn        = document.getElementById("give-up_btn");
    gameOver_p        = document.getElementById("game-over_p");
    score_p           = document.getElementById("score_p");
    name_input        = document.getElementById("name_input");
    submitName_btn    = document.getElementById("submit-name_btn");
    backToIntro_btn   = document.getElementById("back-to-intro_btn");
    sectionOne_div    = document.getElementById('section-one_div');
    sectionTwo_div    = document.getElementById('section-two_div');
    sectionThree_div  = document.getElementById('section-three_div');

    //ебучие хоткеи не пашут как надо, хотя в фаерфоксе всё работает

    v1_input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            v1_input.focus();
            submitVerbs_btn.click();
        }
    });

    v2_input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            v1_input.focus();
            submitVerbs_btn.click();
        }
    });

    v3_input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            v1_input.focus();
            submitVerbs_btn.click();
        }
    });

    name_input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            submitName_btn.click();
        }
    });
}
//-----------------------------------------------------------------------------
var verb = (function (newVerb) {
    var _verb;
    return {
        get:function () {return _verb;},
        set:function (newVerb) { _verb = newVerb;}
    };
})();

var score = (function () {
    var _score = 0;
    return {
        get:function () {return _score;},
        plusPlus:function () {_score++; return;},
        reset:function () {_score = 0;}
    };
})();

var verbs = (function () {
    var _verbs = JSON.parse('[["1","say","said","said","говорить"],\
                             ["2","make","made","made","делать/производить"],\
                             ["3","go","went","gone","идти"  ]]');
    return {
        get:function () {return _verbs;},
        length:function () {return _verbs.length;}
    };
})();

var newVerbsOnly = (function (verbID) {
    var _newVerbsOnly = verbs.get().slice();
    return {
        get:function () {return _newVerbsOnly;},
        reSet:function () {_newVerbsOnly = verbs.get().slice(); console.log("newVerbsOnly.reSet();")},
        length:function () {return _newVerbsOnly.length;},
        splice:function (verbID, param) {_newVerbsOnly.splice(verbID, param); return;},
        setVerb:function (verbID) {
            this.pickVerb(this.randVerbID());
            console.log("picked_verb_id: " + verb.get()[0]);
            //rusVerb_p.innerHTML = verb.get()[4];
            setTimeout(function() {
                typingAnimation(rusVerb_p, verb.get()[4], 100);},
                (rusVerb_p.innerHTML.length - span.length) * 100
            );
            
        },
        pickVerb:function (verbID) {
            var newVerb = newVerbsOnly.get();
        
            verb.set(newVerbsOnly.get()[verbID]);
            newVerbsOnly.splice(verbID, 1);
        },
        randVerbID:function () {
            return Math.floor(Math.random() * newVerbsOnly.length());
        }
    };
})();
//-----------------------------------------------------------------------------
function typingAnimation (placeForTyping, text, typingSpeed) {
    function typeWriter(i) {
        console.log("typeWriter(" + i + ") : " + text.substring(0, i+1));
        if (i < (text.length)) {
            placeForTyping.innerHTML = text.substring(0, i+1) + span;
            setTimeout(function() {typeWriter(i + 1)}, typingSpeed);
        }
    }

    typeWriter(0);
    console.log("typingAnimation(" + placeForTyping.id + ", " + text + ", "+typingSpeed + ")");
}

function untypingAnimation (placeForTyping, typingSpeed) {
    function untypeWriter() {
        var text = placeForTyping.innerHTML.substring(0, placeForTyping.innerHTML.length - span.length - 1)
        console.log("untypeWriter(): " + text);
        if (span.length < (placeForTyping.innerHTML.length)) {
            placeForTyping.innerHTML = text + span;
            setTimeout(function () {untypeWriter()}, typingSpeed);
        }
    }

    //var textLength = placeForTyping.innerHTML.length;
    untypeWriter(0);
    console.log("untypingAnimation(" + placeForTyping.id +", "+typingSpeed + ")");
}
//-----------------------------------------------------------------------------
function bringItOn() {

    bringItOn_btn.disabled      = true;

    v1_input.disabled           = false;
    v2_input.disabled           = false;
    v3_input.disabled           = false;
    submitVerbs_btn.disabled    = false;
    reset_btn.disabled          = false;
    giveUp_btn.disabled         = false;

    resetVerbInputs();
    newVerbsOnly.reSet();
    if (rusVerb_p.innerHTML == span) {
        setTimeout(function (){newVerbsOnly.setVerb()}, 1000);
    } else {
        setTimeout(function (){untypingAnimation(rusVerb_p, 70);}, 2000);
        setTimeout(function (){newVerbsOnly.setVerb()}, 2000);
    }
    scrollToGameAreaSector();
    setTimeout(function () {v1_input.focus()}, 700);
}
//-----------------------------------------------------------------------------
function submitVerbs() {
    
    for (var i = 0; i < 3 ;i++) {

        if (verbs_form.elements[i].validity.valueMissing) {
            alert("value Missing");
            return;
        }

        if (verbs_form.elements[i].validity.patternMismatch) {
            alert("pattern Mismatch");
            return;
        }
    }

    for (var i = 0; i < 3 ;i++) {

        if (verb.get()[i+1] != verbs_form.elements[i].value) {
            giveUp();
            return;
        }
        
    }
    score.plusPlus();
    if (newVerbsOnly.length() == 0) {
        //go to sector 4
        win();
        return;
    }
    untypingAnimation(rusVerb_p, 70);
    newVerbsOnly.setVerb();
    resetVerbInputs();
}

function win() {
    gameOver_p.innerHTML = "Поздравляшки!";
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();
    scrollToGameOverSector();
    setTimeout(function () {name_input.focus()}, 700);
    
    v1_input.disabled           = true;
    v2_input.disabled           = true;
    v3_input.disabled           = true;
    submitVerbs_btn.disabled    = true;
    reset_btn.disabled          = true;
    giveUp_btn.disabled         = true;

    name_input.disabled         = false;
    submitName_btn.disabled     = false;
    backToIntro_btn.disabled    = false;
}

function giveUp() {
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();
    scrollToGameOverSector();
    setTimeout(function () {name_input.focus()}, 700);

    v1_input.disabled           = true;
    v2_input.disabled           = true;
    v3_input.disabled           = true;
    submitVerbs_btn.disabled    = true;
    reset_btn.disabled          = true;
    giveUp_btn.disabled         = true;

    name_input.disabled         = false;
    submitName_btn.disabled     = false;
    backToIntro_btn.disabled    = false;
}
//-----------------------------------------------------------------------------
function backToIntro() {
    score.reset();
    scrollToIntroSector();

    bringItOn_btn.disabled      = false;

    name_input.disabled         = true;
    submitName_btn.disabled     = true;
    backToIntro_btn.disabled    = true;
}
//-----------------------------------------------------------------------------
function resetVerbInputs() {
    reset_btn.click();
}
//-----------------------------------------------------------------------------
function scrollToIntroSector(callback) {
    console.log("scrollToIntroSector()");
    sectionOne_div.scrollIntoView({behavior: "smooth"});
}

function scrollToGameAreaSector(callback) {
    console.log("scrollToGameAreaSector()");
    sectionTwo_div.scrollIntoView({behavior: "smooth"});
}

function scrollToGameOverSector(callback) {
    console.log("scrollToGameOverSector()");
    sectionThree_div.scrollIntoView({behavior: "smooth"});
}