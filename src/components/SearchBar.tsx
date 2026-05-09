import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme/colors";
import { useState } from "react";

type Props = {
    onSearch: (city: string) => void;
    disabled?: boolean;
}

function SearchBar({ onSearch, disabled = false }: Props) {
    const [city, setCity] = useState('');

    const handleSubmit = () => {
        Keyboard.dismiss();
        onSearch(city.trim());
    };

    return (
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Enter city"
                placeholderTextColor={colors.textTertiary}
                value={city}
                onChangeText={setCity}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                autoCapitalize="words"
                autoCorrect={false}
            />
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleSubmit}
                disabled={disabled}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: colors.surface,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: colors.textPrimary,
    },
    button: {
        height: 44,
        paddingHorizontal: 16,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: { opacity: 0.7 },
    buttonDisabled: { opacity: 0.5 },
    buttonText: { color: colors.white, fontSize: 16, fontWeight: '500' },
});

export default SearchBar;