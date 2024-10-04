import * as objects from './JSON/Objects.json'
import * as bigCraftables from './JSON/BigCraftables.json'
import * as stringsObj from './JSON/ObjectsStrings.json'
import * as stringsBC from './JSON/BigCraftablesStrings.json'
import * as strings_1_6 from './JSON/1_6_Strings.json'

let rooms = []
let bundleProgress = []
let roomReward = ""

/* Sends the room data */
export function getRooms() {
    return rooms;
}

/* Loads a save file from input load event */
export async function loadFile(evt) {
    let saveFile = evt.target.files[0]
    console.log(saveFile)
    return await parseSave(saveFile)
}

/* Loads data from a save file in order to be parsed */
async function parseSave(saveFile) {
    let myPromise = new Promise(function(resolve) {
        const reader = new FileReader()
        if(saveFile) {
            reader.readAsText(saveFile)
        }
        reader.addEventListener("load", async function (evt) {
            //resolve(parseBundleData(evt.target.result))
            resolve(parseData(evt.target.result))
        }, false)
    })
    return await myPromise
}

function parseData(textFile) {
    parseBundleData(textFile)
    parseProgress(textFile)
    let fileData = { "rooms": rooms, "progress": bundleProgress }
    return fileData
}

/* Extracts bundle information from save file and iterates over bundles to populate rooms[] */
function parseBundleData(textFile) {
    rooms = []
    let bundleData = textFile.split("bundleData")
    let bundlesString = bundleData[1].slice(1,-2)
    bundlesString = bundlesString.replaceAll(/<\/value>/g,".")
    bundlesString = bundlesString.replaceAll(/<\/key>/g,"/")
    bundlesString = bundlesString.replaceAll(/<\/|<|>|value|key|item|string/g,"")
    let bundlesArray = bundlesString.split(".")
    bundlesArray.forEach(parseBundle)
    //Test print of data on load
    console.log(rooms)
    return rooms
}

/* Extracts bundle completion info from save file */
function parseProgress(textFile) {
    bundleProgress = []
    let bundleData = textFile.split("bundles")
    let bundlesString = bundleData[1].slice(1,-2)
    bundlesString = bundlesString.replaceAll(/<\/key>/g,"/")
    bundlesString = bundlesString.replaceAll(/<\/boolean><boolean>/g,",")
    bundlesString = bundlesString.replaceAll(/<\/item><item>/g,".")
    bundlesString = bundlesString.replaceAll(/<\/|<|>|value|key|item|boolean|int|ArrayOfBoolean/g,"")
    let bundlesArray = bundlesString.split(".")
    bundlesArray.forEach(parseBundleProgress)
    //Test print of data on load
    console.log(bundleProgress)
    return bundleProgress
}

/* Parses bundle progress and stores it in bundleProgress[] */
function parseBundleProgress(bundle) {
    let data = bundle.split("/")
    let bundleState = { "bundleIndex": data[0], "rewardCollected": false, "itemsComplete": [] }
    let itemsComplete = data[1].split(",")
    itemsComplete.forEach((item) => {
        bundleState.itemsComplete.push(JSON.parse(item))
    })
    bundleProgress.push(bundleState)
}

