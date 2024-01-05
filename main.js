let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById('img');
let Rest = document.getElementById('rest');
let imageBox = document.querySelector('.img-box');
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');
let opacity = document.getElementById('opacity');
let filters = document.querySelectorAll("ul li input");
// to rest all filters
function resetValye( ) {
    img.style.filter='none';
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hueRotate.value='0';
    opacity.value='1';
}
// to rest all changes on images
Rest.onclick=()=>{
    img.style.filter='none';
}

window.onload = function (){
     Rest.style.display="none";
     download.style.display="none";
     imageBox.style.display="none";
}

upload.onchange = function () {
    resetValye();
    Rest.style.display="block";
    download.style.display="block";
    imageBox.style.display="block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
     file.onload =()=>{
         img.src = file.result;
         localStorage.setItem("savedImage", file.result);
     }
}


// turn on  the filters
filters.forEach(targetfilter => {
  targetfilter.addEventListener('input', function () {
    img.style.filter = `
      saturate(${filters[0].value}%)
      contrast(${filters[1].value}%)
      brightness(${filters[2].value}%)
      sepia(${filters[3].value}%)
      grayscale(${filters[4].value})
      blur(${filters[5].value}px)
      hue-rotate(${filters[6].value}deg)
      opacity(${filters[7].value})
    `;
  });
});

// download function 
function downloadImage() {
    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d'); // context framework
  
    // Set the canvas size to match the image dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  
    // Apply the image filters to the canvas
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0);
  
    // Convert the canvas content to a data URL
    const dataURL = canvas.toDataURL('image/png');
  
    // Create a temporary link element and set the data URL as the download link
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited_image.png';
  
    // Programmatically click the link to initiate the download
   link.click();
   localStorage.clear();
   imageBox.style.display="none"; 
}

 
// save image in localstorage
window.onload = function () {
  if (localStorage.getItem("savedImage")) {
      img.src = localStorage.getItem("savedImage");
      Rest.style.display = "block";
      download.style.display = "block";
      imageBox.style.display = "block";
  }
}

function deletImage() {
  localStorage.clear();
  location.reload();
}