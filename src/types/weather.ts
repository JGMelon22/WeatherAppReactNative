export type Weather = {
    name: string,
    sys: { country: string };
    weather: { main: string; description: string; icon: string }[];
    main: { temp: number; feels_like: number; humidity: number; pressure: number };
    wind: { speed: number };
}