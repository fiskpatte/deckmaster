import { PARSER_FIELD_MODE } from '../constants';
import { Deck, Lane, Grid, DeckMapType, Frame } from '../types/deckMap';
import { getAdjacentSide } from '../modules/deckMap/DeckMap.functions';

let fieldMode = PARSER_FIELD_MODE.INIT;
let currentKey = "";
let count = 1;
export const parseLoadPlan = async (file: string) => {
    let data: DeckMapType = {};
    await fetch(file).then(response => response.text()).then(allText => {
        const allTextByRows = allText.split(/\r?\n/);
        const allTextSplitted = allTextByRows.map(r => r.split("\t"));
        let switched = false;
        for (let index = 0; index < allTextSplitted.length; index++) {
            let element = allTextSplitted[index];
            if (!element[0]) continue;
            switched = setFieldMode(element[0].toLowerCase())
            if (switched) continue;
            setData(data, element);
        }
    })
    console.log(data)
    return data;
}

const setFieldMode = (value: string): boolean => {
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
        case "frames":
            fieldMode = PARSER_FIELD_MODE.FRAME;
            return true;
        default:
            return false;
    }
}

const setData = (data: DeckMapType, dataElement: string[]) => {
    switch (fieldMode) {
        case PARSER_FIELD_MODE.DECK_NAME:
            currentKey = dataElement[0]
            data[currentKey] = { name: currentKey, lanes: [], grids: [], frames: [], sortOrder: 4 };
            break;
        case PARSER_FIELD_MODE.LANE:
        case PARSER_FIELD_MODE.GRID:
            let newElem = {
                id: count,
                name: dataElement[0].trim().replace("-", ""),
                length: Number(dataElement[1].replace(",", ".")),
                width: Number(dataElement[2].replace(",", ".")),
                LCG: Number(dataElement[3].replace(",", ".")),
                TCG: -Number(dataElement[4].replace(",", ".")),
                VCG: Number(dataElement[5].replace(",", ".")),
            };
            let lastData = data[currentKey];
            if (fieldMode === PARSER_FIELD_MODE.LANE) {
                let lane = { ...newElem, partial: false, grids: [], cargo: [], adjacentLanes: [] } as Lane
                handlePartialLanes(lastData, lane);
                assignAdjacentLanes(lastData, lane);
                lastData.lanes.push(lane);
            } else {
                assignLane(lastData.lanes, newElem as Grid);
                lastData.grids.push(newElem);
            }
            count++;//TODO: Change when we get id data.
            break;
        case PARSER_FIELD_MODE.FRAME:
            let frame = {
                id: Number(dataElement[0]),
                distance: Number(dataElement[1].replace(",", "."))
            } as Frame;
            data[currentKey].frames.push(frame)
            break;
        default:
            break;
    }
}

const handlePartialLanes = (deck: Deck, newLane: Lane) => {
    let possibleLanes = deck.lanes.filter(l => l.name === newLane.name)
    if (possibleLanes.length > 0) {
        let updated = deck.lanes.reduce((r, l) => {
            if (l.name === newLane.name && l.LCG < newLane.LCG) {
                l.partial = true;
                r++;
            }
            return r;
        }, 0)
        if (updated < possibleLanes.length) newLane.partial = true;
    }
}

const assignLane = (lanes: Array<Lane>, grid: Grid) => {
    let laneName = grid.name.substr(0, 4);
    let possibleLanes = lanes.filter(l => l.name === laneName && grid.LCG > l.LCG - l.length / 2);
    if (possibleLanes.length === 1) {
        possibleLanes[0].grids.push(grid);
        return;
    }
    let lane = possibleLanes.reduce((r: Lane | null, l) => {
        return r?.LCG && r.LCG > l.LCG - l.length / 2 ? r : l;
    }, null);
    lane?.grids.push(grid);
}

const assignAdjacentLanes = (deck: Deck, newLane: Lane) => {
    deck.lanes.forEach((lane) => {
        let adjacentSide = getAdjacentSide(lane, newLane);
        if (adjacentSide) {
            newLane.adjacentLanes.push({ ...lane, adjacentSide: -adjacentSide });
            lane.adjacentLanes.push({ ...newLane, adjacentSide: adjacentSide });
        }
    })
}