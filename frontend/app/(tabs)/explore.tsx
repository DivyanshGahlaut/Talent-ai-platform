import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue, withSequence, interpolate } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function MockInterviewScreen() {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const mouthAnim = useSharedValue(8);
  const waveAnim = useSharedValue(1);

  useEffect(() => {
    if (isInterviewing) {
      mouthAnim.value = withRepeat(
        withSequence(withTiming(16, { duration: 150 }), withTiming(8, { duration: 150 })),
        -1,
        true
      );
      waveAnim.value = withRepeat(
        withSequence(withTiming(1.5, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        true
      );
    } else {
      mouthAnim.value = 8;
      waveAnim.value = 1;
    }
  }, [isInterviewing]);

  const animatedMouthStyle = useAnimatedStyle(() => ({
    height: mouthAnim.value,
  }));

  const animatedWaveStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: waveAnim.value }],
  }));

  if (!isInterviewing) {
    return (
      <View style={styles.container}>
        <View style={styles.setupCard}>
          <ThemedText style={styles.setupTitle}>⚙️ Setup Your Mock Interview</ThemedText>
          <ThemedText style={styles.label}>Interview Type</ThemedText>
          <View style={styles.pickerPlaceholder}><ThemedText style={{color: '#fff'}}>SDE-1 Technical</ThemedText></View>
          
          <ThemedText style={[styles.label, {marginTop: 16}]}>Duration</ThemedText>
          <View style={styles.pickerPlaceholder}><ThemedText style={{color: '#fff'}}>30 minutes</ThemedText></View>

          <TouchableOpacity style={{marginTop: 32}} onPress={() => setIsInterviewing(true)}>
            <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.startBtn}>
              <ThemedText style={styles.startBtnText}>🎤 Start Mock Interview</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.avatarPanel}>
        <View style={styles.aiAvatar}>
          <View style={styles.aiFace}>
            <View style={styles.aiEyeContainer}>
              <View style={styles.aiEye} />
              <View style={styles.aiEye} />
            </View>
            <Animated.View style={[styles.aiMouth, animatedMouthStyle]} />
          </View>
        </View>

        <View style={styles.soundWaves}>
          <Animated.View style={[styles.waveBar, animatedWaveStyle]} />
          <Animated.View style={[styles.waveBar, { height: 20 }, animatedWaveStyle]} />
          <Animated.View style={[styles.waveBar, { height: 10 }, animatedWaveStyle]} />
          <Animated.View style={[styles.waveBar, { height: 24 }, animatedWaveStyle]} />
          <Animated.View style={[styles.waveBar, { height: 12 }, animatedWaveStyle]} />
        </View>

        <ThemedText style={styles.aiName}>ARIA — AI Interviewer</ThemedText>
        <ThemedText style={styles.aiStatus}>Asking Question 1 of 6</ThemedText>

        <View style={styles.questionBubble}>
          <ThemedText style={styles.questionText}>
            Tell me about yourself and walk me through your resume. What makes you a good fit for this role?
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <ThemedText style={styles.actionBtnText}>Next Question ⟶</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.dangerBtn]} onPress={() => setIsInterviewing(false)}>
            <ThemedText style={styles.actionBtnText}>End Interview</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { marginTop: 20 }]}>
        <ThemedText style={styles.cardTitle}>Real-Time Analysis</ThemedText>
        <View style={styles.analysisGrid}>
          <MetricPill label="Eye Contact" status="Good" color={Colors.green} />
          <MetricPill label="Posture" status="Slouching" color={Colors.amber} />
          <MetricPill label="Voice" status="Clear" color={Colors.green} />
          <MetricPill label="Confidence" status="72%" color={Colors.indigo} />
        </View>
      </View>
    </ScrollView>
  );
}

function MetricPill({ label, status, color }: any) {
  return (
    <View style={styles.metricPill}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText style={styles.pillText}>{label}: {status}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  setupCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 32,
    marginTop: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  setupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 8,
  },
  pickerPlaceholder: {
    backgroundColor: Colors.bg2,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    borderRadius: 12,
  },
  startBtn: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarPanel: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiAvatar: {
    width: 140,
    height: 140,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiFace: {
    width: 100,
    height: 120,
    backgroundColor: '#162032',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2A3F5F',
    alignItems: 'center',
    paddingTop: 30,
  },
  aiEyeContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  aiEye: {
    width: 14,
    height: 14,
    backgroundColor: Colors.indigo,
    borderRadius: 7,
  },
  aiMouth: {
    width: 28,
    borderRadius: 14,
    backgroundColor: Colors.indigo,
    position: 'absolute',
    bottom: 25,
  },
  soundWaves: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 30,
    marginBottom: 16,
  },
  waveBar: {
    width: 3,
    height: 14,
    backgroundColor: Colors.indigo,
    borderRadius: 2,
  },
  aiName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  aiStatus: {
    fontSize: 13,
    color: Colors.teal,
    marginBottom: 24,
  },
  questionBubble: {
    backgroundColor: Colors.card2,
    borderLeftWidth: 3,
    borderLeftColor: Colors.indigo,
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  questionText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionBtn: {
    backgroundColor: Colors.card2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dangerBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: Colors.red,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  analysisGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    color: '#fff',
  },
});
