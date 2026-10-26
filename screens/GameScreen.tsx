import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import Button from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import Feather from "@react-native-vector-icons/feather";
import GuessLogItem from "../components/GuessLogItem";

type GameScreenProps = {
  numberUserInput: number;
  onGameOver: (rounds: number) => void;
};

type Direction = "lower" | "greater";

// Random integer in [min, max] (inclusive), never equal to `exclude`
function generateRandomBetween(min: number, max: number, exclude: number) {
  const isExcludeInRange = exclude >= min && exclude <= max;
  const candidates = max - min + 1 - (isExcludeInRange ? 1 : 0);

  if (candidates <= 0) {
    return exclude;
  }

  const rndNum = min + Math.floor(Math.random() * candidates);

  return isExcludeInRange && rndNum >= exclude ? rndNum + 1 : rndNum;
}

function GameScreen({ numberUserInput, onGameOver }: GameScreenProps) {
  // Boundaries persist between renders
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  // Guesses, newest first. The initial guess is generated only once.
  const [guesses, setGuesses] = useState(() => [
    generateRandomBetween(1, 100, numberUserInput),
  ]);
  const currentGuess = guesses[0];
  const guessesCount = guesses.length;

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

    setGuesses((prevGuesses) => [newRandomNumber, ...prevGuesses]);
  }

  useEffect(() => {
    if (currentGuess === numberUserInput) {
      onGameOver(guessesCount);
    }
  }, [currentGuess, numberUserInput, guessesCount, onGameOver]);

  useEffect(() => {
    minBoundary.current = 1;
    maxBoundary.current = 100;
  }, []);

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
      <View style={styles.listContainer}>
        <FlatList
          data={guesses}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessesCount - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => String(item)}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonFullWidth: {
    flex: 1,
  },
});
