import { CargoType, LoadingType } from "src/utils/enums";

export class CargoDTO {
    id: string;
    registrationNumber: string;
    length: number;
    width: number;
    height: number;
    type: CargoType;
    
}

export class PlaceCargoDTO {
    cargoId: string;
	loadingType: LoadingType;
	deckId: string;
	laneId: string;
	gridId: string;
}