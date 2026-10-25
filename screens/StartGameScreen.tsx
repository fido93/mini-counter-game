import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import Button from "../components/PrimaryButton";

function StartGameScreen({ onConfirmNumber }: any) {
  const [inputNumber, setInputNumber] = useState("");

  function numberInputHandler(val: string) {
    setInputNumber(val);
  }

  function resetInputHandler() {
    setInputNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(inputNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ],
      );
      return;
    }

    onConfirmNumber(chosenNumber);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={inputNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonFullWidth}>
          <Button onPress={resetInputHandler}>Reset</Button>
        </View>
        <View style={styles.buttonFullWidth}>
          <Button onPress={confirmInputHandler}>Confirm</Button>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#4e0329",
    borderRadius: 8,
    elevation: 4, // android only property for shadow
    shadowColor: "black", //shadow for ios
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonFullWidth: {
    flex: 1,
  },
});
