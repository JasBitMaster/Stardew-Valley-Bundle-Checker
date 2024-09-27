import JunimoNote from "../assets/sprites/JunimoNote.png"
import BundleSprites from "../assets/sprites/BundleSprites.png"
import Craftables from "../assets/sprites/Craftables.png"
import Objects from "../assets/sprites/Objects.png"
import Objects_2 from "../assets/sprites/Objects_2.png"
import Cursors from "../assets/sprites/Cursors.png"
import Title from "../assets/imgs/logo.png"

/* Creates image objects to act as spritesheets */
let junimoNoteImg, bundleSpritesImg, craftablesImg, objectsImg, objectsImg2, cursorsImg, titleImg
junimoNoteImg = new Image()
bundleSpritesImg = new Image()
craftablesImg = new Image()
objectsImg = new Image()
objectsImg2 = new Image()
cursorsImg = new Image()
titleImg = new Image()
/* Loads spritesheet textures from files */
junimoNoteImg.src = JunimoNote
bundleSpritesImg.src = BundleSprites
craftablesImg.src = Craftables
objectsImg.src = Objects
objectsImg2.src = Objects_2
cursorsImg.src = Cursors
titleImg.src = Title

const scaler = 3                // Factor to scale sprites up by
const tagScaler = 2             // Factor to scale item markers up by

const qualityX = 1 * scaler     // Position x of quality indicator
const qualityY = 11 * scaler    // Position y of quality indicator

const textX = 19 * 2    // Position x of count indicator
const textY = 19 * 2    // Position y of count indicator

const navPos = [337,352,365]    // Offsets for x position of navigation sprites

const borderMargin = 4 * scaler

/* Determines what type of sprite is being drawn, then draws it to the canvas */
export function drawSprite(context, spriteType, sprite) {
    
    switch(spriteType) {
        case "background":
            let imgRef = loadSprite(context, sprite.texture, sprite.index, 0, 0, 320, 180, 2, 0, 0, scaler)
            if(sprite.index == 0) {
                context.value.font = "32px sv-bold"
                loadText(context, sprite.name, imgRef, (320 * scaler)/2, 36)
            } else {
                context.value.font = "bold 32px sv-thin"
                let text = sprite.name + " Bundle"
                let textWidth = context.value.measureText(text).width + borderMargin
                drawStretchSprite(context, textWidth, 0, 704, 198)
                loadText(context, text, imgRef, 704, 198)
            }
        break
        case "scroll":
            let text = sprite.name
            let textWidth = context.value.measureText(text).width + borderMargin
            let img = drawStretchSprite(context, textWidth, 1, (320 * scaler)/2, 8 * scaler)
            context.value.font = "32px sv-bold"
            loadText(context, text, img, (320 * scaler)/2, 10 * scaler)
        break
        case "title":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 800, 400, 1, 0, 0, 1)
        break
        case "loader":
            loadSprite(context, sprite.texture, sprite.index, 331, 374, 15, 14, 1, 0, 0, 6)
        break
        case "bundle":
            let adjustedIndex = sprite.index * 16 + 1
            loadSprite(context, sprite.texture, adjustedIndex, 0, 244, 16, 16, 32, 0, 0, scaler)
        break
        case "reward":
            loadSprite(context, sprite.texture, sprite.index, 548, 262, 18, 20, 4, 0, 0, scaler)
        break
        case "navigation":
            loadSprite(context, sprite.texture, 0, navPos[sprite.index], 494, 12, 12, 1, 0, 0, scaler)
        break
        case "bundleIcon":
            if(sprite.texture == "BundleSprites") {
                loadSprite(context, sprite.texture, sprite.index, 0, 0, 32, 32, 8, 0, 0, scaler)
            } else {
                loadSprite(context, sprite.texture, sprite.index, 0, 180, 32, 32, 20, 0, 0, scaler)
            }
        break
        case "itemSlot":
            if(sprite.index > 0) {
                loadSprite(context, sprite.texture, 0, 512, 244, 18, 18, 1, 0, 0, scaler)
            } else {
                loadSprite(context, sprite.texture, 0, 516, 286, 68, 20, 1, 0, 0, scaler)
            }
        break
        case "craftable":
            loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 32, 8, 0, 0, scaler)
        break
        case "item":
            //TODO - Draw item shadow
            //loadSprite(context, "Shadow", 0, 0, 0, 16, 16, 1, 0, 0, scaler)
            if(sprite.texture == "Objects_2") {
                loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 16, 8, 0, 0, scaler)
            } else {
                loadSprite(context, sprite.texture, sprite.index, 0, 0, 16, 16, 24, 0, 0, scaler)
            }
            //Adds quality indicator if it exists
            switch(sprite.item.minQuality) {
                case "Silver":
                    loadSprite(context, "Cursors", 2, 338, 392, 8, 8, 2, qualityX, qualityY, tagScaler)
                break
                case "Gold":
                    loadSprite(context, "Cursors", 3, 338, 392, 8, 8, 2, qualityX, qualityY, tagScaler)
                break
                case "Iridium":
                    loadSprite(context, "Cursors", 1, 338, 392, 8, 8, 2, qualityX, qualityY, tagScaler)
                break
            }
            //Adds count indicator if it exceeds one
            if(sprite.item.count > 1) {
                let i = sprite.item.count
                let offsetX = 0
                let digit = 0
                while(i > 0) {
                    digit = i % 10
                    loadSprite(context, "Cursors", digit, 368, 56, 5, 7, 10, textX - offsetX, textY, tagScaler)
                    offsetX += 4 * tagScaler
                    i = Math.floor(i / 10)
                }
            }
        break
    }
}

