import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For now, redirect to role selection
    router.replace('/role-selection');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.nav}>
          <ThemedText style={styles.logo}>HireIQ</ThemedText>
        </View>

        <View style={styles.hero}>
          <ThemedText style={styles.heroTitle}>The Future of {'\n'}<LinearGradient 
            colors={['#6366F1', '#14B8A6']} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
            style={{ borderRadius: 10 }}
          >
            <ThemedText style={[styles.heroTitle, styles.gradientText]}>Hiring & Career Prep</ThemedText>
          </LinearGradient></ThemedText>
          <ThemedText style={styles.heroDesc}>
            AI-driven interviews, smart resume analysis, and comprehensive career preparation.
          </ThemedText>
        </View>

        <View style={styles.modal}>
          <ThemedText style={styles.modalTitle}>Welcome Back</ThemedText>
          <ThemedText style={styles.modalSub}>Login to access your dashboard</ThemedText>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="hr@company.com or student@email.com"
              placeholderTextColor={Colors.muted2}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.muted2}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient 
              colors={['#6366F1', '#4F46E5']} 
              style={styles.loginButton}
            >
              <ThemedText style={styles.loginButtonText}>Login to Portal →</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={{ color: Colors.muted }}>Don't have an account? </ThemedText>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.linkText}>Sign Up</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
    letterSpacing: 1,
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
    lineHeight: 40,
  },
  gradientText: {
    backgroundColor: 'transparent',
  },
  heroDesc: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    maxWidth: 300,
  },
  modal: {
    backgroundColor: Colors.card,
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.bg2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.indigo,
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  linkText: {
    color: Colors.indigo,
    fontWeight: 'bold',
  },
});
