const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const infoDiv = document.getElementById('info');
const storedImageData = localStorage.getItem('imageData');

// Restore image data if available
if (storedImageData) {
    const img = new Image();
    img.onload = function() {
        canvas.width = img.width / 2;
        canvas.height = img.height / 2;
        ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
    }
    img.src = storedImageData;
}

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;
            ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
            // Save image data to local storage
            localStorage.setItem('imageData', e.target.result);
        }
        img.src = e.target.result;
    }

    reader.readAsDataURL(file);
});

canvas.addEventListener('mousemove', function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `RGB: ${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`;
    const coordinates = `X: ${x}, Y: ${y}`;
    infoDiv.innerHTML = `${rgb}<br>${coordinates}`;
});
