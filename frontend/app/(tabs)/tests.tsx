import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  { q: "What is the time complexity of binary search?", opts: ["O(n)","O(log n)","O(n²)","O(1)"], ans: 1 },
  { q: "Which data structure uses LIFO principle?", opts: ["Queue","Stack","Linked List","Array"], ans: 1 },
];

export default function TestsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <ThemedText style={styles.pageTitle}>Domain Tests</ThemedText>
        <ThemedText style={styles.pageSub}>Practice aptitude and technical questions</ThemedText>
      </View>

      <View style={styles.domainTabs}>
        <DomainTab label="CS" active />
        <DomainTab label="Law" />
        <DomainTab label="MBA" />
        <DomainTab label="Data" />
      </View>

      {QUESTIONS.map((q, i) => (
        <View key={i} style={styles.questionCard}>
          <ThemedText style={styles.qNum}>Question {i + 1} of 5</ThemedText>
          <ThemedText style={styles.qText}>{q.q}</ThemedText>
          <View style={styles.options}>
            {q.opts.map((opt, j) => (
              <TouchableOpacity key={j} style={styles.option}>
                <View style={styles.radio} />
                <ThemedText style={styles.optText}>{opt}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={{marginTop: 20}}>
        <LinearGradient colors={['#14B8A6', '#0D9488']} style={styles.submitBtn}>
          <ThemedText style={styles.submitBtnText}>Submit Answers</ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DomainTab({ label, active }: any) {
  return (
    <TouchableOpacity style={[styles.tab, active && styles.activeTab]}>
      <ThemedText style={[styles.tabText, active && styles.activeTabText]}>{label}</ThemedText>
    </TouchableOpacity>
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
  header: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  pageSub: {
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  domainTabs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    borderColor: Colors.teal,
  },
  tabText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.indigo2,
  },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  qNum: {
    fontSize: 12,
    color: Colors.indigo2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  qText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 20,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: Colors.bg2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
  },
  optText: {
    fontSize: 14,
    color: '#fff',
  },
  submitBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
