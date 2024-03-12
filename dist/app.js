"use strict";
const pixelContainer = document.querySelector("#pixel-container");
const buttons = document.querySelector("#controls");
const currentGridSize = document.querySelector("#grid-size");
let nodeList = document.querySelectorAll("#pixel-container > div");
const mutationObserver = new MutationObserver(() => ((nodeList = document.querySelectorAll("#pixel-container > div")), hoverTrail()));
mutationObserver.observe(pixelContainer, { childList: true });
const reset = new CustomEvent("reset", {
    detail: {
        count: 1,
    },
});
buttons.addEventListener("click", (click) => {
    let target = click.target;
    switch (target.id) {
        case "btn-grid-size":
            let input = prompt("Enter number of pixels per side (Min: 2 pixels, Max: 100 pixels)", "");
            if (!(input == null || input == "" || +input > 100 || +input < 2 || input.match(/[\D]/g))) {
                createGrid(input);
                currentGridSize.textContent = `${input}x${input}`;
            }
            else {
                alert("Cancelled.");
            }
            break;
        case "btn-reset":
            resetHighlight();
    }
});
function createGrid(gridSize) {
    let pixels = +gridSize;
    resetHighlight();
    if (nodeList.length > pixels ** 2) {
        const toRemove = nodeList.length - pixels ** 2;
        for (let i = 0; i < toRemove; i++) {
            pixelContainer.removeChild(document.querySelector("#pixel-container > div"));
        }
        nodeList.forEach((node) => {
            const div = node;
            div.style.height = `${500 / pixels}px`;
            div.style.width = `${500 / pixels}px`;
            div.classList.add("pixel");
        });
    }
    else {
        const toAdd = pixels ** 2 - nodeList.length;
        for (let i = 0; i < toAdd; i++) {
            const div = document.createElement("div");
            pixelContainer.append(div);
        }
        nodeList = document.querySelectorAll("#pixel-container > div");
        nodeList.forEach((div) => {
            div.style.height = `${500 / pixels}px`;
            div.style.width = `${500 / pixels}px`;
            div.classList.add("pixel");
        });
    }
}
function hoverTrail() {
    nodeList.forEach((div) => {
        let count = 1;
        div.addEventListener("mouseover", () => {
            addHighlight(div, count);
            count++;
        });
        div.addEventListener("reset", (event) => {
            count = event.detail.count;
        });
    });
}
function addHighlight(element, count) {
    element.classList.add(`hover-${count}`);
}
function resetHighlight() {
    nodeList.forEach((div) => {
        div.classList.value = "pixel";
        div.dispatchEvent(reset);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    createGrid("16");
    hoverTrail();
});
