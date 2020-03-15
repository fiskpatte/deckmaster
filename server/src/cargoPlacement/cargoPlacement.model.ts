import * as mongoose from 'mongoose';
import { LoadingType } from "src/utils/enums";

export const CargoPlacementSchema = new mongoose.Schema({
    cargoId: String,
	loadingType: Number,
	deckId: String,
	laneId: String,
    gridId: String
})

export interface CargoPlacement extends mongoose.Document {
    id: string;
    cargoId: string;
	loadingType: LoadingType;
	deckId: string;
	laneId: string;
    gridId: string;
}

export function transformDbCargoPlacement(dbPlaceCargo){
    return {
        id: dbPlaceCargo.id,
        cargoId: dbPlaceCargo.cargoId,
        loadingType: dbPlaceCargo.loadingType,
        deckId: dbPlaceCargo.deckId,
        laneId: dbPlaceCargo.laneId,
        gridId: dbPlaceCargo.gridId
    }
}

export class CargoPlacementDto {
    cargoId: string;
	loadingType: LoadingType;
	deckId: string;
	laneId: string;
	gridId: string;
}