import { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import TMDB from "../services/tmdb";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { t } from "i18next";
import MovieCard from "../components/MovieCard";
import Category from "../components/Category";
import Config from "react-native-config";

const tmdb = new TMDB(Config.TMDB_API_KEY);

const Home = () => {

    const [search, setSearch] = useState();
    const [movies, setMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);

    const initPopularMovies = useCallback(async () => {
        const movies = await tmdb.get_popular_movies();
        setMovies(movies);
        // TODO: when popular movies reach end scroll, maybe load more popular movies
    }, []);

    useEffect(() => {

        const searchMovies = async () => {
            const movies = await tmdb.search_movies(search);
            setSearchedMovies(movies);
        }

        let timer = setTimeout(() => {
            if (!search) return;
            searchMovies()
        }, 750)

        return () => clearTimeout(timer)

    }, [search])


    useEffect(() => { initPopularMovies(); }, []);

    return (
        <View className="bg-[#1c1c27] text-white h-full">
            <SafeAreaView>
                <View className="justify-around h-full p-5">
                    <View className="flex flex-row justify-between">
                        <View>
                            <Text className="text-[#a0a0a4] font-regular font-heebo text-left">{t("Welcome")} 👋</Text>
                            <Text className="text-white font-bold text-lg font-heebo">{t("Let's relax and watch a movie !")}</Text>
                        </View>
                        <View className="self-center">
                            <Icon name="film" size={30} color="#fab338" />
                        </View>
                    </View>
                    <View className={search ? 'mt-10' : ''}>
                        <TextInput value={search} className="bg-[#272732] p-5 text-white text-right rounded-full" onChangeText={(text) => { setSearch(text); }} placeholderTextColor="#808087" />
                        <View className="flex flex-row items-center justify-center absolute p-5" style={{ display: search ? 'none' : '' }}>
                            <Icon name="search" size={15} color="#808087" />
                            <Text className="ml-2 bg-xred-200 font-heebo text-[#808087]">{t("Search")}</Text>
                        </View>
                        <TouchableOpacity className="flex flex-row items-center justify-center absolute p-5 right-0" style={{ display: search ? '' : 'none' }} activeOpacity={0.5} onPress={() => { setSearch('') }}>
                            <Icon name="trash" size={15} color="#808087" />
                        </TouchableOpacity>
                    </View>
                    {
                        search
                            ?
                            <View className="bg-red-x500 mb-auto mt-5">
                                <Text className="font-bold text-xl text-white mb-3 text-left font-heebo">{t("Search results for:")} "{search}"</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} className="flex flex-row">
                                    {searchedMovies.map((movie, index) => { return <MovieCard key={index} movie={movie} /> })}
                                </ScrollView>
                            </View>
                            :
                            <>
                                <View>
                                    {/* center text both ways */}
                                    <View className="justify-between items-center flex flex-row mb-5">
                                        <Text className="font-bold text-xl text-white font-heebo">{t("Categories")}</Text>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                                            <Text className="text-[#fab338] font-bold font-heebo">{t("See All")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex flex-row justify-between">
                                        <Category image={require("../resources/images/heart_eyes.png")} category="Romance" />
                                        <Category image={require("../resources/images/grin.png")} category="Comedy" />
                                        <Category image={require("../resources/images/scream.png")} category="Horror" />
                                        <Category image={require("../resources/images/kissing_closed_eyes.png")} category="Drama" />
                                    </View>
                                </View>
                                <View className="bg-red-x500">
                                    <Text className="font-bold text-xl text-white mb-3 text-left font-heebo">{t("Popular movies")}</Text>
                                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} onR horizontal={true} className="flex flex-row">
                                        {movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
                                    </ScrollView>
                                </View>
                            </>
                    }
                </View>
            </SafeAreaView>
        </View>
    )
};

export default Home;