import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCandidates, FREE_LIMIT } from "../context/CandidatesContext";
import { globalStyles as styles } from "../styles";
import SwipeCard from "../components/SwipeCard";

type LastAction = { id: string; type: "approve" | "discard" };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const {
    deck,
    candidates,
    approveCandidate,
    discardCandidate,
    restoreCandidate,
    reviewDiscarded,
    isPro,
    unlockPro,
    avaliacoes,
    canEvaluate,
    registerEvaluation,
  } = useCandidates();

  const [lastAction, setLastAction] = useState<LastAction | null>(null);
  const [isCurrentPriority, setIsCurrentPriority] = useState(false);
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [modalProVisible, setModalProVisible] = useState(false);

  const currentCandidate = deck[0];
  const limitReached = !canEvaluate();
  const translateY = useSharedValue(0);

  const closeProfileModal = () => {
    setModalProfileVisible(false);
    translateY.value = 0;
  };

  const panGestureModal = Gesture.Pan()
    .activeOffsetY(5)
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 80 || e.velocityY > 500) {
        translateY.value = withSpring(500, { velocity: e.velocityY }, () => {
          runOnJS(closeProfileModal)(); 
        });
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleOpenProfile = () => {
    translateY.value = 0;
    setModalProfileVisible(true);
  };

  const evaluate = (type: "approve" | "discard") => {
    if (!currentCandidate) return;

    if (!canEvaluate()) {
      setModalProVisible(true);
      return;
    }

    registerEvaluation();

    if (type === "approve") {
      approveCandidate(currentCandidate.id, isCurrentPriority);
    } else {
      discardCandidate(currentCandidate.id);
    }

    setLastAction({ id: currentCandidate.id, type });
    setIsCurrentPriority(false);

    // limite free
    if (!isPro && avaliacoes + 1 >= FREE_LIMIT) {
      setModalProVisible(true);
    }
  };

  const handleApprove = () => evaluate("approve");
  const handleDiscard = () => evaluate("discard");

  const handleDoubleTap = () => setIsCurrentPriority((p) => !p);

  const handleRevert = () => {
    if (!isPro) {
      setModalProVisible(true);
      return;
    }
    if (lastAction) {
      restoreCandidate(lastAction.id);
      setLastAction(null);
      setIsCurrentPriority(false);
    }
  };

  const hasDiscarded = candidates.some((c) => c.status === "Descartado");

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <MaterialCommunityIcons
            name="code-braces"
            size={24}
            color="#7C3AED"
          />
          <Text style={styles.logoText}>RecrutaDEV</Text>
        </View>
        <TouchableOpacity
          style={styles.badgeFree}
          onPress={() => setModalProVisible(true)}
        >
          <Ionicons
            name={isPro ? "star" : "lock-closed-outline"}
            size={14}
            color="#7C3AED"
          />
          <Text style={styles.badgeFreeText}>{isPro ? "PRO" : "FREE"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subTitleLabel}>MATCH DE TALENTOS</Text>
        <Text style={styles.disparosText}>
          {isPro
            ? "Ilimitado"
            : `${avaliacoes}/${FREE_LIMIT} 
candidatos`}
        </Text>
      </View>
      <Text style={styles.mainTitle}>Descubra seu próximo talento</Text>

      {currentCandidate ? (
        <>
          <View style={styles.cardContainer}>
            <SwipeCard
              key={currentCandidate.id}
              candidate={currentCandidate}
              isPriority={isCurrentPriority}
              locked={limitReached}
              onApprove={handleApprove}
              onReject={handleDiscard}
              onLocked={() => setModalProVisible(true)}
              onPressPhoto={handleOpenProfile}
              onDoubleTap={handleDoubleTap}
            />
          </View>

          <View style={styles.actionsBar}>
            <TouchableOpacity
              style={styles.actionButtonDiscard}
              onPress={handleDiscard}
            >
              <Ionicons name="close" size={24} color="#EF4444" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButtonRevert}
              onPress={handleRevert}
            >
              <Ionicons name="arrow-undo" size={20} color="#7C3AED" />
              {!isPro && (
                <View style={styles.miniLock}>
                  <Ionicons name="lock-closed" size={10} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButtonApprove}
              onPress={handleApprove}
            >
              <Ionicons name="checkmark" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.gestureHint}>
            Arraste o card ou use os botões | 1 Toque: Bio | 2 Toques:
            Prioridade
          </Text>
        </>
      ) : (
        <View style={styles.containerEmpty}>
          <Ionicons
            name="checkmark-done-circle-outline"
            size={56}
            color="#7C3AED"
          />
          <Text style={styles.emptyText}>Triagem finalizada!</Text>
          <Text style={styles.gestureHint}>
            Você analisou todos os candidatos.
          </Text>

          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push("/candidatos")}
          >
            <Text style={styles.emptyButtonText}>Ver Painel do Gerente</Text>
          </TouchableOpacity>

          {hasDiscarded && (
            <TouchableOpacity
              style={styles.continueFreeButton}
              onPress={reviewDiscarded}
            >
              <Text style={styles.continueFreeText}>
                Rever candidatos descartados
              </Text>
            </TouchableOpacity>
          )}

          {lastAction && (
            <TouchableOpacity
              style={styles.continueFreeButton}
              onPress={handleRevert}
            >
              <Text style={styles.continueFreeText}>
                Desfazer último swipe {isPro ? "" : "(PRO)"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ---------- Bottom Sheet com bio, stacks e dados PRO ---------- */}
      <Modal
        visible={modalProfileVisible && !!currentCandidate}
        animationType="slide"
        transparent
        onRequestClose={closeProfileModal}
      >
        <View style={styles.modalOverlay}>
          <GestureDetector gesture={panGestureModal}>
            <Animated.View
              style={[
                styles.modalContent,
                { paddingBottom: 24 + insets.bottom },
                animatedSheetStyle,
              ]}
            >
              <View style={styles.dragHandle} />

              {currentCandidate && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={styles.modalProfileRow}>
                      <Image
                        source={{ uri: currentCandidate.image }}
                        style={styles.modalAvatar}
                      />
                      <View>
                        <Text style={styles.modalName}>
                          {currentCandidate.name},{currentCandidate.age}
                        </Text>
                        <Text style={styles.modalRole}>
                          {currentCandidate.role}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={closeProfileModal}>
                      <Ionicons name="close" size={24} color="#1F2937" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                  >
                    <Text style={styles.sectionTitle}>SOBRE</Text>
                    <Text style={styles.sectionBody}>
                      {currentCandidate.about}
                    </Text>

                    <Text style={styles.sectionTitle}>LINGUAGENS / STACKS</Text>
                    <View style={styles.tagsRow}>
                      {currentCandidate.technologies.map((tech, idx) => (
                        <View key={idx} style={styles.tag}>
                          <Text style={styles.tagText}>{tech}</Text>
                        </View>
                      ))}
                    </View>

                    <Text style={styles.sectionTitle}>EXPERIÊNCIA</Text>
                    <Text style={styles.sectionBody}>
                      {currentCandidate.experience}
                    </Text>

                    <Text style={styles.sectionTitle}>
                      PRETENSÃO SALARIAL E ANÁLISE
                    </Text>
                    {isPro ? (
                      <>
                        <Text style={styles.salaryUnlocked}>
                          {currentCandidate.salary}
                        </Text>
                        <Text style={styles.sectionBody}>
                          Competências:
                          {currentCandidate.skills.join(", ")}
                        </Text>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.salaryLockedContainer}
                        onPress={() => {
                          closeProfileModal();
                          setModalProVisible(true);
                        }}
                      >
                        <Text style={styles.salaryBlurred}>
                          R$ XX.XXX - R$ YY.YYY
                        </Text>
                        <View style={styles.proButtonInline}>
                          <Ionicons
                            name="lock-closed"
                            size={14}
                            color="#7C3AED"
                          />
                          <Text style={styles.proButtonInlineText}>
                            Disponível no RecrutaDEV PRO
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                </>
              )}
            </Animated.View>
          </GestureDetector>
        </View>
      </Modal>

      <Modal
        visible={modalProVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalProVisible(false)}
      >
        <View style={[styles.modalOverlay, { justifyContent: "center" }]}>
          <View style={styles.proModalCard}>
            <View style={styles.proCrownContainer}>
              <MaterialCommunityIcons name="crown" size={28} color="#7C3AED" />
            </View>
            <Text style={styles.proModalTitle}>
              Desbloqueie o RecrutaDEV PRO
            </Text>
            <Text style={styles.proModalSub}>
              {limitReached
                ? `Você já avaliou os ${FREE_LIMIT} candidatos 
gratuitos desta sessão.`
                : "Encontre o talento certo com mais contexto e agilidade."}
            </Text>

            <View style={styles.plansRow}>
              <View style={styles.planBoxFree}>
                <Text style={styles.planTitle}>FREE</Text>
                <Text style={styles.planItem}>✓ Bio e stacks</Text>
                <Text style={styles.planItem}>✓ Prioridade (2 toques)</Text>
                <Text style={styles.planItem}>
                  • {FREE_LIMIT} candidatos por sessão
                </Text>
                <Text style={styles.planItem}>✕ Sem Revert</Text>
                <Text style={styles.planItem}>✕ Salário bloqueado</Text>
              </View>

              <View style={styles.planBoxPro}>
                <Text style={styles.planTitlePro}>PRO</Text>
                <Text style={styles.planItemPro}>✓ Análise completa</Text>
                <Text style={styles.planItemPro}>✓ Prioridade (2 toques)</Text>
                <Text style={styles.planItemPro}>✓ Candidatos ilimitados</Text>
                <Text style={styles.planItemPro}>✓ Revert de swipe</Text>
                <Text style={styles.planItemPro}>✓ Salário desbloqueado</Text>
              </View>
            </View>

            {!isPro && (
              <TouchableOpacity
                style={styles.unlockButton}
                onPress={() => {
                  unlockPro();
                  setModalProVisible(false);
                }}
              >
                <Text style={styles.unlockButtonText}>Desbloquear PRO</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.continueFreeButton}
              onPress={() => setModalProVisible(false)}
            >
              <Text style={styles.continueFreeText}>
                {isPro ? "Fechar" : "Continuar com Free"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
