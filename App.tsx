import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
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
        />
        <StartGameScreen />
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
