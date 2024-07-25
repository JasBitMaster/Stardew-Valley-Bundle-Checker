import JunimoNote from "../assets/sprites/JunimoNote.png"
import BundleSprites from "../assets/sprites/BundleSprites.png"
import Craftables from "../assets/sprites/Craftables.png"
import Objects from "../assets/sprites/Objects.png"
import Objects_2 from "../assets/sprites/Objects_2.png"
import Cursors from "../assets/sprites/Cursors.png"

/* Creates image objects to act as spritesheets */
let junimoNoteImg, bundleSpritesImg, craftablesImg, objectsImg, objectsImg2, cursorsImg
junimoNoteImg = new Image()
bundleSpritesImg = new Image()
craftablesImg = new Image()
objectsImg = new Image()
objectsImg2 = new Image()
cursorsImg = new Image()
/* Loads spritesheet textures from files */
junimoNoteImg.src = JunimoNote
bundleSpritesImg.src = BundleSprites
craftablesImg.src = Craftables
objectsImg.src = Objects
objectsImg2.src = Objects_2
cursorsImg.src = Cursors

const scaler = 3                // Factor to scale sprites up by
const tagScaler = 2             // Factor to scale item markers up by

const qualityX = 1 * scaler     // Position x of quality indicator
const qualityY = 10 * scaler    // Position y of quality indicator

const textX = 19 * tagScaler    // Position x of count indicator
const textY = 19 * tagScaler    // Position y of count indicator

const navPos = [337,352,365]    // Offsets for x position of navigation sprites

let img = new Image()           // Currently loaded image

/* Determines what type of sprite is being drawn, then draws it to the canvas */
export function drawSprite(context, spriteType, sprite) {
    
    switch(spriteType) {
        case "background":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 320, 180, 2, 0, 0)
            if(sprite.index == 0) {
                context.value.font = "32px sv-bold"
                loadText(context, sprite.name, (320 * scaler)/2, 36)
            } else {
                context.value.font = "32px sv-thin"
                loadText(context, sprite.name + " Bundle", 704, 200)
            }
        break
        case "bundle":
            let adjustedIndex = sprite.index * 16 + 1
            loadSprite(context, sprite.texture, adjustedIndex, 0, 244, 16, 16, 32, 0, 0)
        break
        case "navigation":
            loadSprite(context, sprite.texture, 0, navPos[sprite.index], 494, 12, 12, 1, 0, 0)
        break
        case "bundleIcon":
            if(sprite.texture == "BundleSprites") {
                loadSprite(context, sprite.texture, sprite.index, 0, 0, 32, 32, 8, 0, 0)
            } else {
                loadSprite(context, sprite.texture, sprite.index, 0, 180, 32, 32, 20, 0, 0)
            }
        break
        case "itemSlot":
            if(sprite.index > 0) {
                loadSprite(context, sprite.texture, 0, 512, 244, 18, 18, 1, 0, 0)
            } else {
                loadSprite(context, sprite.texture, 0, 516, 286, 68, 20, 1, 0, 0)
            }
        break
        case "craftable":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 32, 8, 0, 0)
        break
        case "item":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 16, 24, 0, 0)
            //Adds quality indicator if it exists
            switch(sprite.item.minQuality) {
                case "Silver":
                    loadSprite(context, "Cursors", 2, 338, 392, 8, 8, 2, qualityX, qualityY)
                break
                case "Gold":
                    loadSprite(context, "Cursors", 3, 338, 392, 8, 8, 2, qualityX, qualityY)
                break
                case "Iridium":
                    loadSprite(context, "Cursors", 1, 338, 392, 8, 8, 2, qualityX, qualityY)
                break
            }
            //Adds count indicator if it exceeds one
            if(sprite.item.count > 1) {
                let i = sprite.item.count
                let offsetX = 0
                let digit = 0
                while(i > 0) {
                    digit = i % 10
                    loadSprite(context, "Cursors", digit, 368, 56, 5, 7, 10, textX - offsetX, textY)
                    offsetX += 5 * tagScaler
                    i = Math.floor(i / 10)
                }
            }
        break
    }
}

/* Loads sprite data from appropriate file and draws it to the canvas once loaded */
function loadSprite(context, texture, spriteIndex, startX, startY, width, height, rowCount, shiftX, shiftY) {
    //Determines which image texture to load
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
        case "Cursors":
            img = cursorsImg
        break
    }
    //Makes textures pixel perfect
    context.value.imageSmoothingEnabled = false
    //Determines the position offset based on index and number of sprites in a row
    let offsetX = spriteIndex % rowCount
    let offsetY = Math.floor(spriteIndex / rowCount)
    let sx = width * offsetX + startX
    let sy = height * offsetY + startY
    //Draws sprite to canvas once image has loaded
    if(img.complete) {
        context.value.drawImage(img, sx, sy, width, height, shiftX, shiftY, width * scaler, height * scaler)
            console.log("Image Updated...")
    } else {
        img.addEventListener("load", () => {
            context.value.drawImage(img, sx, sy, width, height, shiftX, shiftY, width * scaler, height * scaler)
            console.log("Image Loaded...")
        })
    }
}

/* Draws text to the canvas after its texture has loaded */
function loadText(context, text, posX, posY) {
    if(img.complete) {
        context.value.fillText(text, posX, posY)
        console.log("Text Updated...")
    } else {
        img.addEventListener("load", () => {
            context.value.fillText(text, posX, posY)
            console.log("Text Loaded...")
        })
    }
}