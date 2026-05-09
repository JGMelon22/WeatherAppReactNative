import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Weather } from "../types/weather";
import StatRow from "./StatRow";

type Props = {
    weather: Weather;
};

function WeatherCard({ weather }: Props) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <View style={styles.card}>
            <View style={styles.locationRow}>
                <Text style={styles.cityName}>{weather.name}</Text>
                <Text style={styles.country}>{weather.sys.country}</Text>
            </View>

            <Image source={{ uri: iconUrl }} style={styles.icon} />

            <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
            <Text style={styles.description}>{weather.weather[0].description} </Text>
            <Text style={styles.feelsLike}>
                Feels like {Math.round(weather.main.feels_like)}°
            </Text>

            <StatRow
                humidity={weather.main.humidity}
                windSpeed={weather.wind.speed}
                pressure={weather.main.pressure}
            />
        </View>
    );

}
const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },
    locationRow: { flexDirection: 'row', alignItems: 'baseline' },
    cityName: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
    country: { fontSize: 14, color: colors.textSecondary },
    icon: { width: 120, height: 120, marginVertical: 8 },
    temp: {
        fontSize: 64,
        fontWeight: '300',
        color: colors.textPrimary,
        lineHeight: 70,
    },
    description: {
        fontSize: 16,
        color: colors.textSecondary,
        textTransform: 'capitalize',
        marginTop: 4,
    },
    feelsLike: { fontSize: 14, color: colors.textTertiary, marginTop: 4 },
});

export default WeatherCard;