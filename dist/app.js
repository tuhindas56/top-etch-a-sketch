"use strict";
const pixelContainer = document.querySelector("#pixel-container");
const buttons = document.querySelector("#controls");
const currentGridSize = document.querySelector("#grid-size");
document.addEventListener("DOMContentLoaded", () => createGrid("16"));
buttons.addEventListener("click", (click) => {
    let target = click.target;
    console.log(target.id);
    switch (target.id) {
        case "btn-grid-size":
            let input = prompt("Enter number of pixels per side (Min: 2 pixels, Max: 100 pixels)", "");
            if (!(input == null || input == "" || +input > 100 || +input < 2)) {
                createGrid(input);
                currentGridSize.textContent = `${input}x${input}`;
            }
            else {
                alert("Cancelled.");
            }
            break;
    }
});
function createGrid(getPixels) {
    document.querySelectorAll("#pixel-container > div").forEach((div) => div.remove());
    let pixels = +getPixels;
    for (let i = 0; i < pixels ** 2; i++) {
        let div = document.createElement("div");
        div.style.height = `${500 / pixels}px`;
        div.style.width = `${500 / pixels}px`;
        div.classList.add("pixel");
        pixelContainer.append(div);
    }
}
console.log(document.querySelectorAll("#pixel-container > div"));
