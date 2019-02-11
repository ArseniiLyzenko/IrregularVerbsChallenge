"use strict";
/**
 *
 */

const span = '<span id="carriage">&nbsp;</span>'; // The &nbsp (non-breaking space or just whitespace) need to fix unexpected behavior of span tag
const couldNotLoad = '[["1","null","null","null","Could not load the table of irregular verbs :("]]';
const irregularVerbsJsonFile = "verbs100array.json";
const gameOver = "Game Over";
const wellPlayed = "Well Played!";

const typingSpeed = 100;
const untypingSpeed = 70;

// how to make constant-global variables and declare them after page loading?!
var bringItOn_btn;
var verbs_form;
var rusVerb_div;
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
var sectionOne_section;
var sectionTwo_section;
var sectionThree_section;
//var scoreZeroPopup_span;
var scoreTable_div;
//var score_table;
//var score_table_body;

function onLoad() {

    bringItOn_btn         = document.getElementById("bring-it-on_btn");
    verbs_form            = document.getElementById("verbs_form");
    rusVerb_div           = document.getElementById("rus-verb_div");
    rusVerb_p             = document.getElementById("verb-rus_p");
    v1_input              = document.getElementById("v1_input");
    v2_input              = document.getElementById("v2_input");
    v3_input              = document.getElementById("v3_input");
    submitVerbs_btn       = document.getElementById("submit-verbs_btn");
    reset_btn             = document.getElementById("reset_btn");
    giveUp_btn            = document.getElementById("give-up_btn");
    gameOver_p            = document.getElementById("game-over_p");
    score_p               = document.getElementById("score_p");
    name_input            = document.getElementById("name_input");
    submitName_btn        = document.getElementById("submit-name_btn");
    backToIntro_btn       = document.getElementById("back-to-intro_btn");
    sectionOne_section    = document.getElementById('section-one_section');
    sectionTwo_section    = document.getElementById('section-two_section');
    sectionThree_section  = document.getElementById('section-three_section');
    //scoreZeroPopup_span   = document.getElementById("score-zero-popup_span");
    scoreTable_div        = document.getElementById('score-table_div');
    //score_table       = document.getElementById('score_table');
    //score_table_body  = document.getElementById('score_table_body');

    //=============================hot-keys====================================
    //ебучие хоткеи не пашут как надо в chrome, хотя в firefox всё работает

    // v1_input.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode === 13) {
    //         v1_input.focus();
    //         submitVerbs_btn.click();
    //     }
    // });

    // v2_input.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode === 13) {
    //         v1_input.focus();
    //         submitVerbs_btn.click();
    //     }
    // });

    // v3_input.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode === 13) {
    //         v1_input.focus();
    //         submitVerbs_btn.click();
    //     }
    // });

    // name_input.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode === 13) {
    //         submitName_btn.click();
    //     }
    // });
}
//================================function_closures============================
var verb = (function (newVerb) {
    var _verb;
    return {
        get: function () {return _verb;},
        set: function (newVerb) { _verb = newVerb;}
    };
})();

var score = (function () {
    var _score = 0;
    return {
        get: function () {return _score;},
        plusPlus: function () {_score++; return;},
        reset: function () {_score = 0;}
    };
})();

var verbs = (function () {
    var _verbs;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            _verbs = JSON.parse(this.responseText);
            /*_verbs = JSON.parse('[["1","say","said","said","говорить"],\
                                  ["2","make","made","made","делать/производить"],\
                                  ["3","go","went","gone","идти"  ]]');*/
        } else {
            _verbs = JSON.parse(couldNotLoad);
            /*_verbs = JSON.parse('[["1","say","said","said","говорить"],\
                                  ["2","make","made","made","делать/производить"],\
                                  ["3","go","went","gone","идти"  ]]');*/
        }
    };

    xmlhttp.open("GET", irregularVerbsJsonFile, true);
    xmlhttp.send();

    return {
        get: function () {return _verbs;},
        length: function () {return _verbs.length;}
    };
})();

