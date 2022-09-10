import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { t } from "i18next";

const MovieDetail = ({ name, value, icon }) => {
    return (
        <View className="border w-full border-[#7f7f82] rounded-lg flex items-center p-3 text-[#fff]">
            <Icon name={icon} size={20} color="#fff" />
            <Text className="font-heebo mt-2 text-center text-[#7f7f82]">{t(name)}</Text>
            <Text className="font-heebo text-center text-[#fff]">{value}</Text>
        </View>
    )
};

export default MovieDetail;