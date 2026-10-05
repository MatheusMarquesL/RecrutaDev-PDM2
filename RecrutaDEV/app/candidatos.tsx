import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SwipeCard from "../components/SwipeCard";
import { candidates } from "../data/candidates";

export default function Candidatos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const candidato = candidates[currentIndex];

  function aprovar() {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function recusar() {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  if (!candidato) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Triagem finalizada</Text>

        <Text style={styles.subtitle}>Você analisou todos os candidatos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecrutaDEV</Text>

      <Text style={styles.counter}>
        Candidato {currentIndex + 1} de {candidates.length}
      </Text>

      <SwipeCard candidate={candidato} onApprove={aprovar} onReject={recusar} />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={recusar}
        >
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={aprovar}
        >
          <Text style={styles.buttonText}>Aprovar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  counter: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },

  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  rejectButton: {
    backgroundColor: "#555",
  },

  approveButton: {
    backgroundColor: "#222",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
