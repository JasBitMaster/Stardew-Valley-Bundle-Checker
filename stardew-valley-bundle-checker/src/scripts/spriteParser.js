import JunimoNote from "../assets/sprites/JunimoNote.png"
import BundleSprites from "../assets/sprites/BundleSprites.png"
import Craftables from "../assets/sprites/Craftables.png"
import Objects from "../assets/sprites/Objects.png"
import Objects_2 from "../assets/sprites/Objects_2.png"

let junimoNoteImg, bundleSpritesImg, craftablesImg, objectsImg, objectsImg2
junimoNoteImg = new Image()
bundleSpritesImg = new Image()
craftablesImg = new Image()
objectsImg = new Image()
objectsImg2 = new Image()

junimoNoteImg.src = JunimoNote
bundleSpritesImg.src = BundleSprites
craftablesImg.src = Craftables
objectsImg.src = Objects
objectsImg2.src = Objects_2

let scaler = 3

function loadRoomPage(room) {
    //Load background
    //Load room name
    //Load bundles
    //Load arrows?
}

function loadBundlePage(bundle) {
    //Load background
    //Load room name
    //Load items
    //Load slots
    //Load reward
}

export function drawSprite(context, spriteType, sprite) {
    
    switch(spriteType) {
        case "background":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 320, 180, 2)
            break
        case "bundle":
            let adjustedIndex = sprite.index * 16 + 1
            loadSprite(context, sprite.texture, adjustedIndex, 0, 244, 16, 16, 32)
            break
        case "item":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 16, 24)
            break
        case "craftable":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 32, 8)
            break
    }
    //TODO - Add cases for arrow inputs, slots, reward icon, bundle icon, text?
}

function loadSprite(context, texture, spriteIndex, startX, startY, width, height, rowCount) {

    let img = new Image()

    switch(texture) {
        case "JunimoNote":
            img = junimoNoteImg
        break
        case "BundleSprites":
            img = bundleSpritesImg
        break
        case "Craftables":
            img = craftablesImg
        break
        case "Objects":
            img = objectsImg
        break
        case "Objects_2":
            img = objectsImg2
        break
    }

    context.value.imageSmoothingEnabled = false

    let offsetX = spriteIndex % rowCount
    let offsetY = Math.floor(spriteIndex / rowCount)

    let sx = width * offsetX + startX
    let sy = height * offsetY + startY

    if(img.complete) {
        context.value.drawImage(img, sx, sy, width, height, 0, 0, width * scaler, height * scaler)
            console.log("Image Updated...")
    } else {
        img.addEventListener("load", () => {
            context.value.drawImage(img, sx, sy, width, height, 0, 0, width * scaler, height * scaler)
            console.log("Image Loaded...")
        })
    }
}

function loadText(context, text, posX, posY) {

}