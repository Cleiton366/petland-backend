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
};

export { Pet };
