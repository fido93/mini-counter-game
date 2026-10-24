import { Text, View } from "react-native";

function Button(props:any) {
    return (
        <View>
            <Text>{props.children}</Text>
        </View>
    )
} 

export default Button;