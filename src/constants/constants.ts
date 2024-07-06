import { Food, CycleIllustrationType } from "@/types/types";

export const UNIT: Record<Food['unit'], string> = {
  "GRAMS": "g",
  "MILILITERS": "ml",
}

export const UNIT_OPTIONS = [
  { text: "Gramas", value: "GRAMS" },
  { text: "Mililitros", value: "MILILITERS" },
]

export const EVERY_DAY_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R1'
  },
  {
    day: 'qua',
    number: 'R1'
  },
  {
    day: 'qui',
    number: 'R1'
  },
  {
    day: 'sex',
    number: 'R1'
  },
  {
    day: 'sab',
    number: 'R1'
  },
  {
    day: 'dom',
    number: 'R1'
  },
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R1'
  },
  {
    day: 'qua',
    number: 'R1'
  },
  {
    day: 'qui',
    number: 'R1'
  },
  {
    day: 'sex',
    number: 'R1'
  },
  {
    day: 'sab',
    number: 'R1'
  },
  {
    day: 'dom',
    number: 'R1'
  },
]

export const ALTERNATED_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R2'
  },
  {
    day: 'qua',
    number: 'R1'
  },
  {
    day: 'qui',
    number: 'R2'
  },
  {
    day: 'sex',
    number: 'R1'
  },
  {
    day: 'sab',
    number: 'R2'
  },
  {
    day: 'dom',
    number: 'R1'
  },
  {
    day: 'seg',
    number: 'R2'
  },
  {
    day: 'ter',
    number: 'R1'
  },
  {
    day: 'qua',
    number: 'R2'
  },
  {
    day: 'qui',
    number: 'R1'
  },
  {
    day: 'sex',
    number: 'R2'
  },
  {
    day: 'sab',
    number: 'R1'
  },
  {
    day: 'dom',
    number: 'R2'
  },
]

export const WEEKLY_1_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R2'
  },
  {
    day: 'qua',
    number: 'R3'
  },
  {
    day: 'qui',
    number: 'R4'
  },
  {
    day: 'sex',
    number: 'R5'
  },
  {
    day: 'sab',
    number: 'R6'
  },
  {
    day: 'dom',
    number: 'R7'
  },
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R2'
  },
  {
    day: 'qua',
    number: 'R3'
  },
  {
    day: 'qui',
    number: 'R4'
  },
  {
    day: 'sex',
    number: 'R5'
  },
  {
    day: 'sab',
    number: 'R6'
  },
  {
    day: 'dom',
    number: 'R7'
  },
]

export const WEEKLY_2_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R2'
  },
  {
    day: 'qua',
    number: 'R3'
  },
  {
    day: 'qui',
    number: 'R3'
  },
  {
    day: 'sex',
    number: 'R4'
  },
  {
    day: 'sab',
    number: 'R5'
  },
  {
    day: 'dom',
    number: 'R2'
  },
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R2'
  },
  {
    day: 'qua',
    number: 'R3'
  },
  {
    day: 'qui',
    number: 'R3'
  },
  {
    day: 'sex',
    number: 'R4'
  },
  {
    day: 'sab',
    number: 'R5'
  },
  {
    day: 'dom',
    number: 'R2'
  },
]

export const CUSTOM_1_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R6'
  },
  {
    day: 'ter',
    number: 'R3'
  },
  {
    day: 'qua',
    number: 'R7'
  },
  {
    day: 'qui',
    number: 'R4'
  },
  {
    day: 'sex',
    number: 'R1'
  },
  {
    day: 'sab',
    number: 'R1'
  },
  {
    day: 'dom',
    number: 'R5'
  },
  {
    day: 'seg',
    number: 'R2'
  },
  {
    day: 'ter',
    number: 'R7'
  },
  {
    day: 'qua',
    number: 'R6'
  },
  {
    day: 'qui',
    number: 'R3'
  },
  {
    day: 'sex',
    number: 'R7'
  },
  {
    day: 'sab',
    number: 'R4'
  },
  {
    day: 'dom',
    number: 'R1'
  },
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R5'
  },
  {
    day: 'qua',
    number: 'R2'
  },
  {
    day: 'qui',
    number: 'R7'
  },
]

export const CUSTOM_2_CYCLE: CycleIllustrationType[] = [
  {
    day: 'seg',
    number: 'R4'
  },
  {
    day: 'ter',
    number: 'R7'
  },
  {
    day: 'qua',
    number: 'R1'
  },
  {
    day: 'qui',
    number: 'R1'
  },
  {
    day: 'sex',
    number: 'R4'
  },
  {
    day: 'sab',
    number: 'R7'
  },
  {
    day: 'dom',
    number: 'R1'
  },
  {
    day: 'seg',
    number: 'R1'
  },
  {
    day: 'ter',
    number: 'R4'
  },
  {
    day: 'qua',
    number: 'R7'
  },
  {
    day: 'qui',
    number: 'R1'
  },
  {
    day: 'sex',
    number: 'R1'
  },
]