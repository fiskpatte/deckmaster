import { CargoType } from "src/utils/enums";

export class CargoDTO {
    id: string;
    registrationNumber: string;
    length: number;
    width: number;
    height: number;
    type: CargoType;
    weight: number;
}
