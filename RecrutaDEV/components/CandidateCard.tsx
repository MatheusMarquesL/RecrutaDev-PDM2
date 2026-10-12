import { Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Candidate } from "../data/candidates";
import { globalStyles as styles } from "../styles";
type Props = {
  candidate: Candidate;
  isPriority?: boolean;
  // gesto pinça na foto
  photoStyle?: ReturnType<typeof useAnimatedStyle>;
};

export default function CandidateCard({
  candidate,
  isPriority,
  photoStyle,
}: Props) {
  return (
    <View style={styles.cardInternal}>
      <View style={styles.cardPhotoBox}>
        <Animated.Image
          source={{ uri: candidate.image }}
          resizeMode="cover"
          style={[styles.cardImageFull]}
        />

        {isPriority && (
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityBadgeText}>⭐ Prioridade</Text>
          </View>
        )}
      </View>

      <View style={styles.cardInfoOverlay}>
        <Text style={styles.cardName}>
          {candidate.name}, {candidate.age}
        </Text>
        <Text style={styles.cardRole}>{candidate.role}</Text>

        <View style={styles.tagsRow}>
          {candidate.technologies.map((tech, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tech}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.cardAbout} numberOfLines={2}>
          {candidate.about}
        </Text>
      </View>
    </View>
  );
}
