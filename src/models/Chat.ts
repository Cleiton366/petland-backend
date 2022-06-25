import { Pet } from "./Pet";

type Chat = {
    chatId: string;
    ownerId: string;
    interrestedDoneeId: string;
    pet: Pet;
};
  
export { Chat };