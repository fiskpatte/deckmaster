import { PARSER_FIELD_MODE } from './../constants';

let fieldMode = PARSER_FIELD_MODE.INIT;

export const parseLoadPlan = async (file) => {
    let rawFile = new XMLHttpRequest();
    let data = [];
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                let allText = rawFile.responseText;
                let allTextByRows = allText.split("\r\n");
                let allTextSplitted = allTextByRows.map(r => r.split("\t"));
                let switched = false;
                for (let index = 0; index < allTextSplitted.length; index++) {
                    let element = allTextSplitted[index];
                    if (!element[0]) continue;
                    switched = setFieldMode(element[0].toLowerCase())
                    if (switched) continue;
                    setData(data, element);
                }
            }
        }
    };
    rawFile.send(null);
    return data;
}

const setFieldMode = (value) => {
    switch (value) {
        case "deck":
            fieldMode = PARSER_FIELD_MODE.DECK_NAME;
            return true;
        case "lanes":
            fieldMode = PARSER_FIELD_MODE.LANE;
            return true;
        case "grids":
            fieldMode = PARSER_FIELD_MODE.GRID;
            return true;
        default:
            return false;
    }
}

const setData = (data, dataElement) => {
    switch (fieldMode) {
        case PARSER_FIELD_MODE.DECK_NAME:
            data.push({ deck: dataElement[0], lanes: [], grids: [] });
            break;
        case PARSER_FIELD_MODE.LANE:
        case PARSER_FIELD_MODE.GRID:
            let prop = fieldMode === PARSER_FIELD_MODE.LANE ? "lanes" : "grids";
            let newElem = {
                name: dataElement[0].trim().replace("-", ""),
                length: Number(dataElement[1].replace(",", ".")),
                width: Number(dataElement[2].replace(",", ".")),
                LCG: Number(dataElement[3].replace(",", ".")),
                TCG: -Number(dataElement[4].replace(",", ".")),
                VCG: Number(dataElement[5].replace(",", ".")),
                partial: false
            };
            let lastData = data[data.length - 1];
            handlePartialLanes(lastData, newElem);
            lastData[prop].push(newElem);
            break;
        default:
            break;
    }
}

const handlePartialLanes = (lastData, newElem) => {
    if (fieldMode === PARSER_FIELD_MODE.LANE && lastData.lanes.some(l => l.name === newElem.name)) {
        let updated = lastData.lanes.reduce((r, l) => {
            if (l.name === newElem.name && l.LCG < newElem.LCG) {
                l.partial = true;
                r++;
            }
            return r;
        }, 0)
        if (updated === 0) newElem.partial = true;
    }
}