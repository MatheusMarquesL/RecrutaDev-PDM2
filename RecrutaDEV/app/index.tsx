import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        RecrutaDEV
      </Text>

      <Text style={styles.subtitle}>
        Encontre os melhores talentos para sua equipe.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/candidatos")}
      >
        <Text style={styles.buttonText}>
          Começar triagem
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#222",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});