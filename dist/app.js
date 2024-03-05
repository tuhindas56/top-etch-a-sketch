"use strict";
const pixelContainer = document.querySelector("#pixel-container");
const reset = new CustomEvent("reset", {
    detail: {
        red: 82,
        green: 124,
        blue: 129,
    },
});
function createGrid(pixels) {
    for (let i = 0; i < pixels ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = `${500 / pixels}px`;
        pixel.style.width = `${500 / pixels}px`;
        pixel.classList.add("pixel");
        pixelContainer.appendChild(pixel);
    }
    etchSketch();
}
document.addEventListener("DOMContentLoaded", () => createGrid(16));
function hoverTrail(nodeList) {
    nodeList.forEach((pixel) => {
        let color = {
            red: 82,
            green: 124,
            blue: 129,
        };
        pixel.addEventListener("mouseover", () => {
            color.red -= 5;
            color.green -= 12;
            color.blue -= 12;
            pixel.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        });
        pixel.addEventListener("reset", (event) => {
            color.red = event.detail.red;
            color.green = event.detail.green;
            color.blue = event.detail.blue;
        });
    });
}
function setupButtons() {
    const buttons = document.querySelector("#controls");
    const pixelList = document.querySelectorAll(".pixel");
    buttons.addEventListener("click", (event) => {
        let target = event.target;
        const gridSize = document.querySelector("#grid-size");
        switch (target.id) {
            case "btn-grid-size":
                const pixelInput = prompt("Enter number of pixels per side (Min: 2 pixels, Max: 100 pixels)", "");
                if (pixelInput == null || pixelInput == "" || +pixelInput > 100 || +pixelInput < 1) {
                    alert("Cancelled.");
                }
                else {
                    pixelList.forEach((pixel) => pixel.remove());
                    createGrid(parseInt(pixelInput));
                    gridSize.textContent = `${pixelInput}x${pixelInput}`;
                }
                break;
            case "btn-reset":
                pixelList.forEach((pixel) => {
                    pixel.style.backgroundColor = "rgb(48, 72, 74)";
                    pixel.dispatchEvent(reset);
                });
                break;
        }
    });
}
function etchSketch() {
    hoverTrail(document.querySelectorAll(".pixel"));
    setupButtons();
}
