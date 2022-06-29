import { User } from "./User";
type Pet = {
  donatorId: string;
  ownerId: string;
  petName: string;
  petAddress: {
    city: string;
    state: string;
  };
  age: number;
  medicalCondition: string;
  petType: string;
  imagebuf: Buffer;
  donatorInfo: User;
};

export { Pet };
