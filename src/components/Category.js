import { t } from 'i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Category = ({ image, category }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
            <>
                <View className="bg-[#282833] p-5 rounded-lg">
                    <View style={{ width: 35, height: 35 }}>
                        <Image className="w-full h-full max-w-full max-h-full" source={(image)} />
                    </View>
                </View>
                <Text className="text-[#a0a0a4] font-regular text-center mt-1 font-heebo">{t(category)}</Text>
            </>
        </TouchableOpacity>
    )
}

export default Category;