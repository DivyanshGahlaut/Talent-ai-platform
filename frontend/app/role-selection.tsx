import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const { setRole } = useAuth();

  const selectRole = async (role: 'talent' | 'recruiter') => {
    console.log('Selected role:', role);
    await setRole(role);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Join as</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>Choose how you want to use Talent AI</ThemedText>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => selectRole('talent')}
        >
          <View style={styles.iconContainer}>
            <ThemedText style={styles.roleIcon}>🚀</ThemedText>
          </View>
          <ThemedText style={styles.roleTitle}>I'm a Talent</ThemedText>
          <ThemedText style={styles.roleDescription}>
            Building my career and looking for opportunities.
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => selectRole('recruiter')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FF9500' }]}>
            <ThemedText style={styles.roleIcon}>💼</ThemedText>
          </View>
          <ThemedText style={styles.roleTitle}>I'm a Recruiter</ThemedText>
          <ThemedText style={styles.roleDescription}>
            Looking for the best talent to grow my team.
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 8,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#007AFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIcon: {
    fontSize: 32,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
