import * as objects from './JSON/Objects.json'
import * as bigCraftables from './JSON/BigCraftables.json'

let rooms = []
console.log(bigCraftables.default["0"].DisplayName)
console.log(objects.default["VolcanoGoldNode"])

function parseSave(saveFile) {
    const reader = new FileReader();
    if(saveFile) {
        reader.readAsText(saveFile)
    }
    reader.addEventListener("load", parseBundleData(reader.result), false)
}

function parseBundleData(textFile) {
    rooms = []
    let bundleData = textFile.split("bundleData")
    let bundlesString = bundleData[1].slice(1,-2)
    bundlesString = bundlesString.replaceAll(/<\/value>/,",")
    bundlesString = bundlesString.replaceAll(/<\/key>/,"/")
    bundlesString = bundlesString.replaceAll(/<|>|\/|value|key|item|string/,"")
    let bundlesArray = bundlesString.split(",")
    bundlesArray.forEach(parseBundle)
}

function parseBundle(bundle) {
    let data = bundle.split("/")
    let roomIndex = rooms.findIndex(checkRoomName, data[0])
    if(roomIndex < 0) {
        rooms.push({"roomIndex": data[0], "spriteIndex": data[1], "bundles": []})
        roomIndex = rooms.length - 1
    }
    let bundleTemp = {"bundleName":data[2], "reward":{}, "items":[],"colorIndex":data[5],"slots":data[6]}
    let rewardData = data[3].split(" ")
    let rewardTemp = {}
    //TODO - Add reward data
    switch(rewardData[0]) {
        case "R":
        case "O":
            let nameRef = objects.default[rewardData[1]].DisplayName
            //TODO - parse text to find reference name
            break
        case "BO":
            //TODO - implement above for bigCraftables
            break
        default:
            rewardTemp = {"name":"N/A","description":"N/A","count": 0}
    }
    let itemsData = data[4].split(" ")
    
    //TODO - Loop through possible items data
    
    rooms[roomIndex].bundles.push()
}

function checkRoomName(room) {
    return room.roomIndex == this
}