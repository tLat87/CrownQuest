import React, { useState } from 'react';
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
import { eras } from '../crownquest-data/crownquest-eras';

const CrownQuestSurveyScreen: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const navigation = useNavigation();
  const { dispatch } = useApp();

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

  const handleEraSelect = (eraId: string) => {
    setSelectedEra(eraId);
  };

  const handleAnswer = () => {
    if (selectedEra) {
      dispatch({ type: 'SET_SELECTED_ERA', payload: selectedEra });
      dispatch({ type: 'SET_SURVEY_COMPLETED', payload: true });
      navigation.navigate('Main' as never);
    }
  };

  const handleSkip = () => {
    // Randomly select an era if user skips
    const randomEra = eras[Math.floor(Math.random() * eras.length)];
    dispatch({ type: 'SET_SELECTED_ERA', payload: randomEra.id });
    dispatch({ type: 'SET_SURVEY_COMPLETED', payload: true });
    navigation.navigate('Main' as never);
  };



  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../crownquest-assets/img/5c11bbe5e16d5d7da07f52af4718639fd04d5bbe.png')} // Замените на ваш путь к изображению
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.header}>
          {renderCrownIcon()}
          <Text style={styles.title}>Survey</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.question}>
            Which era of crowns calls to you the most?
          </Text>

          <View style={styles.optionsContainer}>
            {eras.map((era) => (
              <TouchableOpacity
                key={era.id}
                style={styles.optionButton}
                onPress={() => handleEraSelect(era.id)}
              >
                <LinearGradient
                  colors={selectedEra === era.id ? ['#F9E082', '#CB911D'] : ['#F9E082', '#CB911D']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientOptionButton}
                >
                  <Text style={styles.optionText}>
                    {era.name} — {era.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* {renderCharacter()} */}

          <TouchableOpacity
            style={styles.answerButton}
            onPress={handleAnswer}
            disabled={!selectedEra}
          >
            <LinearGradient
              colors={!selectedEra ? ['#666666', '#444444'] : ['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientAnswerButton}
            >
              <Text style={styles.answerButtonText}>Answer</Text>
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
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28
  },
  optionsContainer: {
    marginBottom: 30
  },
  optionButton: {
    marginBottom: 15,
    borderRadius: 15
  },
  gradientOptionButton: {
    // paddingVertical: 15,
    // paddingHorizontal: 20,
    height: 60,
    justifyContent:'center',
    borderRadius: 15,
    alignItems: 'center'
  },
  optionText: {
    color: '#2C1810',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500'
  },
  answerButton: {
    marginBottom: 30,
    borderRadius: 25
  },
  gradientAnswerButton: {
    // paddingVertical: 15,
    height:50,
    // paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent:'center', 
    alignItems: 'center'
  },
  answerButtonText: {
    color: '#2C1810',
    fontSize: 16,
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

export default CrownQuestSurveyScreen;
