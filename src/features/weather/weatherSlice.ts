import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface WeatherState {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  unit: 'C' | 'F';
}

const initialState: WeatherState = {
  city: '',
  temperature: 0,
  humidity: 0,
  windSpeed: 0,
  unit: 'C',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    setHumidity: (state, action: PayloadAction<number>) => {
      state.humidity = action.payload;
    },
    setWindSpeed: (state, action: PayloadAction<number>) => {
      state.windSpeed = action.payload;
    },
    toggleUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
    },
  },
});

export const {
  setCity,
  setTemperature,
  setHumidity,
  setWindSpeed,
  toggleUnit,
} = weatherSlice.actions;

export default weatherSlice.reducer;
export const selectWeather = (state: RootState) => state.weather;
