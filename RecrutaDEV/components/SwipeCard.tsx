import { StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import CandidateCard from "./CandidateCard";
import { Candidate } from "../data/candidates";

type Props = {
  candidate: Candidate;
  onApprove: () => void;
  onReject: () => void;
};

export default function SwipeCard({
  candidate,
  onApprove,
  onReject,
}: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const resetCard = () => {
    translateX.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });

    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.2;
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        translateX.value = withTiming(400, {
          duration: 250,
        });

        translateY.value = withTiming(translateY.value, {
          duration: 250,
        });

        runOnJS(onApprove)();

        translateX.value = 0;
        translateY.value = 0;
      } else if (translateX.value < -120) {
        translateX.value = withTiming(-400, {
          duration: 250,
        });

        translateY.value = withTiming(translateY.value, {
          duration: 250,
        });

        runOnJS(onReject)();

        translateX.value = 0;
        translateY.value = 0;
      } else {
        resetCard();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = translateX.value / 15;

    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          rotate: `${rotation}deg`,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <CandidateCard candidate={candidate} />

        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Arraste para os lados
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  hint: {
    alignItems: "center",
    marginTop: -20,
    marginBottom: 10,
  },

  hintText: {
    color: "#777",
    fontSize: 14,
  },
});