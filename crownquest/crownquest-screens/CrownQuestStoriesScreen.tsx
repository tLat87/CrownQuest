import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../crownquest-context/CrownQuestContext';
import { stories } from '../crownquest-data/crownquest-stories';

const CrownQuestStoriesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const navigation = useNavigation();
  const { state, dispatch } = useApp();

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

  const filteredStories = stories.filter(story => {
    if (activeTab === 'saved') {
      return state.savedStories.includes(story.id);
    }
    return true;
  });

  const handleSaveStory = (storyId: string) => {
    if (state.savedStories.includes(storyId)) {
      dispatch({ type: 'UNSAVE_STORY', payload: storyId });
    } else {
      dispatch({ type: 'SAVE_STORY', payload: storyId });
    }
  };

  const renderStoryItem = ({ item }: { item: typeof stories[0] }) => (
    <TouchableOpacity
      style={styles.storyCard}
      onPress={() => (navigation as any).navigate('StoryDetail', { story: item })}
    >
      <LinearGradient
        colors={['#F9E082', '#CB911D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientStoryCard}
      >
        <Text style={styles.storyTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSaveStory(item.id)}
        >
          <Text style={styles.saveButtonText}>
            {state.savedStories.includes(item.id) ? '💾' : '💾'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
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
            <Text style={styles.title}>Global Crowns</Text>
          </View>

          <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('all')}
          >
            <LinearGradient
              colors={activeTab === 'all' ? ['#F9E082', '#CB911D'] : ['#2C1810', '#1A0F0A']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientTab}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                All
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('saved')}
          >
            <LinearGradient
              colors={activeTab === 'saved' ? ['#F9E082', '#CB911D'] : ['#2C1810', '#1A0F0A']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientTab}
            >
              <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
                Saved
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredStories}
          renderItem={renderStoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.storiesList}
          showsVerticalScrollIndicator={false}
        />

          {/* {renderCharacter()} */}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
    flex: 1,
    textAlign: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1A0F0A'
  },
  tab: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20
  },
  gradientTab: {
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center'
  },
  tabText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold'
  },
  activeTabText: {
    color: '#2C1810'
  },
  storiesList: {
    padding: 20
  },
  storyCard: {
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  gradientStoryCard: {
    // padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  storyTitle: {
    color: '#2C1810',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flex: 1
  },
  saveButton: {
    padding: 0,
    // height: 0,

    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 20,
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

export default CrownQuestStoriesScreen;
