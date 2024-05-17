export interface Food {
  id: string;
  //image: string;
  name: string;
  calories: number;
  nutrients: Nutrients;
}

export interface Nutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
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