var newVerbsOnly = (function (verbID) {
    var _newVerbsOnly = verbs.get().slice();
    return {
        get: function () {return _newVerbsOnly;},
        reSet: function () {_newVerbsOnly = verbs.get().slice(); console.log("newVerbsOnly.reSet();")},
        length: function () {return _newVerbsOnly.length;},
        splice: function (verbID, param) {_newVerbsOnly.splice(verbID, param); return;},
        setVerb: function (verbID) {
            this.pickVerb(this.randVerbID());
            console.log("picked_verb_id: " + verb.get()[0] + " " + verb.get()[1]
                                                           + " " + verb.get()[2]
                                                           + " " + verb.get()[3]);
            setTimeout(function() {
                typingAnimation(rusVerb_p, verb.get()[4], typingSpeed);},
                (rusVerb_p.innerHTML.length - span.length) * 100
            );

        },
        pickVerb: function (verbID) {
            var newVerb = newVerbsOnly.get();//---------------------------!-----------------

            verb.set(newVerbsOnly.get()[verbID]);
            newVerbsOnly.splice(verbID, 1);
        },
        randVerbID: function () {
            return Math.floor(Math.random() * newVerbsOnly.length());
        }
    };
})();
//----------------------------------typing_animation---------------------------
function typingAnimation (placeForTyping, text, typingSpeed) {
    console.log("typingAnimation(" + placeForTyping.id + ", \"" + text + "\", " + typingSpeed + ")");

    function typeWriter(i) {
        console.log("typeWriter(" + i + ") : " + text.substring(0, i+1));
        if (i < (text.length)) {
            placeForTyping.innerHTML = text.substring(0, i+1) + span;
            setTimeout(function () {typeWriter(i + 1)}, typingSpeed);
        }
    }

    typeWriter(0);
}

function untypingAnimation (placeForTyping, typingSpeed) {
    console.log("untypingAnimation(" + placeForTyping.id + ", " + typingSpeed + ")");

    function untypeWriter() {
        var text = placeForTyping.innerHTML.substring(0, placeForTyping.innerHTML.length - span.length - 1)
        console.log("untypeWriter(): " + text);
        if (span.length < (placeForTyping.innerHTML.length)) {
            placeForTyping.innerHTML = text + span;
            setTimeout(function () {untypeWriter()}, typingSpeed);
        }
    }

    untypeWriter(0);
}

