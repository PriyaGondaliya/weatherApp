import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Weather from '../components/Weather';
import { store } from '../store';

describe('Weather', () => {
    test('renders the weather component', () => {
        render(
            <Provider store={store}>
            <Weather />
            </Provider>
        );
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    test('searches for the weather in the given city', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => ({
            name: 'London',
            main: { temp: 10, humidity: 80 },
            wind: { speed: 5 },
            }),
        });
        render(
            <Provider store={store}>
            <Weather />
            </Provider>
        );
      
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'London');
        const button = screen.getByRole('button', { name: 'Search' });
        userEvent.click(button);
      
        expect(global.fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?q=London&appid=13cdd25b9d5681796cc24799a09298ff&units=metric`
        );
      
        expect(await screen.findByText('City: London')).toBeInTheDocument();
        expect(await screen.findByText('Temperature: 10 °C')).toBeInTheDocument();
        expect(await screen.findByText('Humidity: 80%')).toBeInTheDocument();
        expect(await screen.findByText('Wind speed: 5 miles per hour')).toBeInTheDocument();
    });

    test('toggles between Celsius and Fahrenheit', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => ({
                name: 'Paris',
                main: { temp: 20, humidity: 70 },
                wind: { speed: 10 },
            }),
        });
        render(
            <Provider store={store}>
              <Weather />
            </Provider>
        );
          
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'Paris');
        const button = screen.getByRole('button', { name: 'Search' });
        userEvent.click(button);
        
        const toggle = screen.getByRole('button', {
        name: 'Switch to Fahrenheit',
        });
        userEvent.click(toggle);
        
        expect(await screen.findByText('Temperature: 68 °F')).toBeInTheDocument();
    });        
});