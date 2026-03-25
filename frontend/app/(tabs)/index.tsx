import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { userProfile } = useAuth();
  const role = userProfile?.role || 'student';

  if (role === 'hr') {
    return <HrOverview />;
  }
  return <StudentOverview />;
}

function HrOverview() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <ThemedText style={styles.pageTitle}>Hiring Dashboard</ThemedText>
        <ThemedText style={styles.pageSub}>TechCorp India · SDE Batch 2025</ThemedText>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="Total Applicants" value="148" change="↑ 12 this week" color={Colors.indigo2} />
        <StatCard label="Interviews Done" value="67" change="↑ 8 today" color={Colors.amber} />
        <StatCard label="Selected" value="23" change="↑ 3 this week" color={Colors.green} />
        <StatCard label="Rejected" value="44" change="of 67 interviewed" color={Colors.red} />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>🔴 Top Rejection Reasons</ThemedText>
        <View style={styles.card}>
          <ChartRow label="Weak DSA" pct={72} color={Colors.red} />
          <ChartRow label="Communication" pct={58} color={Colors.amber} />
          <ChartRow label="Posture" pct={34} color={Colors.indigo} />
          <ChartRow label="Confidence" pct={49} color={Colors.teal} />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>✅ Recent Decisions</ThemedText>
        <View style={styles.card}>
          <DecisionRow name="Rahul Verma" status="Selected" statusColor={Colors.green} />
          <DecisionRow name="Sneha Patel" status="Rejected" statusColor={Colors.red} />
          <DecisionRow name="Amit Kumar" status="On Hold" statusColor={Colors.amber} />
          <DecisionRow name="Divya Singh" status="Selected" statusColor={Colors.green} />
        </View>
      </View>
    </ScrollView>
  );
}

function StudentOverview() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <ThemedText style={styles.pageTitle}>Resume Builder</ThemedText>
        <ThemedText style={styles.pageSub}>Choose a template and fill your details</ThemedText>
      </View>

      <ThemedText style={styles.sectionTitle}>🖼️ Choose Template</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templateScroll}>
        <TemplateThumb name="Modern" gradient={['#6366F1', '#4F46E5']} />
        <TemplateThumb name="Classic" gradient={['#1a2236', '#1a2236']} borderColor={Colors.amber} />
        <TemplateThumb name="Minimal" gradient={['#0D1117', '#0D1117']} borderColor={Colors.green} />
        <TemplateThumb name="Bold" gradient={['#0f172a', '#1e293b']} borderColor={Colors.teal} />
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>1️⃣ Contact Info</ThemedText>
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <View style={styles.inputPlaceholder}><ThemedText style={styles.inputText}>Arjun Sharma</ThemedText></View>
          </View>
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Phone</ThemedText>
            <View style={styles.inputPlaceholder}><ThemedText style={styles.inputText}>+91 98765 43210</ThemedText></View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.btn}>
              <ThemedText style={styles.btnText}>Apply Changes →</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value, change, color }: any) {
  return (
    <View style={styles.statCard}>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={[styles.statValue, { color }]}>{value}</ThemedText>
      <ThemedText style={styles.statChange}>{change}</ThemedText>
    </View>
  );
}

function ChartRow({ label, pct, color }: any) {
  return (
    <View style={styles.chartRow}>
      <ThemedText style={styles.chartLabel}>{label}</ThemedText>
      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <ThemedText style={styles.chartPct}>{pct}%</ThemedText>
    </View>
  );
}

function DecisionRow({ name, status, statusColor }: any) {
  return (
    <View style={styles.decisionRow}>
      <ThemedText style={styles.decisionName}>{name}</ThemedText>
      <View style={[styles.badge, { backgroundColor: statusColor + '22' }]}>
        <ThemedText style={[styles.badgeText, { color: statusColor }]}>{status}</ThemedText>
      </View>
    </View>
  );
}

function TemplateThumb({ name, gradient, borderColor }: any) {
  return (
    <TouchableOpacity style={[styles.templateThumb, borderColor ? { borderColor } : {}]}>
      <LinearGradient colors={gradient} style={styles.templatePreview} />
      <ThemedText style={styles.templateName}>{name}</ThemedText>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    width: (width - 64) / 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statChange: {
    fontSize: 12,
    color: Colors.green,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  chartLabel: {
    fontSize: 13,
    color: Colors.muted,
    width: 100,
  },
  barOuter: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.bg2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    borderRadius: 4,
  },
  chartPct: {
    fontSize: 12,
    color: Colors.muted,
    width: 35,
    textAlign: 'right',
  },
  decisionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + '55',
  },
  decisionName: {
    fontSize: 15,
    color: '#fff',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  templateScroll: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  templateThumb: {
    width: 120,
    height: 160,
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templatePreview: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
    marginBottom: 8,
  },
  templateName: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 6,
  },
  inputPlaceholder: {
    backgroundColor: Colors.bg2,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputText: {
    color: '#fff',
    fontSize: 14,
  },
  btn: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
