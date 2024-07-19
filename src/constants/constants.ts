import { Food, CycleIllustrationType } from "@/types/types";

export const UNIT: Record<Food['unit'], string> = {
  "GRAMS": "g",
  "MILILITERS": "ml",
}

export const UNIT_OPTIONS = [
  { text: "Gramas", value: "GRAMS" },
  { text: "Mililitros", value: "MILILITERS" },
]

export const HOURS_OPTIONS = [
  { text: '00', value: '00' },
  { text: '01', value: '01' },
  { text: '02', value: '02' },
  { text: '03', value: '03' },
  { text: '04', value: '04' },
  { text: '05', value: '05' },
  { text: '06', value: '06' },
  { text: '07', value: '07' },
  { text: '08', value: '08' },
  { text: '09', value: '09' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' },
  { text: '13', value: '13' },
  { text: '14', value: '14' },
  { text: '15', value: '15' },
  { text: '16', value: '16' },
  { text: '17', value: '17' },
  { text: '18', value: '18' },
  { text: '19', value: '19' },
  { text: '20', value: '20' },
  { text: '21', value: '21' },
  { text: '22', value: '22' },
  { text: '23', value: '23' },
];

export const MINUTES_OPTIONS = [
  { text: '00', value: '00' },
  { text: '05', value: '05' },
  { text: '10', value: '10' },
  { text: '15', value: '15' },
  { text: '20', value: '20' },
  { text: '25', value: '25' },
  { text: '30', value: '30' },
  { text: '35', value: '35' },
  { text: '40', value: '40' },
  { text: '45', value: '45' },
  { text: '50', value: '50' },
  { text: '55', value: '55' },
];

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