/* Draws animation frames for animated sprites */
export function animateSprite(context, canvasWidth, canvasHeight, currentFrame, spriteType, sprite) {
    //Clear texture
    context.value.clearRect(0, 0, canvasWidth, canvasHeight)
    let adjustedIndex = -1
    //Load next frame
    switch(spriteType) {
        case "bundle":
            adjustedIndex = sprite.index * 16 + currentFrame
            if(currentFrame == 3) {
                adjustedIndex = sprite.index * 16 + 1
            }
            loadSprite(context, sprite.texture, adjustedIndex, 0, 244, 16, 16, 32, 0, 0, scaler)
        break
        case "reward":
            adjustedIndex = sprite.index + currentFrame
            loadSprite(context, sprite.texture, adjustedIndex, 548, 262, 18, 20, 4, 0, 0, scaler)
        break
    }
}

/* Loads sprite data from appropriate file and draws it to the canvas once loaded */
function loadSprite(context, texture, spriteIndex, startX, startY, width, height, rowCount, shiftX, shiftY, scale) {
    let img = new Image() 
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
        case "Title":
            img = titleImg
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
        context.value.drawImage(img, sx, sy, width, height, shiftX, shiftY, width * scale, height * scale)
            console.log("Image Updated...")
    } else {
        img.addEventListener("load", () => {
            context.value.drawImage(img, sx, sy, width, height, shiftX, shiftY, width * scale, height * scale)
            console.log("Image Loaded...")
        })
    }
    return img
}

/* Draws text to the canvas after its texture has loaded */
function loadText(context, text, img, posX, posY) {
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

/* Draws sprites that tile horizontally in some way */
function drawStretchSprite(context, textWidth, stretchType, centerX, topY) {
    let tileWidths =    [5, 1, 5, 12, 1, 12]
    let tileHeights =   [16, 16, 16, 18, 18, 18]
    let tileOffsetsX =  [517, 522, 523, 325, 337, 338]
    let tileOffsetsY =  [266, 266, 266, 318, 318, 318]
    let textures =      ["JunimoNote", "Cursors"]

    let indexOffset = stretchType * 3
    let shiftX = centerX - Math.floor(textWidth / 2) - (tileWidths[indexOffset]) * scaler
    let shiftY = topY - 8 * scaler

    //Draws the left portion of the sprite
    loadSprite(context, textures[stretchType], 0, tileOffsetsX[indexOffset], tileOffsetsY[indexOffset],
        tileWidths[indexOffset], tileHeights[indexOffset], 1, shiftX, shiftY, scaler)
    shiftX += tileWidths[indexOffset] * scaler
    //Tile middle part of texture for text width
    for(let i = 0; i < textWidth; i += tileWidths[indexOffset + 1]) {
        loadSprite(context, textures[stretchType], 0, tileOffsetsX[indexOffset + 1], tileOffsetsY[indexOffset + 1],
            tileWidths[indexOffset + 1], tileHeights[indexOffset + 1], 1, shiftX, shiftY, scaler)
        shiftX += tileWidths[indexOffset + 1]
    }
    //Draws the right portion of the sprite
    let img = loadSprite(context, textures[stretchType], 0, tileOffsetsX[indexOffset + 2], tileOffsetsY[indexOffset + 2],
        tileWidths[indexOffset + 2], tileHeights[indexOffset + 2], 1, shiftX, shiftY, scaler)

    return img
}