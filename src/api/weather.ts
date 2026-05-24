import { OPENWEATHER_API_KEY } from "../config";
import { Weather } from "../types/weather";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class CityNoFoundError extends Error {
    constructor(city: string) {
        super(`City "${city}" not found`);
        this.name = 'CityNotFoundError';
    }
}

export class InvalidApiKeyError extends Error {
    constructor() {
        super('Invalid API key');
        this.name = 'InvalidApiKeyError';
    }
}

export class NetWorkError extends Error {
    constructor() {
        super('Network error. Check your connection.');
        this.name = 'NewWorkError'
    }
}

export class WeatherApiError extends Error {
    constructor(public status: number) {
        super(`Server error (${status})`);
        this.name = 'WeatherApiError';
    }
}

export async function fetchWeather(city: string): Promise<Weather> {
    const url = `${BASE_URL}` +
        `?q=${encodeURIComponent(city)}` +
        `&appid=${OPENWEATHER_API_KEY}` +
        `&units=metric`;

    let response: Response;

    try {
        response = await fetch(url);
    } catch (error) {
        throw new NetWorkError();
    }

    if (response.status === 404) throw new CityNoFoundError(city);
    if (response.status === 401) throw new InvalidApiKeyError();
    if (!response.ok) throw new WeatherApiError(response.status);

    return (await response.json()) as Weather;
}