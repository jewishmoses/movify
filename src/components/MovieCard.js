import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";
import { Animated, Image, TouchableOpacity } from "react-native";

const MovieCard = ({ movie }) => {

    // TODO: Add skeleton animation

    const navigation = useContext(NavigationContext);

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('Movie', { movie }) }}>
            <Animated.View className="mr-2" style={{ width: 200, height: 300, }}>
                <Image className="bg-[#282833] w-full h-full max-w-full max-h-full rounded" source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} />
            </Animated.View>
        </TouchableOpacity>
    )
};

export default MovieCard;