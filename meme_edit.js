const fileImg = document.querySelector("#img");
const btn_add_img = document.querySelector("#btn-add-img");

width_img.oninput = () => {
    document.querySelector("#l-width-img").innerText = "Width: " + width_img.value + "%";
}
    
rotate_img.oninput = () => {
    document.querySelector("#l-rotate-img").innerText = "Rotate: " +rotate_img.value + "deg";
}

height_img.oninput = () => {
    document.querySelector("#l-height-img").innerText = "height: " + height_img.value + "%";
}

btn_add_img.onclick = () => {
    var img = document.createElement("img");
    img.classList.add("img");
    img.style.width = width_img.value + "%";
    img.style.height = height_img.value + "%";
    img.style.transform = `rotate(${rotate_img.value}deg)`;
    if(fileImg.value !== "") {
        var tgt = fileImg || window.event.srcElement,
        file = tgt.files;

        // FileReader support
        if (FileReader && file && file.length) {
            var fr = new FileReader();
            fr.onload = function () {
                img.src = fr.result;
            }
            fr.readAsDataURL(file[0]);
            memecon.appendChild(img);
            dragElement(img);
        }

        else {
            console.log("not supported");
        }
    }
}