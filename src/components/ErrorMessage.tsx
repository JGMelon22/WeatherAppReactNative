import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type Props = {
    message: string;
};

function ErrorMessage({ message }: Props) {
    return <Text style={styles.error}>{message}</Text>
}


const styles = StyleSheet.create({
    error: {
        marginTop: 24,
        textAlign: 'center',
        color: colors.error,
        fontSize: 15,
        paddingHorizontal: 24,
    },
});

export default ErrorMessage;