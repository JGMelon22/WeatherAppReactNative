import { ActivityIndicator, StatusBar, StyleSheet, Text } from "react-native";
import { colors } from "./src/theme/colors";
import { useState } from "react";
import { Weather } from "./src/types/weather";
import { CityNoFoundError, fetchWeather, InvalidApiKeyError, NetWorkError, WeatherApiError } from "./src/api/weather";
import WeatherCard from "./src/components/WeatherCard";
import ErrorMessage from "./src/components/ErrorMessage";
import SearchBar from "./src/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCache, setCache } from "./src/config/storage";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city: string) => {
    if (!city) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const cached = getCache<Weather>(city);
      if (cached) {
        setWeather(cached)
        setLoading(false);
        return;
      }

      const data = await fetchWeather(city);
      setWeather(data);
      setCache(city, data)
    } catch (error) {
      if (error instanceof CityNoFoundError) {
        setError('City not found. Try another name.')
      } else if (error instanceof InvalidApiKeyError) {
        setError('Invalid API key.')
      } else if (error instanceof NetWorkError) {
        setError('Network erro. Check your connection.')
      } else if (error instanceof WeatherApiError) {
        setError(`Server error (${error.status}). Try again later.`)
      } else {
        setError('Something went wrong.')
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Weather</Text>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.spinner}
        />
      )}

      {error !== '' && !loading && <ErrorMessage message={error} />}

      {weather && !loading && <WeatherCard weather={weather} />}
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 16,
  },
  spinner: { marginTop: 32 },
});

export default App;