import React, { useState, useEffect } from 'react';
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
import { useApp } from '../crownquest-context/CrownQuestContext';
import { quizzes } from '../crownquest-data/crownquest-quizzes';
import { QuizQuestion } from '../types';

const CrownQuestQuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useApp();
  const [currentQuiz] = useState(quizzes[0]); // For now, use first quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
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

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  useEffect(() => {
    // Track quiz time when component unmounts
    return () => {
      const quizTime = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      if (quizTime > 0) {
        dispatch({
          type: 'UPDATE_STATS',
          payload: {
            timeSpentQuizzes: state.userStats.timeSpentQuizzes + quizTime
          }
        });
      }
    };
  }, [startTime, dispatch, state.userStats.timeSpentQuizzes]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Update stats
    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        correctAnswers: state.userStats.correctAnswers + (correct ? 1 : 0),
        wrongAnswers: state.userStats.wrongAnswers + (correct ? 0 : 1)
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          quizzesCompleted: state.userStats.quizzesCompleted + 1
        }
      });
      navigation.navigate('Main' as never);
    }
  };


  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{currentQuiz.questions.length}
          </Text>
          
          <Text style={styles.resultText}>
            {isCorrect ? 'True!' : 'False!'}
          </Text>
          
          <View style={styles.questionBoxFaded}>
            <Text style={styles.questionTextFaded}>
              {currentQuestion.question}
            </Text>
          </View>
          
          {renderCharacter()}
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientNextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.title}>QUIZ</Text>
          </View>

          <View style={styles.content}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{currentQuiz.questions.length}
          </Text>

          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerSelect(index)}
              >
                <LinearGradient
                  colors={selectedAnswer === index ? ['#F9E082', '#CB911D'] : ['#F9E082', '#CB911D']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientOptionButton}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.answerButton}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <LinearGradient
              colors={selectedAnswer === null ? ['#666666', '#444444'] : ['#F9E082', '#CB911D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientAnswerButton}
            >
              <Text style={styles.answerButtonText}>Answer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 30
  },
  questionBox: {
    backgroundColor: '#D4AF37',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30
  },
  questionText: {
    color: '#2C1810',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 26
  },
  optionsContainer: {
    marginBottom: 30
  },
  optionButton: {
    marginBottom: 15,
    borderRadius: 25
  },
  gradientOptionButton: {
    paddingVertical: 15,
    // paddingHorizontal: 20,
    height: 80,
    borderRadius: 25,
    alignItems: 'center'
  },
  optionText: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  answerButton: {
    marginBottom: 30,
    borderRadius: 25
  },
  gradientAnswerButton: {
    paddingVertical: 15,
    // paddingHorizontal: 30,
    height: 80,
    borderRadius: 25,
    alignItems: 'center'
  },
  answerButtonText: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: 'bold'
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2C1810'
  },
  resultText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 20
  },
  questionBoxFaded: {
    backgroundColor: '#D4AF37',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    opacity: 0.3,
    position: 'absolute',
    top: 100
  },
  questionTextFaded: {
    color: '#2C1810',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 26
  },
  nextButton: {
    borderRadius: 25
  },
  gradientNextButton: {
    paddingVertical: 15,
    // height: 40,
    height: 80,width:100,
    // paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center'
  },
  nextButtonText: {
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

export default CrownQuestQuizScreen;
