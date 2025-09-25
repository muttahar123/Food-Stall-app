import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native'
import React from 'react'

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-l0dX7MHpkHhvs2hlgAm1X2luxl9Ds7.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to the <Text style={styles.highlightText}>Saylani</Text></Text>
        <Text style={styles.welcomeSubText}>Welfare</Text>
        <Text style={styles.ngoText}>Non Governmental{'\n'}Organization in Pakistan</Text>
        
        <Text style={styles.description}>
          The largest NGO offering free <Text style={styles.highlightText}>daily Meals</Text>{'\n'}
          Saylani Welfare is on the ground and already working with local communities to assess how best to support underprivileged families in more than 63 areas of day to day lives.
        </Text>
        
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Explorer More →</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>General</Text>
          <Text style={styles.statsValue}>0</Text>
          <Text style={styles.statsLabel}>Rs.</Text>
        </View>
      </View>

      <View style={styles.servicesGrid}>
        <TouchableOpacity style={styles.serviceCard}>
          <Text style={styles.serviceText}>Blood Bank / Thalassemia Treatment</Text>
        </TouchableOpacity>
        
        <View style={styles.serviceRow}>
          <TouchableOpacity style={[styles.serviceCard, styles.smallCard]}>
            <Text style={styles.serviceText}>Family Kifalat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.serviceCard, styles.smallCard]}>
            <Text style={styles.serviceText}>Medical</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.serviceCard, styles.smallCard]}>
            <Text style={styles.serviceText}>Food</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <View style={styles.footer}>
        <Image 
          source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-l0dX7MHpkHhvs2hlgAm1X2luxl9Ds7.png' }}
          style={styles.footerLogo}
          resizeMode="contain"
        />
        
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/saylaniwelfare')}>
            <View style={[styles.socialIcon, {backgroundColor: '#3b5998'}]}>
              <Text style={styles.socialIconText}>f</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/saylaniwelfare')}>
            <View style={[styles.socialIcon, {backgroundColor: '#000000'}]}>
              <Text style={styles.socialIconText}>𝕏</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com/saylaniwelfare')}>
            <View style={[styles.socialIcon, {backgroundColor: '#FF0000'}]}>
              <Text style={styles.socialIconText}>▶</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/yourwhatsappnumber')}>
            <View style={[styles.socialIcon, {backgroundColor: '#25D366'}]}>
              <Text style={styles.socialIconText}>W</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>About</Text>
          <TouchableOpacity><Text style={styles.footerLink}>Introduction</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Chairman Message</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Annual Report</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Bank Details</Text></TouchableOpacity>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Explore</Text>
          <TouchableOpacity><Text style={styles.footerLink}>News</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Media</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Contact</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 60,
  },
  welcomeSection: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  welcomeSubText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ngoText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  highlightText: {
    color: '#8DC63F', // Saylani green color
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#8DC63F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  statsLabel: {
    fontSize: 16,
    color: '#333',
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  servicesGrid: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  smallCard: {
    width: '32%',
  },
  serviceText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    marginTop: 20,
  },
  footerLogo: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerSection: {
    marginBottom: 20,
  },
  footerHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerLink: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
})

