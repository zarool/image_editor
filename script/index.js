let canvas = document.getElementById("img-canvas");
styles = document.querySelectorAll(".slider");
resetArray();

function resetArray() {
    styles.forEach((element, index) => {
        if (index == 4) element.value = 100;
        else element.value = 0;
    });
}


//load file
function readURL(input) {
    // if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {

        let image = new Image();
        image.onload = function () {
            draw(image);
        };
        image.src = reader.result;
    };

    reader.readAsDataURL(input.files[0]);
    $('.options').show();
    $('.box').show();
    $('.file-choose').hide();
    // }
}

$('#file').change(function () {
    readURL(this);
});

//edit css
function changeCss(context) {
    context.filter = `sepia(${styles[0].value}%)
    grayscale(${styles[1].value}%) 
    blur(${styles[2].value}px) 
    saturate(${styles[3].value}) 
    contrast(${styles[4].value}%)
    invert(${styles[5].value}%)`;
}


//draw canvas

function draw(image) {

    context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    styles.forEach((element) => {
        element.addEventListener("input", () => {
            changeCss(context);
            context.drawImage(image, 0, 0);
        });
    });
}


//download image
buttons = document.querySelectorAll(".btn");

buttons[0].addEventListener("click", () => {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
});


//new image

$('#newImg').change(function () {
    readURL(this);
});