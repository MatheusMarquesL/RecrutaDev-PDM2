import { StyleSheet, Text, View } from "react-native";
import { Candidate } from "../data/candidates";

type Props = {
  candidate: Candidate;
};

export default function CandidateCard({ candidate }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {candidate.nome.charAt(0)}
        </Text>
      </View>

      <Text style={styles.nome}>
        {candidate.nome}
      </Text>

      <Text style={styles.idade}>
        {candidate.idade} anos
      </Text>

      <Text style={styles.cargo}>
        {candidate.cargo}
      </Text>

      <Text style={styles.experiencia}>
        Experiência: {candidate.experiencia}
      </Text>

      <Text style={styles.label}>
        Tecnologias
      </Text>

      <View style={styles.techContainer}>
        {candidate.tecnologias.map((tech) => (
          <View key={tech} style={styles.tech}>
            <Text style={styles.techText}>
              {tech}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    elevation: 5,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#222",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  nome: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  idade: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },

  cargo: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },

  experiencia: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tech: {
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  techText: {
    fontSize: 14,
  },
});