import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useReducer } from "react";

interface TimeState {
  hours: number;
  minutes: number;
}

const initialState: TimeState = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
};

type Action =
  | { type: 'SET_HOURS'; payload: number }
  | { type: 'SET_MINUTES'; payload: number }
  | { type: 'INCREMENT_HOURS' }
  | { type: 'DECREMENT_HOURS' }
  | { type: 'INCREMENT_MINUTES' }
  | { type: 'DECREMENT_MINUTES' };

const timeReducer = (state: TimeState, action: Action): TimeState => {
  switch (action.type) {
    case 'SET_HOURS':
      return { ...state, hours: action.payload };
    case 'SET_MINUTES':
      return { ...state, minutes: action.payload };
    case 'INCREMENT_HOURS':
      return { ...state, hours: (state.hours + 1) % 24 };
    case 'DECREMENT_HOURS':
      return { ...state, hours: (state.hours - 1 + 24) % 24 };
    case 'INCREMENT_MINUTES': {
      const newMinutes = state.minutes + 1;
      const incrementHours = newMinutes >= 60 ? 1 : 0;

      const hours = (state.hours + incrementHours) % 24
      const minutes = newMinutes % 60

      return { hours, minutes };
    }
    case 'DECREMENT_MINUTES': {
      const newMinutes = state.minutes - 1;
      const decrementHours = newMinutes < 0 ? -1 : 0;

      const hours = (state.hours + decrementHours + 24) % 24
      const minutes = (newMinutes + 60) % 60
      
      return { hours, minutes };
    }
    default:
      return state;
  }
};

interface TimeInputProps {
  setTime: (time: `${string}:${string}`) => void
}

export const TimeInput = ({ setTime }: TimeInputProps) => {
  const [state, dispatch] = useReducer(timeReducer, initialState);

  useEffect(() => {
    const hours = state.hours.toString().padStart(2, '0')
    const minutes = state.minutes.toString().padStart(2, '0')

    setTime(`${hours}:${minutes}`)
  }, [state, setTime])

  return (
    <div className="flex items-center gap-1">
      <fieldset className="w-14 flex flex-col items-center border-2 rounded-md">
        <button type="button" onClick={() => dispatch({ type: 'INCREMENT_HOURS' })}>
          <ChevronUp size={32} />
        </button>
        <span className="w-full border-y-2 px-2 py-1 text-2xl text-center font-semibold">
          {state.hours.toString().padStart(2, '0')}
        </span>
        <button type="button" onClick={() => dispatch({ type: 'DECREMENT_HOURS' })}>
          <ChevronDown size={32} />
        </button>
      </fieldset>
      <span className="text-xl font-bold">:</span>
      <fieldset className="w-14 flex flex-col items-center border-2 rounded-md">
        <button type="button" onClick={() => dispatch({ type: 'INCREMENT_MINUTES' })}>
          <ChevronUp size={32} />
        </button>
        <span className="w-full border-y-2 px-2 py-1 text-2xl text-center font-semibold">
          {state.minutes.toString().padStart(2, '0')}
        </span>
        <button type="button" onClick={() => dispatch({ type: 'DECREMENT_MINUTES' })}>
          <ChevronDown size={32} />
        </button>
      </fieldset>
    </div>
  )
}