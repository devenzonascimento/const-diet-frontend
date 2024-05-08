export interface Food {
  id: string;
  image: string;
  name: string;
  portion: number;
  calories: number;
  nutrients: Nutrients;
}

export interface Nutrients {
  carbo: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export interface Meal {
  id: string;
  name: string;
  foods: [
    {
      id: string;
      portion: number;
    }
  ];
  time: {
    hour: string;
    minute: string;
  };
}
