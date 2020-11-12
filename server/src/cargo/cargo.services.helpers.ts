import { CargoType } from 'src/utils/enums';
import { Chance } from 'chance';
import { Cargo } from './cargo.model';

export const getRandomCargo = (regNumber: string) => {
  const chance = new Chance();
  const registrationNumber = !regNumber
    ? `${chance.string({
        length: 3,
        casing: 'upper',
        alpha: true,
        numeric: false,
      })} ${chance.string({ length: 3, pool: '1234567890' })}`
    : regNumber;

  // 0-1
  const random = Math.random();

  let length, width, height, type, weight;

  if (random < 0.8) {
    // Standard trailer
    length = 13.62;
    width = 2.48;
    height = 2.7;
    weight = chance.integer({ min: 10, max: 20 });
    type = CargoType.Trailer;
  } else if (random < 0.9) {
    // MAFI 40
    length = 12.19;
    width = 2.44;
    height = 1.5;
    weight = chance.integer({ min: 30, max: 40 });
    type = CargoType.Mafi40;
  } else {
    // Oversize cargo
    length = 10;
    width = 4;
    height = 2.5;
    weight = chance.integer({ min: 20, max: 30 });
    type = CargoType.OversizeCargo;
  }

  const dto = {
    registrationNumber,
    length,
    width,
    height,
    type,
    weight,
  } as Cargo;

  return dto;
};
