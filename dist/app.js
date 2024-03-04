"use strict";
const pixelContainer = document.querySelector("#pixel-container");
function createGrid(pixels) {
    for (let i = 0; i < pixels ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = `${640 / pixels}px`;
        pixel.style.width = `${640 / pixels}px`;
        pixel.classList.add("pixel");
        pixelContainer.appendChild(pixel);
    }
    let pixelList = document.querySelectorAll(".pixel");
    hoverTrail(pixelList);
    console.log(pixelList);
}
document.addEventListener("DOMContentLoaded", () => createGrid(16));
function hoverTrail(nodeList) {
    nodeList.forEach((pixel) => pixel.addEventListener("mouseover", () => pixel.classList.add("pixel-hovered")));
}
