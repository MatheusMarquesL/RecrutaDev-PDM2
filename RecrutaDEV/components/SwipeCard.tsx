import { StyleSheet } from "react-native"; 
import Animated, { 
  runOnJS, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming, 
} from "react-native-reanimated"; 
import { Gesture, GestureDetector } from 
"react-native-gesture-handler"; 
 
import CandidateCard from "./CandidateCard"; 
import { Candidate } from "../data/candidates"; 
 
type Props = { 
  candidate: Candidate; 
  isPriority: boolean; 
  locked: boolean; 
  onApprove: () => void; 
  onReject: () => void; 
  onLocked: () => void; 
  onPressPhoto: () => void; 
  onDoubleTap: () => void; 
}; 
 
const SWIPE_X = 120; 
const SWIPE_UP = -100; 
 
export default function SwipeCard({ 
  candidate, 
  isPriority, 
  locked, 
  onApprove, 
  onReject, 
  onLocked, 
  onPressPhoto, 
  onDoubleTap, 
}: Props) { 
  const translateX = useSharedValue(0); 
  const translateY = useSharedValue(0); 
  const scale = useSharedValue(1); 
 
  const springBack = () => { 
    "worklet"; 
    translateX.value = withSpring(0, { damping: 15, stiffness: 150 }); 
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 }); 
  }; 
 

  const panGesture = Gesture.Pan() 
    .maxPointers(1) 
    .activeOffsetX([-10, 10]) 
    .activeOffsetY([-10, 10]) 
    .onUpdate((e) => { 
      translateX.value = e.translationX; 
      translateY.value = e.translationY * 0.3; 
    }) 
    .onEnd((e) => { 
      const goRight = translateX.value > SWIPE_X || e.velocityX > 800; 
      const goLeft = translateX.value < -SWIPE_X || e.velocityX < -800; 
 
      if ((goRight || goLeft) && locked) { 
        springBack(); 
        runOnJS(onLocked)(); 
      } else if (goRight) { 
        translateX.value = withTiming(500, { duration: 220 }, 
(finished) => { 
          if (finished) runOnJS(onApprove)(); 
        }); 
      } else if (goLeft) { 
        translateX.value = withTiming(-500, { duration: 220 }, 
(finished) => { 
          if (finished) runOnJS(onReject)(); 
        }); 
      } else if (e.translationY < SWIPE_UP && Math.abs(e.translationX) 
< 50) { 
        springBack(); 
        runOnJS(onPressPhoto)(); 
      } else { 
        springBack(); 
      } 
    }); 
 

  const pinchGesture = Gesture.Pinch() 
    .onUpdate((e) => { 
      scale.value = Math.max(1, Math.min(e.scale, 3)); 
    }) 
    .onEnd(() => { 
      scale.value = withSpring(1); 
    }); 
 
  const doubleTapGesture = Gesture.Tap() 
    .numberOfTaps(2) 
    .onEnd((_e, success) => { 
      if (success) runOnJS(onDoubleTap)(); 
    }); 
 
  const singleTapGesture = Gesture.Tap() 
    .numberOfTaps(1) 
    .onEnd((_e, success) => { 
      if (success) runOnJS(onPressPhoto)(); 
    }); 
 
  const taps = Gesture.Exclusive(doubleTapGesture, singleTapGesture); 
  const composedGestures = Gesture.Race(panGesture, pinchGesture, 
taps); 
 
  const cardStyle = useAnimatedStyle(() => ({ 
    transform: [ 
      { translateX: translateX.value }, 
      { translateY: translateY.value }, 
      { rotate: `${translateX.value / 15}deg` }, 
    ], 
  })); 
 
  const photoStyle = useAnimatedStyle(() => ({ 
    transform: [{ scale: scale.value }], 
  })); 
 
  // selos no card
  const approveLabelStyle = useAnimatedStyle(() => ({ 
    opacity: Math.min(Math.max(translateX.value / SWIPE_X, 0), 1), 
  })); 
  const rejectLabelStyle = useAnimatedStyle(() => ({ 
    opacity: Math.min(Math.max(-translateX.value / SWIPE_X, 0), 1), 
  })); 
 
  return ( 
    <GestureDetector gesture={composedGestures}> 
      <Animated.View style={[styles.container, cardStyle]}> 
        <CandidateCard candidate={candidate} isPriority={isPriority} 
photoStyle={photoStyle} /> 
 
        <Animated.Text style={[styles.label, styles.approveLabel, 
approveLabelStyle]}> 
          APROVAR 
        </Animated.Text> 
        <Animated.Text style={[styles.label, styles.rejectLabel, 
rejectLabelStyle]}> 
          DESCARTAR 
        </Animated.Text> 
      </Animated.View> 
    </GestureDetector> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    width: "100%", 
    flex: 1, 
  }, 
  label: { 
    position: "absolute", 
    top: 24, 
    fontSize: 22, 
    fontWeight: "bold", 
    borderWidth: 3, 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    backgroundColor: "rgba(255,255,255,0.85)", 
  }, 
  approveLabel: { 
    left: 20, 
    color: "#10B981", 
    borderColor: "#10B981", 
    transform: [{ rotate: "-15deg" }], 
  }, 
  rejectLabel: { 
    right: 20, 
    color: "#EF4444", 
    borderColor: "#EF4444", 
    transform: [{ rotate: "15deg" }], 
  }, 
});