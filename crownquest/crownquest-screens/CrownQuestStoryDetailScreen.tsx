import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../crownquest-context/CrownQuestContext';
import { Story } from '../types';

const CrownQuestStoryDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { state, dispatch } = useApp();
  const { story } = route.params as { story: Story };
  const [startTime] = useState(Date.now());

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

  useEffect(() => {
    // Track reading time when component unmounts
    return () => {
      const readingTime = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      if (readingTime > 0) {
        dispatch({
          type: 'UPDATE_STATS',
          payload: {
            timeSpentReading: state.userStats.timeSpentReading + readingTime,
            storiesRead: state.userStats.storiesRead + 1
          }
        });
      }
    };
  }, [startTime, dispatch, state.userStats.timeSpentReading, state.userStats.storiesRead]);

  const handleSaveStory = () => {
    if (state.savedStories.includes(story.id)) {
      dispatch({ type: 'UNSAVE_STORY', payload: story.id });
    } else {
      dispatch({ type: 'SAVE_STORY', payload: story.id });
    }
  };

  const isSaved = state.savedStories.includes(story.id);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../crownquest-assets/img/5c11bbe5e16d5d7da07f52af4718639fd04d5bbe.png')} // Замените на ваш путь к изображению
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.header}>
          {renderCrownIcon()}
          <Text style={styles.title}>Story</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{story.title}</Text>
          
          <View style={styles.contentContainer}>
            <Text style={styles.storyContent}>{story.content}</Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Quiz' as never)}
            >
              <LinearGradient
                colors={['#F9E082', '#CB911D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientActionButton}
              >
                <Text style={styles.actionButtonText}>Take Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSaveStory}
            >
              <LinearGradient
                colors={['#2C1810', '#1A0F0A']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientSecondaryButton}
              >
                <Text style={styles.secondaryButtonText}>
                  {isSaved ? 'Remove from Saved' : 'Save Story'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 32
  },
  contentContainer: {
    backgroundColor: '#1A0F0A',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20
  },
  storyContent: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'justify'
  },
  actionsContainer: {
    paddingBottom: 30
  },
  actionButton: {
    marginBottom: 15,
    borderRadius: 25
  },
  gradientActionButton: {

    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientSecondaryButton: {

    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37'
  },
  actionButtonText: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButtonText: {
    color: '#D4AF37'
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

export default CrownQuestStoryDetailScreen;
