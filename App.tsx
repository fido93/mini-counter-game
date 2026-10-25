import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();

  function pickedNumberHandler(pickNumber: number) {
    setUserNumber(pickNumber);
  }

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen />;
  }
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
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
    backgroundColor: "#ddb52f",
  },
});