function isTypingSpaceClear(typingSpace) {
    return typingSpace.innerHTML == span;
}
//===================================first_section=============================
function bringItOn() {

    // bringItOn_btn.disabled      = true;

    // v1_input.disabled           = false;
    // v2_input.disabled           = false;
    // v3_input.disabled           = false;
    // submitVerbs_btn.disabled    = false;
    // reset_btn.disabled          = false;
    // giveUp_btn.disabled         = false;

    resetVerbInputs();
    newVerbsOnly.reSet();
    
    scrollToGameAreaSector();
    
    if (isTypingSpaceClear(rusVerb_p)) {
        setTimeout(function () {newVerbsOnly.setVerb()}, 1000);
    } else {
        setTimeout(function () {untypingAnimation(rusVerb_p, untypingSpeed);}, 1500); //wait for scrolling
        setTimeout(function () {newVerbsOnly.setVerb()}, 1500); //wait for untyping animation
    }

    //setTimeout(function () {scrollToGameAreaSector()}, 1000);
    sectionOne_section.style.display = "none";
    //setTimeout(function () {sectionOne_section.style.display = "none"}, 700);

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
        if (verb.get()[i+1] != verbs_form.elements[i].value.toLowerCase().trim()) {
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
    untypingAnimation(rusVerb_p, untypingSpeed);
    newVerbsOnly.setVerb();
    resetVerbInputs();
}

function win() {
    console.log("win()");
    requestScoreTable();

    gameOver_p.innerHTML = wellPlayed;
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();

    // v1_input.disabled           = true;
    // v2_input.disabled           = true;
    // v3_input.disabled           = true;
    // submitVerbs_btn.disabled    = true;
    // reset_btn.disabled          = true;
    // giveUp_btn.disabled         = true;

    // name_input.disabled         = false;
    // submitName_btn.disabled     = false;
    // backToIntro_btn.disabled    = false;

    scrollToGameOverSector();
    //setTimeout(function () {sectionTwo_section.style.display = "none"}, 700);
    sectionTwo_section.style.display = "none";
    //setTimeout(function () {name_input.focus()}, 700);
}

function giveUp() {
    console.log("giveUp()");
    requestScoreTable();

    gameOver_p.innerHTML = gameOver;
    score_p.innerHTML = score.get();
    newVerbsOnly.reSet();

    // v1_input.disabled           = true;
    // v2_input.disabled           = true;
    // v3_input.disabled           = true;
    // submitVerbs_btn.disabled    = true;
    // reset_btn.disabled          = true;
    // giveUp_btn.disabled         = true;

    // name_input.disabled         = false;
    // submitName_btn.disabled     = false;
    // backToIntro_btn.disabled    = false;
    
    scrollToGameOverSector();
    //setTimeout(function () {sectionTwo_section.style.display = "none"}, 700);
    sectionTwo_section.style.display = "none";
    //setTimeout(function () {name_input.focus()}, 700);
}
//---------------------------------third_section-------------------------------
function submitNameAndScore() {
    if (score.get() == 0) { // isScoreZero
        // When the user clicks on <div>, open the popup
        var popup = document.getElementById("score-zero-popup_span");
        popup.classList.toggle("showPopup");
        setTimeout(function () {popup.classList.toggle("showPopup");}, 3000);
        return;
    }
    if (name_input.value.trim() == "") {
        var popup = document.getElementById("empty-name-popup_span");
        popup.classList.toggle("showPopup");
        setTimeout(function () {popup.classList.toggle("showPopup");}, 3000);
        return;
    }
    var queryParams_obj = {}, dbParams_json, xmlhttp;
    queryParams_obj = { "name":name_input.value.trim(), //removes whitespace from both sides of the string
                        "score":score.get()
                      };
    dbParams_json = JSON.stringify(queryParams_obj);
    console.log("dbParams_json = " + dbParams_json);
    xmlhttp = xmlhttp_();
    xmlhttp.open("POST", "json_score_tabl_db_post.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("dbParams_json=" + dbParams_json);
}

function backToIntro() {
    score.reset();
    scrollToIntroSector();
    //setTimeout(function () {sectionThree_section.style.display = "none"}, 700);
    sectionThree_section.style.display = "none";
    
    // bringItOn_btn.disabled      = false;

    // name_input.disabled         = true;
    // submitName_btn.disabled     = true;
    // backToIntro_btn.disabled    = true;
}
//-----------------------------------------------------------------------------
function resetVerbInputs() {
    reset_btn.click();
}
//------------------------Scrolling through the sections-----------------------
function scrollToIntroSector(callback) {
    console.log("scrollToIntroSector()");
    sectionOne_section.style.display = "flex";
    //sectionOne_section.scrollIntoView({behavior: "smooth"});
}

function scrollToGameAreaSector(callback) {
    console.log("scrollToGameAreaSector()");
    sectionTwo_section.style.display = "flex";
    //sectionTwo_section.scrollIntoView({behavior: "smooth"});
}

function scrollToGameOverSector(callback) {
    console.log("scrollToGameOverSector()");
    sectionThree_section.style.display = "flex";
    //sectionThree_section.scrollIntoView({behavior: "smooth"});
}
//-------------------------asynchronous_requests_&_data_base-------------------

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
            var date = new Date(resultQuery_obj[iterator].date);
            table += "<tr>"
                    + "<td>" + ++rowNumScoreTable + "</td>"
                    + "<td>" + resultQuery_obj[iterator].name + "</td>"
                    + "<td>" + resultQuery_obj[iterator].score + "</td>"
                    + "<td>" + formatDate(date) + "</td>"
                + "</tr>";
            names.push(resultQuery_obj[iterator].name);
        }
        return table;

        function checkDuplicateNames(name) {
            return name == resultQuery_obj[iterator].name;
        }
    }
}

function formatDate(date) {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}