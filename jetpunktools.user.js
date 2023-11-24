// ==UserScript==
// @name        Jetpunk Tools
// @description Jetpunk Tools
// @namespace   Violentmonkey Scripts
// @match       https://www.jetpunk.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=jetpunk.com
// @version     1.0
// ==/UserScript==

// === START CONFIGURATION ===
let ENABLE_DEBUG = false; // Print debug messages

// 
let DELAY_BETWEEN_ANSWERS_MIN = 500; // the minimum delay between each answer in milliseconds
let DELAY_BETWEEN_ANSWERS_MAX = 1000; // the maximum delay between each answer in milliseconds

let CUSTOM_RANDOMIZATION_SEED = null; // the randomization seed to use, if null it will use Math.random()

// === END CONFIGURATION ===

function printToConsole(message) {
    if (ENABLE_DEBUG) {
        console.log(message);
    }
}

function generateNewDelay() {
    let s = CUSTOM_RANDOMIZATION_SEED ? CUSTOM_RANDOMIZATION_SEED : Math.random();
    let v = Math.floor(s * (DELAY_BETWEEN_ANSWERS_MAX - DELAY_BETWEEN_ANSWERS_MIN) + DELAY_BETWEEN_ANSWERS_MIN);

    printToConsole("generateNewDelay(): " + "seed(" + s + ") " + v);

  return v;
}

async function enterAnswers(answers) {
  for (let i = 0; i < answers.length; i++) {
    document.getElementById("txt-answer-box").value = answers[i];
    await sleep(generateNewDelay());
    document.getElementById("txt-answer-box").dispatchEvent(new KeyboardEvent("input"));
  }
}

function getAllAnswers() {
  let answerDisplay = document.getElementById("grid").querySelectorAll(".answer-display");

  let answers = [];
  for (let i = 0; i < answerDisplay.length; i++) {
    let answer = answerDisplay[i].textContent.replaceAll("\n", "").split(" ").join(" ");
    answers.push(answer);
  }

  return answers;
}

document.getElementById("start-button").onclick = function () {
  enterAnswers(getAllAnswers());
};

if (document.getElementById("puzzle-holder")) {
  showPuzzleAnswers(getPuzzleWordList());
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
