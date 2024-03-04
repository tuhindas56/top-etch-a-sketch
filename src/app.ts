const pixelContainer = document.querySelector("#pixel-container") as HTMLElement;
document.addEventListener("DOMContentLoaded", () => createGrid(16));
function createGrid(pixels: number) {
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
  hoverTrail(document.querySelectorAll(".pixel"));
  setupButtons();
}

function hoverTrail(nodeList: NodeListOf<Element>) {
  nodeList.forEach((pixel) => pixel.addEventListener("mouseover", () => pixel.classList.add("pixel-hovered")));
}

function setupButtons() {
  const buttons = document.querySelector("#buttons") as HTMLElement;
  const pixelList = document.querySelectorAll(".pixel");
  buttons.addEventListener("click", (event) => {
    let target = event.target as HTMLElement;
    switch (target.id) {
      case "btn-grid-size":
        const pixelInput = prompt("Enter number of pixels per side (Max 100 pixels)", "");
        if (pixelInput == null || pixelInput == "" || +pixelInput > 100 || +pixelInput < 1) {
          alert("Cancelled.");
        } else {
          pixelList.forEach((pixel) => pixel.remove());
          createGrid(parseInt(pixelInput));
        }
        break;
      case "btn-reset":
        pixelList.forEach((pixel) => pixel.classList.remove("pixel-hovered"));
        break;
    }
  });
}
