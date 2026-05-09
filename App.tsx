import { Activity, useState } from "react";
import { OPENWEATHER_API_KEY } from "./config";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

type Weather = {
  name: string,
  sys: { country: string };
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  wind: { speed: number };
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(trimmed)}` +
        `&appid=${OPENWEATHER_API_KEY}` +
        `&units=metric`;

      const response = await fetch(url);

      if (response.status === 404) {
        setError('City not found. Try another name.');
        return;
      }

      if (response.status === 401) {
        setError('Invalid API Key.');
        return;
      }

      if (!response.ok) {
        setError(`Server error (${response.status}). Try again later.`);
        return;
      }

      const data: Weather = await response.json();
      setWeather(data);

    } catch (error) {
      setError('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Weather</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSearch}
          disabled={loading}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#007aff" style={styles.spinner} />
      )}

      {error !== '' && !loading && (
        <Text style={styles.error}>{error}</Text>
      )}

      {weather && !loading && (
        <View style={styles.card}>
          <View style={styles.locationRow}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.country}>{weather.sys.country}</Text>
          </View>

          <Image source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          }}
            style={styles.icon}
          />

          <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
          <Text style={styles.description}>
            {weather.weather[0].description}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {Math.round(weather.main.feels_like)}°
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>HUMIDITY</Text>
              <Text style={styles.statValue}>{weather.main.humidity}%</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>WIND</Text>
              <Text style={styles.statValue}>{weather.wind.speed}m/s</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>PRESSURE</Text>
              <Text style={styles.statValue}>{weather.main.pressure}%</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f7', padding: 16 },
  title: {
    fontSize: 28, fontWeight: '600', color: '#000',
    marginTop: 8, marginBottom: 16,
  },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: {
    flex: 1, height: 44, backgroundColor: '#fff',
    borderRadius: 10, paddingHorizontal: 12, fontSize: 16, color: '#000',
  },
  button: {
    height: 44, paddingHorizontal: 16, backgroundColor: '#007aff',
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  spinner: { marginTop: 32 },
  error: {
    marginTop: 24, textAlign: 'center', color: '#d00',
    fontSize: 15, paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center',
  },
  locationRow: { flexDirection: 'row', alignItems: 'baseline' },
  cityName: { fontSize: 18, fontWeight: '600', color: '#000' },
  country: { fontSize: 14, color: '#666' },
  icon: { width: 120, height: 120, marginVertical: 8 },
  temp: { fontSize: 64, fontWeight: '300', color: '#000', lineHeight: 70 },
  description: {
    fontSize: 16, color: '#666', textTransform: 'capitalize', marginTop: 4,
  },
  feelsLike: { fontSize: 14, color: '#999', marginTop: 4 },
  statsRow: {
    flexDirection: 'row', width: '100%', marginTop: 20, paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e0e0e0',
  },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: {
    fontSize: 11, color: '#666', letterSpacing: 0.5, marginBottom: 2,
  },
  statValue: { fontSize: 16, fontWeight: '500', color: '#000' },
});

export default App;