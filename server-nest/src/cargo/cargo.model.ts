import * as mongoose from 'mongoose';
import { CargoType } from "src/utils/enums";

export const CargoSchema = new mongoose.Schema({
    registrationNumber: String,
    length: Number,
    width: Number,
    height: Number,
    type: Number
})

// export interface Cargo extends mongoose.Document {
//     id: string;
//     registrationNumber: string;
//     length: number;
//     width: number;
//     height: number;
//     type: CargoType;
// }

export interface Cargo extends mongoose.Document {
    id: string;
    registrationNumber: string;
    length: number;
    width: number;
    height: number;
    type: CargoType;
}


export function transformDbCargo(dbCargo){
    return {
        id: dbCargo.id,
        registrationNumber: dbCargo.registrationNumber,
        length: dbCargo.length,
        width: dbCargo.width,
        height: dbCargo.height,
        type: dbCargo.type
    }
}