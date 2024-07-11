import * as objects from './JSON/Objects.json'
import * as bigCraftables from './JSON/BigCraftables.json'
import * as stringsObj from './JSON/ObjectsStrings.json'
import * as stringsBC from './JSON/BigCraftablesStrings.json'
import * as strings_1_6 from './JSON/1_6_Strings.json'

let rooms = []
const reader = new FileReader()

/* Sends the room data */
export function getRooms() {
    return rooms;
}

/* Loads a save file from input load event */
export function loadFile(evt) {
    let saveFile = evt.target.files[0]
    console.log(saveFile)
    parseSave(saveFile)
}

/* Loads data from a save file in order to be parsed */
function parseSave(saveFile) {
    if(saveFile) {
        reader.readAsText(saveFile)
    }
    reader.addEventListener("load", function (evt) {
        parseBundleData(evt.target.result)
    }, false)
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
        rooms.push({"roomIndex": data[0], "spriteIndex": data[1], "bundles": []})
        roomIndex = rooms.length - 1
    }
    //Initializes bundle data
    let bundleTemp = {"bundleName":data[2], "reward":{}, "items":[],"colorIndex":data[5],"slots":data[6]}
    if(data[6] == "") {
        bundleTemp.slots = 0
    }
    let rewardData = data[3].split(" ")
    let rewardTemp = {"name":"N/A","description":"N/A","count": 0}
    //Generates reward data based on JSON data
    switch(rewardData[0]) {
        case "R":
        case "O":
            rewardTemp.name = parseReference(objects.default[rewardData[1]].DisplayName)
            rewardTemp.description = parseReference(objects.default[rewardData[1]].Description)
            rewardTemp.count = rewardData[2]
            break
        case "BO":
            rewardTemp.name = parseReference(bigCraftables.default[rewardData[1]].DisplayName)
            rewardTemp.description = parseReference(bigCraftables.default[rewardData[1]].Description)
            rewardTemp.count = rewardData[2]
            break
    }
    bundleTemp.reward = rewardTemp
    //Iterates over all items and generates item data based on JSON data
    let itemsData = data[4].split(" ")
    let itemTemp = {}
    for (let i = 0; i < (itemsData.length / 3); i++) {
        itemTemp = {"name":"N/A","description":"N/A","count": 0,"minQuality":"None"}
        if(itemsData[i * 3] == "-1") {
            itemTemp.name = itemsData[(i * 3) + 1]
            itemTemp.description = itemsData[(i * 3) + 1]
        } else {
            itemTemp.name = parseReference(objects.default[itemsData[i * 3]].DisplayName)
            itemTemp.description = parseReference(objects.default[itemsData[i * 3]].Description)
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