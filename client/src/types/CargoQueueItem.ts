import { Cargo } from "./deckMap";

export interface CargoQueueItem {
  id: string;
  voyageId: string;
  registrationNumber: string;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
  cargo: Cargo;
}
