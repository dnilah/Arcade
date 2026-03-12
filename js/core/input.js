const keys = {}
const mouse = {
    x: 0,
    y: 0,
    pressed: false,
    clicked: false,
};

window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

const canvas = document.getElementById("gameCanvas");

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mousedown", () => {
    mouse.pressed = true;
    mouse.clicked = true;
});

canvas.addEventListener("mouseup", () => {
    mouse.pressed = false;
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
    mouse.pressed = true;
    mouse.clicked = true;
});

canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    mouse.pressed = false;
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
});

export function isKeyPressed(key) {
    return !!keys[key];
}
export function getMousePos() {
    return { x: mouse.x, y: mouse.y };
}

export function isMousePressed() {
    return mouse.pressed;
}

export function wasMouseClicked() {
    const clicked = mouse.clicked;
    mouse.clicked = false;
    return clicked;
}   

export function resetInput() {
    for (const key in keys) {
        keys[key] = false;
    }
    mouse.clicked = false;
}