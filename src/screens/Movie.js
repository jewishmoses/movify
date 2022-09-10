import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5";
import TMDB from "../services/tmdb";
import Video from 'react-native-video';
import MovieDetail from "../components/MovieDetail";
import Config from "react-native-config";

const tmdb = new TMDB(Config.TMDB_API_KEY);

const Movie = ({ route, navigation }) => {

    const [movie, setMovie] = useState({});
    const [showMovie, setShowMovie] = useState(false);

    const initMovie = useCallback(async () => {
        let movie = await tmdb.get_movie(route.params.movie['id']);
        movie.vote_average = movie.vote_average.toString().substring(0, 1);
        movie.genre = movie.genres[0].name;
        setMovie(movie);
    }, []);

    useEffect(() => { initMovie(); }, []);
    useEffect(() => { setShowMovie() }, []);

    return (
        <View className="bg-[#1c1c27] text-white h-full">
            <SafeAreaView>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View className="p-3" style={{ marginBottom: 100 }}>
                            <View className="flex flex-row items-center mb-5">
                                <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.goBack() }}>
                                    <Icon name="chevron-right" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text className="font-heebo text-lg text-white ml-auto mr-auto">{t('Movie Detail')}</Text>
                            </View>
                            <View className="flex flex-row w-full">
                                <View style={{ width: 250, height: 350 }}>
                                    <Image className="bg-[#282833] w-full h-full max-w-full max-h-full rounded-lg" source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} />
                                </View>
                                <View className="flex mx-auto justify-between items-center">
                                    <MovieDetail name="Genre" value={movie.genre} icon="video" />
                                    <MovieDetail name="Mins" value={movie.runtime} icon="clock" />
                                    <MovieDetail name="Rating" value={movie.vote_average} icon="star" />
                                </View>
                            </View>
                            <View>
                                <Text className="text-3xl text-white font-heebo text-left my-5">{movie.title}</Text>
                                <View className="rounded border-b-[#7f7f82] border-b opacity-30"></View>
                                <Text className="text-lg text-[#7f7f82] font-heebo text-left mt-5">{movie.overview}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View className="bg-[#1c1c27]">
                        <TouchableOpacity className="p-5 bg-[#1c1c27] absolute w-full bottom-0" activeOpacity={0.9} onPress={() => { setShowMovie(true); }}>
                            <View style={{ shadowColor: '#fff', shadowOpacity: 0.3, shadowRadius: 20, }} className="bg-[#ffb43a] rounded-full">
                                <Text className="text-xl text-center font-bold font-heebo text-black p-5">{t("Watch Movie")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            {
                showMovie && <Video className="absolute left-0 right-0 bottom-0 top-0" source={{ uri: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4" }}
                    controls
                    ref={(ref) => { this.player = ref }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError} />
            }
        </View>
    )
}

export default Movie;