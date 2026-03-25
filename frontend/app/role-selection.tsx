import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const { setRole } = useAuth();

  const selectRole = async (role: 'hr' | 'student') => {
    console.log('Selected role:', role);
    await setRole(role);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <ThemedText style={styles.logo}>HireIQ</ThemedText>
      </View>

      <View style={styles.hero}>
        <ThemedText style={styles.heroTitle}>Choose Your Portal</ThemedText>
        <ThemedText style={styles.heroDesc}>Switch roles at login. One powerful platform for all career needs.</ThemedText>
      </View>

      <View style={styles.cardsRow}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => selectRole('hr')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, styles.hrIcon]}>
              <ThemedText style={styles.iconEmoji}>👔</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>HR Portal</ThemedText>
          </View>
          <ThemedText style={styles.cardDesc}>
            Conduct AI interviews, scan resumes, and manage your entire hiring pipeline.
          </ThemedText>
          <LinearGradient 
            colors={['#6366F1', '#4F46E5']} 
            style={styles.btn}
          >
            <ThemedText style={styles.btnText}>Login as HR →</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => selectRole('student')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, styles.studentIcon]}>
              <ThemedText style={styles.iconEmoji}>🎓</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Student Portal</ThemedText>
          </View>
          <ThemedText style={styles.cardDesc}>
            Build your resume, practice with AI mock interviews, and ace domain tests.
          </ThemedText>
          <LinearGradient 
            colors={['#14B8A6', '#0D9488']} 
            style={styles.btn}
          >
            <ThemedText style={styles.btnText}>Login as Student →</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  nav: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    fontFamily: 'System',
  },
  hero: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
  },
  cardsRow: {
    paddingHorizontal: 20,
    gap: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.indigo,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hrIcon: {
    backgroundColor: 'rgba(99,102,241,0.2)',
  },
  studentIcon: {
    backgroundColor: 'rgba(20,184,166,0.2)',
  },
  iconEmoji: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDesc: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 22,
    marginBottom: 24,
  },
  btn: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
