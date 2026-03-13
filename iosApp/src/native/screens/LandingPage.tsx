import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import LinearGradient from 'react-native-linear-gradient';

type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const { width } = Dimensions.get('window');

export default function LandingPage({ navigation }: LandingPageProps) {
  const features = [
    {
      title: 'Text Refinement',
      description: 'Transform casual messages into professional, polished text.',
      icon: '✨',
      color: '#9333ea',
      bgColor: '#f3e8ff',
    },
    {
      title: 'Smart Response',
      description: 'Analyze chat history to generate contextual responses.',
      icon: '💬',
      color: '#2563eb',
      bgColor: '#dbeafe',
    },
    {
      title: 'Lightning Fast',
      description: 'Get refined text in seconds.',
      icon: '⚡',
      color: '#eab308',
      bgColor: '#fef3c7',
    },
    {
      title: 'Privacy First',
      description: 'All processing happens locally.',
      icon: '🔒',
      color: '#16a34a',
      bgColor: '#dcfce7',
    },
  ];

  const useCases = [
    {
      title: 'Professional Communication',
      description: 'Transform casual messages into professional emails.',
      icon: '💼',
    },
    {
      title: 'Quick Responses',
      description: 'Get intelligent response suggestions.',
      icon: '⚡',
    },
    {
      title: 'Save Time',
      description: 'Stop overthinking every message.',
      icon: '⏰',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <View style={styles.heroContent}>
          <View style={styles.logoBox}>
            <Text style={styles.logoEmoji}>✨</Text>
          </View>

          <Text style={styles.heroTitle}>
            Polish Your Messages{'\n'}
            <Text style={styles.heroTitleGradient}>Before You Send</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Transform casual WhatsApp messages into professional text, or get smart response suggestions based on your conversation history.
          </Text>

          {/* CTA Buttons */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('App')}
          >
            <LinearGradient
              colors={['#22c55e', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started Free</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Refinement Styles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Chat Messages</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1s</Text>
              <Text style={styles.statLabel}>Processing Time</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Powerful Features</Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need to communicate better
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View
                style={[
                  styles.featureIconBox,
                  { backgroundColor: feature.bgColor },
                ]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>
          Get polished messages in three simple steps
        </Text>

        <View style={styles.stepsContainer}>
          {[1, 2, 3].map((step, index) => (
            <View key={step} style={styles.stepItem}>
              <LinearGradient
                colors={
                  step === 1
                    ? ['#22c55e', '#059669']
                    : step === 2
                    ? ['#3b82f6', '#4f46e5']
                    : ['#a855f7', '#ec4899']
                }
                style={styles.stepNumber}
              >
                <Text style={styles.stepNumberText}>{step}</Text>
              </LinearGradient>
              <Text style={styles.stepTitle}>
                {step === 1
                  ? 'Paste Your Message'
                  : step === 2
                  ? 'Choose Your Style'
                  : 'Copy & Send'}
              </Text>
              <Text style={styles.stepDescription}>
                {step === 1
                  ? 'Copy text from WhatsApp or type directly'
                  : step === 2
                  ? 'Select from Professional, Casual, Concise, or Friendly'
                  : 'Get your refined text and copy it back'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Use Cases */}
      <View style={styles.useCasesSection}>
        <Text style={styles.sectionTitle}>Perfect For</Text>
        <Text style={styles.sectionSubtitle}>
          TextRefine adapts to your communication needs
        </Text>

        {useCases.map((useCase, index) => (
          <View key={index} style={styles.useCaseCard}>
            <Text style={styles.useCaseIcon}>{useCase.icon}</Text>
            <View style={styles.useCaseContent}>
              <Text style={styles.useCaseTitle}>{useCase.title}</Text>
              <Text style={styles.useCaseDescription}>{useCase.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Final CTA */}
      <LinearGradient
        colors={['#22c55e', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaSection}
      >
        <Text style={styles.ctaTitle}>Ready to Transform Your Messages?</Text>
        <Text style={styles.ctaSubtitle}>
          Join users who are already communicating better with TextRefine.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('App')}
        >
          <Text style={styles.ctaButtonText}>Launch TextRefine</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerIcon}>✨</Text>
        <Text style={styles.footerTitle}>TextRefine</Text>
        <Text style={styles.footerSubtitle}>Polish your messages before you send</Text>
        <Text style={styles.footerCopyright}>© 2026 TextRefine. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  heroContainer: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
    minHeight: '100%',
  },
  heroContent: {
    alignItems: 'center',
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#22c55e',
  },
  logoEmoji: {
    fontSize: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleGradient: {
    color: '#059669',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 320,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonArrow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16a34a',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  featuresSection: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  howItWorksSection: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
  },
  stepsContainer: {
    gap: 24,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  useCasesSection: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f0fdf4',
  },
  useCaseCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  useCaseIcon: {
    fontSize: 24,
  },
  useCaseContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  useCaseDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  ctaSection: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#dbeafe',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  footerIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  footerCopyright: {
    fontSize: 10,
    color: '#6b7280',
  },
});
