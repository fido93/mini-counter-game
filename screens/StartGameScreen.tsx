import { TextInput, View } from "react-native";
import Button from "../components/PrimaryButton";

function StartGameScreen() {
  return (
    <View>
      <TextInput />
      <Button>Reset</Button>
      <Button>Confirm</Button>
    </View>
  );
}

export default StartGameScreen;
