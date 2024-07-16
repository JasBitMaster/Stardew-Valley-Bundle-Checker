import JunimoNote from "../assets/sprites/JunimoNote.png"
import BundleSprites from "../assets/sprites/BundleSprites.png"
import Craftables from "../assets/sprites/Craftables.png"
import Objects from "../assets/sprites/Objects.png"
import Objects_2 from "../assets/sprites/Objects_2.png"

let scaler = 3

export function loadRoomPage(room) {
    //Load background
    //Load room name
    //Load bundles
    //Load arrows?
}

export function loadBundlePage(bundle) {
    //Load background
    //Load room name
    //Load items
    //Load slots
    //Load reward
}

function loadBackground(roomType) {

}

function loadBundles() {

}

function loadSprite(canvas, texture, spriteIndex, width, height, rowCount) {

    let img = new Image()

    switch(texture) {
        case "JunimoNote":
            img = JunimoNote
        break
        case "BundleSprites":
            img = BundleSprites
        break
        case "Craftables":
            img = Craftables
        break
        case "Objects":
            img = Objects
        break
        case "Objects_2":
            img = Objects_2
        break
    }

    let context = canvas.getContext("2d")
    context.imageSmoothingEnabled = false

    let offsetX = spriteIndex % rowCount
    let offsetY = Math.floor(spriteIndex / rowCount)

    sx = width * offsetX
    sy = height * offsetY

    context.drawImage(img, sx, sy, width, height, 0, 0, width * scaler, height * scaler)
}

function loadText(text) {

}