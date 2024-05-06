interface Food {
  id: string;
  image: string;
  name: string;
  portion: number;
  nutrients: Nutrients
}

interface Nutrients {
  carbo: number;
  protein: number;
  fat: number;
}

interface Meal {
  id: string;
  foods: Food[];
  time: {
    hour: string
    minute: string
  }
}

