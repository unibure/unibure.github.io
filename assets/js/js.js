
const circle = document.querySelector(".mouse_circle");

document.addEventListener("mousemove", (e) => { 
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    circle.style.left = mouseX + 'px';
    circle.style.top = mouseY + 'px';
});
