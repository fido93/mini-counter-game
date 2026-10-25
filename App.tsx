import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Keep splash screen visible during font loading
SplashScreen.preventAutoHideAsync();

// Optional fade animation
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [gameIsOver, setGameIsOver] = useState(false);

  const [fontLoaded, fontError] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  // Keep native splash screen visible
  if (!fontLoaded && !fontError) {
    return null;
  }

  // if (fontError) {
  //   console.error("Font loading failed:", fontError);
  // }

  function pickedNumberHandler(pickNumber: number) {
    setUserNumber(pickNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen numberUserInput={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }
  return (
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootScreen}
    >
      <View style={styles.container}>
        <Image
          source={require("./assets/images/background.png")}
          style={[
            StyleSheet.absoluteFill,
            { opacity: 0.15, height: "auto", width: "auto" },
          ]}
          resizeMode="cover"
          accessible={false}
        />
        <SafeAreaView>{screen}</SafeAreaView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.accent500,
  },
});
