"use strict";
function createGrid(pixels) {
    const pixelContainer = document.querySelector("#pixel-container");
    for (let i = 0; i < pixels ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = `${640 / pixels}px`;
        pixel.style.width = `${640 / pixels}px`;
        pixel.classList.add("pixel");
        pixelContainer.appendChild(pixel);
    }
}
