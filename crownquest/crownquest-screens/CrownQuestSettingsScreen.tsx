import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../crownquest-context/CrownQuestContext';

const CrownQuestSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useApp();

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Crown Academy Quest',
        message: 'Discover the hidden history of power, art, and belief in Crown Academy Quest! Download now and start your journey through the ages.',
        // url: 'https://example.com/crown-quest',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleToggleMusic = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { musicEnabled: !state.settings.musicEnabled }
    });
  };

  const handleToggleVibration = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { vibrationEnabled: !state.settings.vibrationEnabled }
    });
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h.${mins}m.`;
  };

  const renderCrownIcon = () => (
    <View style={styles.crownContainer}>
      <Image source={require('../crownquest-assets/img/logo.png')} style={styles.crown} />
    </View>
  );

  const renderCharacter = () => (
    <View style={styles.characterContainer}>
      <Image source={require('../crownquest-assets/img/Man/1.png')} style={{width: 110, height: 180}} />
      
      <TouchableOpacity style={styles.speechBubble} onPress={handleShare}>
        <Text style={styles.quote}>
          "A crown is not a prize of{'\n'}
          power, but a weight of{'\n'}
          purpose."
        </Text>
        <Text style={styles.shareText}>Share&gt;</Text>
      </TouchableOpacity>
    </View>
  );

  const renderToggle = (isEnabled: boolean) => (
    <View style={[styles.toggle, isEnabled && styles.toggleEnabled]}>
      <View style={[styles.toggleThumb, isEnabled && styles.toggleThumbEnabled]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../crownquest-assets/img/5c11bbe5e16d5d7da07f52af4718639fd04d5bbe.png')} // Замените на ваш путь к изображению
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.header}>
          {renderCrownIcon()}
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            
            {/* <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Music</Text>
              <TouchableOpacity onPress={handleToggleMusic}>
                {renderToggle(state.settings.musicEnabled)}
              </TouchableOpacity>
            </View> */}
            
            <View style={styles.separator} />
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <TouchableOpacity onPress={handleToggleVibration}>
                {renderToggle(state.settings.vibrationEnabled)}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Time spent studying articles</Text>
              <Text style={styles.statValue}>
                {formatTime(state.userStats.timeSpentReading)}
              </Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Time spent on quizzes</Text>
              <Text style={styles.statValue}>
                {formatTime(state.userStats.timeSpentQuizzes)}
              </Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>How many times was the correct answer given?</Text>
              <Text style={styles.statValue}>
                {state.userStats.correctAnswers} times
              </Text>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>How many times was the wrong answer given?</Text>
              <Text style={styles.statValue}>
                {state.userStats.wrongAnswers} times
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <LinearGradient
              colors={['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientShareButton}
            >
              <Text style={styles.shareButtonText}>Share the app</Text>
              <Text style={styles.shareIcon}>📤</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* {renderCharacter()} */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1810'
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    opacity: 0.3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37'
  },
  crownContainer: {
    marginRight: 15
  },
  crown: {
    width: 50,
    height: 65
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    flex: 1,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 20
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  settingLabel: {
    fontSize: 16,
    color: '#D4AF37',
    flex: 1
  },
  statItem: {
    paddingVertical: 15
  },
  statLabel: {
    fontSize: 16,
    color: '#D4AF37',
    marginBottom: 5
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37'
  },
  separator: {
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.3
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#666666',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2
  },
  toggleEnabled: {
    backgroundColor: '#D4AF37'
  },
  toggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    alignSelf: 'flex-start'
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end'
  },
  shareButton: {
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 25
  },
  gradientShareButton: {

    borderRadius: 25,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shareButtonText: {
    color: '#2C1810',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flex: 1
  },
  shareIcon: {
    fontSize: 20,
    color: '#2C1810',
    marginRight: 10,
  },
  characterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  speechBubble: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 15,
    maxWidth: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#B8941F'
  },
  quote: {
    fontSize: 13,
    color: '#2C1810',
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 8,
    fontWeight: '500'
  },
  shareText: {
    fontSize: 11,
    color: '#2C1810',
    textAlign: 'right',
    fontWeight: 'bold'
  }
});

export default CrownQuestSettingsScreen;
