import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

 export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRound, setGuessRound] = useState(0);
  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler() {
    setGameIsOver(true)
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRound(0);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} gameRounds={setGuessRound} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRound} onStartNewGame={startNewGameHandler}/>;
  }


  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});