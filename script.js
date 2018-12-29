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
var scoreTable_div;
//var score_table;
//var score_table_body;

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
    scoreTable_div    = document.getElementById('score-table_div');
    //score_table       = document.getElementById('score_table');
    //score_table_body  = document.getElementById('score_table_body');

    //--------------------------------hot-keys---------------------------------
    //ебучие хоткеи не пашут как надо в chrome, хотя в firefox всё работает

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
//----------------------------------function_closures--------------------------
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
    var _verbs;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            _verbs = JSON.parse(this.responseText);
        } else {
            _verbs = JSON.parse('[["1","null","null","null","Could not load table of irregular verbs :("]]');
        }
    };
    xmlhttp.open("GET", "verbs100array.json", true);
    xmlhttp.send();

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
//----------------------------------typing_animation---------------------------
function typingAnimation (placeForTyping, text, typingSpeed) {
    function typeWriter(i) {
        console.log("typeWriter(" + i + ") : " + text.substring(0, i+1));
        if (i < (text.length)) {
            placeForTyping.innerHTML = text.substring(0, i+1) + span;
            setTimeout(function() {typeWriter(i + 1)}, typingSpeed);
        }
    }

    typeWriter(0);
    console.log("typingAnimation(" + placeForTyping.id + ", " + text + ", " + typingSpeed + ")");
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

    untypeWriter(0);
    console.log("untypingAnimation(" + placeForTyping.id + ", " + typingSpeed + ")");
}
//----------------------------------first_section------------------------------
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
    //setTimeout(function () {v1_input.focus()}, 700);
}
//--------------------------------second_section-------------------------------
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
    requestScoreTable();

    gameOver_p.innerHTML = "Well Played!";
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();
    
    v1_input.disabled           = true;
    v2_input.disabled           = true;
    v3_input.disabled           = true;
    submitVerbs_btn.disabled    = true;
    reset_btn.disabled          = true;
    giveUp_btn.disabled         = true;

    name_input.disabled         = false;
    submitName_btn.disabled     = false;
    backToIntro_btn.disabled    = false;

    scrollToGameOverSector();
    //setTimeout(function () {name_input.focus()}, 700);
}

function giveUp() {
    requestScoreTable();

    gameOver_p.innerHTML = "Game Over";
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();

    v1_input.disabled           = true;
    v2_input.disabled           = true;
    v3_input.disabled           = true;
    submitVerbs_btn.disabled    = true;
    reset_btn.disabled          = true;
    giveUp_btn.disabled         = true;

    name_input.disabled         = false;
    submitName_btn.disabled     = false;
    backToIntro_btn.disabled    = false;

    scrollToGameOverSector();
    //setTimeout(function () {name_input.focus()}, 700);
}
//---------------------------------third_section-------------------------------
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
//---------------------------------data_base-----------------------------------
function submitNameAndScore() {
    var queryParams_obj = {}, dbParams_json, xmlhttp;
    queryParams_obj = { "name":name_input.value.trim(), "score":score.get() };
    dbParams_json = JSON.stringify(queryParams_obj);
    console.log("dbParams_json = " + dbParams_json);
    xmlhttp = xmlhttp_();
    xmlhttp.open("POST", "json_score_tabl_db_post.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("dbParams_json=" + dbParams_json);
}

function requestScoreTable() {
    var xmlhttp;
    xmlhttp = xmlhttp_();
    xmlhttp.open("GET", "json_score_tabl_db_get.php", true);
    xmlhttp.send();
}

function xmlhttp_() {
    var resultQuery_obj;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log("readyState = " + this.readyState);
        console.log("status = " + this.status);
        if (this.readyState == 4 && this.status == 200) {
            console.log("responseText = " + this.responseText);
            resultQuery_obj = JSON.parse(this.responseText);
            scoreTable_div.innerHTML = buildScoreTable();
        } else if (this.readyState == 4 && this.status != 200) {
            scoreTable_div.innerHTML = "<p>Could not load table of recors :(</p>";
        }
    };
    return xmlhttp;

    function buildScoreTable() {
        var iterator;
        var rowNumScoreTable = 0;
        var names = [];
        var table = "<table id='score_table'>\
                    <thead>\
                        <tr>\
                            <th>#</th>\
                            <th>Name</th>\
                            <th>Score</th>\
                            <th>Date</th>\
                        </tr>\
                    </thead>\
                    <tbody id='score_table_body'>";
    
        for (iterator in resultQuery_obj) {
            console.log(names);
            console.log("resultQuery_obj[iterator].name = " + resultQuery_obj[iterator].name);
            if (names.find(checkDuplicateNames)) {continue;}
            table += "<tr>"
                    + "<td>" + ++rowNumScoreTable + "</td>"
                    + "<td>" + resultQuery_obj[iterator].name + "</td>"
                    + "<td>" + resultQuery_obj[iterator].score + "</td>"
                    + "<td>" + resultQuery_obj[iterator].date + "</td>"
                + "</tr>";
            names.push(resultQuery_obj[iterator].name);
        }
        return table;

        function checkDuplicateNames(name) {
            return name == resultQuery_obj[iterator].name;
        }
    }
}