const fileBtn = document.querySelector("#file-meme");
const memeimg = document.querySelector("#meme-img");
const memecon = document.querySelector(".meme-container");
const input = document.querySelector("#text");
const btn = document.querySelector("#btn");
const width = document.querySelector("#width");
const rotate = document.querySelector("#degree");
const memeText = document.querySelectorAll(".meme-text");
const width_img = document.querySelector("#width-img");
const rotate_img = document.querySelector("#rotate-img");
const height_img = document.querySelector("#height-img");
var tar_element;

document.querySelector("#delete").onclick = () => {
  if(tar_element && tar_element.id !== "meme-img")
    tar_element.remove();
  }

width.oninput = () => {
  document.querySelector("#l-width").innerText = "Width: " + width.value + "%";
}

rotate.oninput = () => {
  document.querySelector("#l-degree").innerText = "Rotate: " +rotate.value + "deg";
}

memecon.addEventListener("click", e => {
  if (tar_element && tar_element !== e.target) {
    tar_element.style.outline = "0px solid black";
  }
  tar_element = e.target;
  tar_element.style.outline = "2px solid black";
  if(tar_element.tagName !== "IMG" && tar_element.className !== "meme-container") {
    const btn_edit = document.querySelector("#btn-edit");
    const txt_edit = document.querySelector("#text-edit");
  
    txt_edit.value = tar_element.innerText;

    width.value = (tar_element.style.width).replace("%", "");
    document.querySelector("#l-width").innerText = "Width: " + width.value + "%";

    rotate.value = (tar_element.style.transform).replace("rotate(", "").replace("deg)", "");
    document.querySelector("#l-degree").innerText = "Rotate: " +rotate.value + "deg";

    width.oninput = () => {
      document.querySelector("#l-width").innerText = "Width: " + width.value + "%";
      tar_element.style.width = width.value + "%";
    }

    rotate.oninput = () => {
      document.querySelector("#l-degree").innerText = "Rotate: " +rotate.value + "deg";
      tar_element.style.transform = `rotate(${rotate.value}deg)`;
    }

    color.oninput = () => {
      tar_element.style.color = color.value;
    }

    document.querySelector("#fontsize").onchange = () => {
      tar_element.style.fontSize = document.querySelector("#fontsize").value + "px";
    }

    btn_edit.onclick = () => {
        tar_element.innerText = txt_edit.value;
    }
  }
  if(tar_element.id !== "meme-img" && tar_element.tagName === "IMG") {
    width_img.oninput = () => {
      document.querySelector("#l-width-img").innerText = "Width: " + width_img.value + "%";
      tar_element.style.width = width_img.value + "%";
    }

    rotate_img.oninput = () => {
      document.querySelector("#l-rotate-img").innerText = "Rotate: " +rotate_img.value + "deg";
      tar_element.style.transform = `rotate(${rotate_img.value}deg)`;
    }

    height_img.oninput = () => {
      document.querySelector("#l-height-img").innerText = "Rotate: " +height_img.value + "%";
      tar_element.style.height = height_img.value + "%";
    }
  }
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

btn.onclick = () => {
    var h1 = document.createElement("h1");
    h1.classList.add("meme-text")
    h1.innerText = input.value;
    h1.style.width = width.value + "%";
    h1.style.height = "auto";
    h1.style.fontSize = document.querySelector("#fontsize").value + "px";
    h1.style.color = document.querySelector("#color").value;
    h1.style.transform = `rotate(${rotate.value}deg)`
    memecon.appendChild(h1);
    dragElement(h1);
}

fileBtn.addEventListener("change", (e) => {
    var tgt = e.target || window.event.srcElement,
    files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            memeimg.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    else {
        console.log("not supported");
    }
})