/* Parses bundle information and stores it in rooms[] */
function parseBundle(bundle) {
    //Check if bundle data is valid
    if(bundle == null || bundle == '') {
        return
    }
    let data = bundle.split("/")
    //Checks if room exists already, if not then adds room
    let roomIndex = rooms.findIndex(checkRoomName, data[0])
    if(roomIndex < 0) {
        switch(data[0]) {
        case "Crafts Room":
            roomReward = "Bridge Repair"
        break
        case "Pantry":
            roomReward = "Greenhouse"
        break
        case "Fish Tank":
            roomReward = "Glittering Boulder Removed"
        break
        case "Boiler Room":
            roomReward = "Minecarts Repaired"
        break
        case "Bulletin Board":
            roomReward = "Friendship <3"
        break
        case "Vault":
            roomReward = "Bus Repair"
        break
        default:
            roomReward = "???"
        break
        }
        rooms.push({"roomIndex": data[0], "reward": roomReward,"bundles": []})
        roomIndex = rooms.length - 1
    }
    //Initializes bundle data
    let bundleTemp = {"bundleIndex":data[1], "bundleName":data[2], "reward":{}, "items":[], 
        "colorIndex": parseInt(data[5]), "slots": 0, "spriteIndex": 0, "texture":"JunimoNote"}
    if(data[6] != "") {
        bundleTemp.slots = parseInt(data[6])
    }
    if(data[7] == "") {
        if(data[6] != "") {
            bundleTemp.spriteIndex = 36
        } else {
            bundleTemp.spriteIndex = 27 - parseInt(data[5])
        }
    }
    else if(data[7].includes("LooseSprites")) {
        let tempSprite = data[7].replaceAll("LooseSprites\\", "")
        tempSprite = tempSprite.split(":")
        bundleTemp.spriteIndex = parseInt(tempSprite[1])
        bundleTemp.texture = tempSprite[0]
    } else {
        bundleTemp.spriteIndex = parseInt(data[7])
    }
    let rewardData = data[3].split(" ")
    let rewardTemp = {"name":"N/A","description":"N/A","count": 0,"spriteIndex":-1,"texture":"Objects"}
    //Generates reward data based on JSON data
    switch(rewardData[0]) {
        case "R":
        case "O":
            rewardTemp.name = parseReference(objects.default[rewardData[1]].DisplayName)
            rewardTemp.description = parseReference(objects.default[rewardData[1]].Description)
            rewardTemp.spriteIndex = objects.default[rewardData[1]].SpriteIndex
            rewardTemp.count = rewardData[2]
            rewardTemp.type = "Object"
            if(objects.default[rewardData[1]].Texture != null) {
                let tempReward = objects.default[rewardData[1]].Texture
                tempReward = tempReward.replaceAll("TileSheets\\","")
                rewardTemp.texture = tempReward
            } else {
                rewardTemp.texture = "Objects"
            }
            break
        case "BO":
            rewardTemp.name = parseReference(bigCraftables.default[rewardData[1]].DisplayName)
            rewardTemp.description = parseReference(bigCraftables.default[rewardData[1]].Description)
            rewardTemp.spriteIndex = bigCraftables.default[rewardData[1]].SpriteIndex
            rewardTemp.count = rewardData[2]
            rewardTemp.type = "Craftable"
            if(bigCraftables.default[rewardData[1]].Texture != null) {
                let tempReward = bigCraftables.default[rewardData[1]].Texture
                tempReward = tempReward.replaceAll("TileSheets\\","")
                rewardTemp.texture = tempReward
            } else {
                rewardTemp.texture = "Craftables"
            }
            break
    }

    bundleTemp.reward = rewardTemp
    //Iterates over all items and generates item data based on JSON data
    let itemsData = data[4].split(" ")
    let itemTemp = {}
    for (let i = 0; i < (itemsData.length / 3); i++) {
        itemTemp = {"name":"N/A","description":"N/A","count": 0,"minQuality":"None",
            "spriteIndex":-1, "texture":"Objects"}
        if(itemsData[i * 3] == "-1") {
            itemTemp.name = itemsData[(i * 3) + 1]
            itemTemp.description = itemsData[(i * 3) + 1]
        } else {
            //Check for special cases
            if(itemsData[i * 3] == "-5") {
                itemsData[i * 3] = "174"
            }
            if(itemsData[i * 3] == "-6") {
                itemsData[i * 3] = "186"
            }
            itemTemp.name = parseReference(objects.default[itemsData[i * 3]].DisplayName)
            itemTemp.description = parseReference(objects.default[itemsData[i * 3]].Description)
            itemTemp.spriteIndex = objects.default[itemsData[i * 3]].SpriteIndex
            if(objects.default[itemsData[i * 3]].Texture != null) {
                let tempString = objects.default[itemsData[i * 3]].Texture
                tempString = tempString.replaceAll("TileSheets\\","")
                itemTemp.texture = tempString
            }
            
            itemTemp.count = itemsData[(i * 3) + 1]
            switch(itemsData[(i * 3) + 2]) {
                case "3":
                    itemTemp.minQuality = "Iridium"
                    break
                case "2":
                    itemTemp.minQuality = "Gold"
                    break
                case "1":
                    itemTemp.minQuality = "Silver"
                    break
                default:
                    itemTemp.minQuality = "None"
            }
        }
        bundleTemp.items.push(itemTemp)
    }
    rooms[roomIndex].bundles.push(bundleTemp)
}

/* Checks if room name matches room name passed as 'this' */
function checkRoomName(room) {
    return room.roomIndex == this
}

/* Loads appropriate string from String JSON files */
function parseReference(ref) {
    let result = ""
    let temp = ref.replaceAll(/\[|\]/g,"").replaceAll(/\\/g,":")
    let data = temp.split(":")
    switch(data[1]) {
        case "Objects":
            result = stringsObj[data[2]]
            break
        case "BigCraftables":
            result = stringsBC[data[2]]
            break
        case "1_6_Strings":
            result = strings_1_6[data[2]]
            break
        default:
            result = "Reference Missing"
    }
    return result
}