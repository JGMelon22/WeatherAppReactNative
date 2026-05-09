import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
    humidity: number;
    windSpeed: number;
    pressure: number;
}

function StatRow({ humidity, windSpeed, pressure }: Props) {
    return (
        <View style={styles.row}>
            <Stat label="HUMIDITY" value={`${humidity}%`}></Stat>
            <Stat label="WIND" value={`${windSpeed}m/s`}></Stat>
            <Stat label="PRESSURE" value={String(pressure)}></Stat>
        </View>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.stat}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
    },
    stat: { flex: 1, alignItems: 'center' },
    label: {
        fontSize: 11,
        color: colors.textSecondary,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    value: { fontSize: 16, fontWeight: '500', color: colors.textPrimary },
});

export default StatRow;