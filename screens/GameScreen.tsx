import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import Button from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import Feather from "@react-native-vector-icons/feather";

type GameScreenProps = {
  numberUserInput: number;
  onGameOver: (gameOver: boolean) => void;
};

type Direction = "lower" | "greater";

function generateRandomBetween(min: any, max: any, exclude: any) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function GameScreen({ numberUserInput, onGameOver }: GameScreenProps) {
  // Boundaries persist between renders
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  // Generate the initial guess only once
  const initialGuess = generateRandomBetween(1, 100, numberUserInput);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction: Direction) {
    if (
      (direction === "lower" && currentGuess < numberUserInput) ||
      (direction === "greater" && currentGuess > numberUserInput)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }

    if (currentGuess === numberUserInput) {
      Alert.alert("Game Over!", "The opponent guessed your number!");
      return;
    }

    if (direction === "lower") {
      maxBoundary.current = currentGuess - 1;
    } else {
      minBoundary.current = currentGuess + 1;
    }

    if (minBoundary.current > maxBoundary.current) {
      return;
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      currentGuess,
    );

    setCurrentGuess(newRandomNumber);
  }

  useEffect(() => {
    if (currentGuess === numberUserInput) {
      onGameOver(true);
    }
  }, [currentGuess, numberUserInput, onGameOver]);

  return (
    <View style={styles.screen}>
      <Title>Opponent Guess</Title>

      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonFullWidth}>
            <Button onPress={() => nextGuessHandler("lower")}>
              <Feather name="minus" size={24} color="white" />
            </Button>
          </View>
          <View style={styles.buttonFullWidth}>
            <Button onPress={() => nextGuessHandler("greater")}>
              <Feather name="plus" size={24} color="white" />
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonFullWidth: {
    flex: 1,
  },
});
