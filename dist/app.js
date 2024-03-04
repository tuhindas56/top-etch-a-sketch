"use strict";
const pixelContainer = document.querySelector("#pixel-container");
document.addEventListener("DOMContentLoaded", () => createGrid(16));
function createGrid(pixels) {
    for (let i = 0; i < pixels ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = `${640 / pixels}px`;
        pixel.style.width = `${640 / pixels}px`;
        pixel.classList.add("pixel");
        pixelContainer.appendChild(pixel);
    }
    etchSketch();
}
function etchSketch() {
    let pixelList = document.querySelectorAll(".pixel");
    hoverTrail(pixelList);
    resetBtn();
}
function hoverTrail(nodeList) {
    nodeList.forEach((pixel) => pixel.addEventListener("mouseover", () => pixel.classList.add("pixel-hovered")));
}
function resetBtn() {
    const resetBtn = document.querySelector("#reset");
    resetBtn.addEventListener("click", () => {
        document.querySelectorAll(".pixel").forEach((pixel) => pixel.classList.remove("pixel-hovered"));
    });
}
