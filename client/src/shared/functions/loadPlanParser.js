export const parseLoadPlan = async (file) => {
    let rawFile = new XMLHttpRequest();
    let lanes = [];
    let grids = [];
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                let allText = rawFile.responseText;
                let allTextByRows = allText.split("\r\n");
                let allTextSplitted = allTextByRows.map(r => r.split("\t"));
                let fieldMode = 0;//1 -> Deck name, 2 -> Lane, 3 -> grid -- MAKE CONSTANT LATER
                let switched = false;
                for (let index = 0; index < allTextSplitted.length; index++) {
                    let element = allTextSplitted[index];
                    if(!element[0]) continue;
                    let lowerCaseFirstElement = element[0].toLowerCase();
                    switch (lowerCaseFirstElement) {
                        case "deck":
                            fieldMode = 1;
                            switched = true;
                            break;
                        case "lanes":
                            fieldMode = 2;
                            switched = true;
                            break;
                        case "grids":
                            fieldMode = 3;
                            switched = true;
                            break;
                        default:
                            switched = false;
                            break;
                    }
                    if (switched) continue;
                    switch (fieldMode) {
                        case 1:
                            lanes.push({ "deck": element[0], "lanes": [], "grids": [] });
                            break;
                        case 2:
                        case 3:
                            let prop = fieldMode === 2 ? "lanes": "grids";
                            lanes[lanes.length - 1][prop].push({
                                "name": element[0],
                                "length": Number(element[1].replace(",",".")),
                                "width": Number(element[2].replace(",",".")),
                                "LCG": Number(element[3].replace(",",".")),
                                "TCG": -Number(element[4].replace(",",".")),
                                "VCG": Number(element[5].replace(",","."))
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
    rawFile.send(null);
    return lanes;
}