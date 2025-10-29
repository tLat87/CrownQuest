import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  man?: any;
}

const slides: OnboardingSlide[] = [
  {
    title: 'Welcome to Crown Academy Quest',
    description: 'Enter a world where crowns tell stories of power, art, and destiny. Travel through centuries of history and uncover the secrets behind royal symbols.',
    buttonText: 'Begin Your Quest',
    image: 'onboarding1',
    man: require('../crownquest-assets/img/Man/1.png')
  },
  {
    title: 'Discover the Stories Behind the Jewels',
    description: 'Every crown has a story — of faith, ambition, and beauty. Read richly written histories from across civilizations and eras. Experience the human side of royalty.',
    buttonText: 'Explore Stories',
    image: 'onboarding2',
    man: require('../crownquest-assets/img/Man/2.png')
  },
  {
    title: 'Learn, Play, and Explore',
    description: 'Test your knowledge through quick interactive quizzes. Connect the dots between empires, cultures, and craftsmanship. Turn curiosity into discovery.',
    buttonText: 'Start Learning',
    image: 'onboarding3',
    man: require('../crownquest-assets/img/Man/3.png')
  },
  {
    title: 'Choose Your Path',
    description: 'Test your knowledge through quick interactive quizzes. Connect the dots between empires, cultures, and craftsmanship. Turn curiosity into discovery.',
    buttonText: 'Enter the Academy',
    image: 'onboarding4'
  }
];

const CrownQuestOnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('Survey' as never);
    }
  };

  const handleSkipToMain = () => {
    navigation.navigate('Main' as never);
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Crown Academy Quest',
        message: 'A crown is not a prize of power, but a weight of purpose. Discover the hidden history of power, art, and belief in Crown Academy Quest!',
        // url: 'https://example.com/crown-quest',
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

  const renderCharacter = () => {
    const getCharacterPosition = () => {
      switch (currentSlide) {
        case 0:
          return {
            bottom: -60,
            left: -20,
            right: 0,
            alignItems: 'center' as const
          };
        case 1:
          return {
            bottom: -60,
            // left: 0,
            right: -20,
            alignItems: 'flex-start' as const
          };
        case 2:
          return {
            bottom: -60,
            // left: 0,
            right: -20,
            alignItems: 'flex-end' as const
          };
        case 3:
          return {
            bottom: -60,
            // left: 0,
            right: -2-0,
            alignItems: 'center' as const
          };
        default:
          return {
            bottom: -60,
            left: 0,
            right: 0,
            alignItems: 'center' as const
          };
      }
    };

    const getCharacterSize = () => {
      switch (currentSlide) {
        case 0:
          return { width: 280, height: 450 };
        case 1:
          return { width: 250, height: 400 };
        case 2:
          return { width: 300, height: 480 };
        case 3:
          return { width: 260, height: 420 };
        default:
          return { width: 280, height: 450 };
      }
    };

    return (
      <View style={[styles.characterContainer, getCharacterPosition()]}>
        <Image source={slides[currentSlide].man} style={getCharacterSize()} />
      </View>
    );
  };

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
          <View style={styles.content}>
          {renderCrownIcon()}
          
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
          
          {currentSlide < 3 && renderCharacter()}
          
          {currentSlide === 3 && (
            <View style={styles.finalCrownContainer}>
              {renderCrownIcon()}
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <LinearGradient
                colors={['#F9E082', '#CB911D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>{slides[currentSlide].buttonText}</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipButton} onPress={handleSkipToMain}>
              <Text style={styles.skipButtonText}>Skip to Main Menu</Text>
            </TouchableOpacity>
          </View>
          </View>
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
  content: {
    flex: 1,
    minHeight: height - 100, // Ensure minimum height for proper spacing
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  crownContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  crown: {
    width: 150,
    height: 165
  },
  finalCrownContainer: {
    alignItems: 'center',
    marginVertical: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    zIndex: 100,
    marginBottom: 20
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    borderRadius: 25
  },
  gradientButton: {
    borderRadius: 25,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: 'bold'
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  skipButtonText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  characterContainer: {
    position: 'absolute',
    flexDirection: 'row',
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

export default CrownQuestOnboardingScreen;
