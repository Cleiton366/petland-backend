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
  image: File;
  user: User;
};

export { Pet };
