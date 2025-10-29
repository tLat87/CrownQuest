import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const CrownQuestMainMenuScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Crown Academy Quest',
        message: 'A crown is not a prize of power, but a weight of purpose. Discover the hidden history of power, art, and belief in Crown Academy Quest!',
        // url: 'https://example.com/crown-quest', // Замените на реальную ссылку
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const renderCrownIcon = () => (
    <View style={styles.crownContainer}>
        <Image source={require('../crownquest-assets/img/logo.png')} style={styles.crown} />
    </View>
  );

  const renderCharacter = () => (
    <View style={styles.characterContainer}>
      {/* <View style={styles.character}> */}
        <Image source={require('../crownquest-assets/img/Man/1.png')} style={{width: 110, height: 180}} />
      {/* </View> */}
      
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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../crownquest-assets/img/5c11bbe5e16d5d7da07f52af4718639fd04d5bbe.png')} // Замените на ваш путь к изображению
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            {renderCrownIcon()}
            <Text style={styles.title}>Main menu</Text>
          </View>

          <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Quiz' as never)}
          >
            <LinearGradient
              colors={['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientButton}
            >
              <Text style={styles.menuButtonText}>QUIZ</Text>
              <Image source={require('../crownquest-assets/img/Icon/1.png')} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Stories' as never)}
          >
            <LinearGradient
              colors={['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientButton}
            >
              <Text style={styles.menuButtonText}>STORIES</Text>
              <Image source={require('../crownquest-assets/img/Icon/2.png')} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Settings' as never)}
          >
            <LinearGradient
              colors={['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientButton}
            >
              <Text style={styles.menuButtonText}>SETTINGS</Text>
              <Image source={require('../crownquest-assets/img/Icon/3.png')} />
            </LinearGradient>
          </TouchableOpacity>

          
        </View>

          {renderCharacter()}
        </ScrollView>
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
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50
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
  crownTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3
  },
  crownPoint: {
    width: 6,
    height: 6,
    backgroundColor: '#D4AF37',
    borderRadius: 3
  },
  crownBase: {
    height: 15,
    backgroundColor: '#D4AF37',
    borderRadius: 7.5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    flex: 1,
    textAlign: 'center'
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  menuButton: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6
  },
  gradientButton: {
    paddingVertical: 0,
    marginVertical: 10,
    height: 40,
    paddingHorizontal: 30,
    // width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  menuButtonText: {
    color: '#2C1810',
    fontSize: 18,
    fontWeight: 'bold'
  },
  menuIcon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C1810',
    borderRadius: 12.5
  },
  iconText: {
    fontSize: 14,
    // marginLeft: -20,
    color: '#D4AF37',
    fontWeight: 'bold'
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
  character: {
    width: 100,
    height: 120,
    alignItems: 'center',
    marginRight: 20
  },
  characterHead: {
    width: 35,
    height: 35,
    backgroundColor: '#F4C2A1',
    borderRadius: 17.5,
    marginBottom: 8
  },
  characterBody: {
    width: 70,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    position: 'relative'
  },
  characterShirt: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 8
  },
  characterVest: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    height: 44,
    backgroundColor: '#8B4513',
    borderRadius: 4
  },
  characterBowTie: {
    position: 'absolute',
    top: 12,
    left: 30,
    width: 8,
    height: 8,
    backgroundColor: '#8B4513',
    borderRadius: 4
  },
  characterArms: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 25
  },
  characterArm: {
    position: 'absolute',
    width: 12,
    height: 25,
    backgroundColor: '#F4C2A1',
    borderRadius: 6
  },
  leftArm: {
    left: -8,
    transform: [{ rotate: '-15deg' }]
  },
  rightArm: {
    right: -8,
    transform: [{ rotate: '15deg' }]
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

export default CrownQuestMainMenuScreen;
