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
  onGameOver: (gameOver: boolean) => void;
  userRound: any;
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

function GameScreen({
  numberUserInput,
  onGameOver,
  userRound,
}: GameScreenProps) {
  // Boundaries persist between renders
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  // Generate the initial guess only once
  const initialGuess = generateRandomBetween(1, 100, numberUserInput);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guestRounds, setGuessRounds] = useState([initialGuess]);
  const guessRoundsListLength = guestRounds.length;

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
    setGuessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);
  }

  useEffect(() => {
    if (currentGuess === numberUserInput) {
      onGameOver(true);
    }
  }, [currentGuess, numberUserInput, onGameOver]);

  useEffect(() => {
    minBoundary.current = 1;
    maxBoundary.current = 100;
  }, []);

  useEffect(() => {
    userRound(guessRoundsListLength);
  }, [guessRoundsListLength, userRound]);

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
      <View>
        <FlatList
          data={guestRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
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
