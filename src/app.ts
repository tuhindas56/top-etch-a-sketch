const pixelContainer = document.querySelector("#pixel-container") as HTMLElement;
const buttons = document.querySelector("#controls") as HTMLElement;
const currentGridSize = document.querySelector("#grid-size") as HTMLElement;
let nodeList = document.querySelectorAll("#pixel-container > div");
const mutationObserver = new MutationObserver(
  () => ((nodeList = document.querySelectorAll("#pixel-container > div")), hoverTrail())
);
mutationObserver.observe(pixelContainer, { childList: true });
const reset = new CustomEvent("reset", {
  detail: {
    count: 1,
  },
});

buttons.addEventListener("click", (click) => {
  let target = click.target as HTMLElement;
  switch (target.id) {
    case "btn-grid-size":
      let input = prompt("Enter number of pixels per side (Min: 2 pixels, Max: 100 pixels)", "");
      if (!(input == null || input == "" || +input > 100 || +input < 2 || input.match(/[\D]/g))) {
        createGrid(input);
        currentGridSize.textContent = `${input}x${input}`;
      } else {
        alert("Cancelled.");
      }
      break;
    case "btn-reset":
      resetHighlight();
  }
});

function createGrid(gridSize: string) {
  let pixels = +gridSize;
  resetHighlight();
  if (nodeList.length > pixels ** 2) {
    const toRemove = nodeList.length - pixels ** 2;
    for (let i = 0; i < toRemove; i++) {
      pixelContainer.removeChild(document.querySelector("#pixel-container > div")!);
    }
    nodeList.forEach((node) => {
      const div = node as HTMLElement;
      div.style.height = `${500 / pixels}px`;
      div.style.width = `${500 / pixels}px`;
      div.classList.add("pixel");
    });
  } else {
    const toAdd = pixels ** 2 - nodeList.length;
    for (let i = 0; i < toAdd; i++) {
      const div = document.createElement("div");
      pixelContainer.append(div);
    }

    nodeList = document.querySelectorAll("#pixel-container > div");
    nodeList.forEach((div) => {
      (div as HTMLElement).style.height = `${500 / pixels}px`;
      (div as HTMLElement).style.width = `${500 / pixels}px`;
      (div as HTMLElement).classList.add("pixel");
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
      count = (event as CustomEvent).detail.count;
    });
  });
}

function addHighlight(element: Element, count: number) {
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
