interface Food {
  id: string;
  image: string;
  name: string;
  portion: number;
  calories: number;
  nutrients: Nutrients
}

interface Nutrients {
  carbo: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
}

interface Meal {
  id: string;
  foods: Food[];
  time: {
    hour: string
    minute: string
  }
}

