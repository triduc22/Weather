import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StatusBar} from 'react-native';
import {Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {theme} from '../theme';
import {Dimensions} from 'react-native';
import {debounce} from 'lodash';
import {getData, storeData} from '../utils/asyncStorage';
import * as Progress from 'react-native-progress';

{
  /*Process hide text London after click search bar */
}
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

{
  /*Add React Native Heroicons*/
}
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';

import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {weatherImages} from '../constants';

export default function HomeScreen() {
  {
    /*Process hide text "Search bar" */
  }
  const [showSearch, toggleSearch] = useState(false);

  {
    /*Process show 3 location in text "Search bar" */
  }

  {
    /*Process show name after type name and show after click*/
  }
  {
    /* const [locations, setLocations] = useState([1, 2, 3]); */
  }
  const [locations, setLocations] = useState([]);

  //Process for take Api Forecast after type search then click icon search
  const [weather, setWeather] = useState({});

  //Process for react-native-progress
  const [loading, setLoading] = useState(true);

  {
    /*Process show text in node.js from search bar after type " */
  }

  const handleLocation = loc => {
    // console.log('location: ', loc);
    /*Need only name*/
    setLocations([]);
    /*Make Hide text type after click text in searchbar */
    toggleSearch(false);
    {
      /*Process for loading with react-native-progress */
    }
    setLoading(true);

    //Process asyncStorage to save location and not get ii become default after reload app
    storeData('city', loc.name);
    /*Process for take Api Forecast after type search then click icon search*/
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      {
        /*Process for loading with react-native-progress */
      }
      setLoading(false);
      // console.log('got forecast: ', data);
    });
  };

  {
    /*Process type text in search bar */
  }
  const handleSearch = value => {
    {
      /*console.log('value: ', value); */
    }

    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        // console.log('got locations: ', data);
        setLocations(data);
      });
    }
  };

  {
    /*Process get data and show location when reload app*/
  }
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  {
    /*Process get data from cityName and show location when reload app*/
  }
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Ho Chi Minh';
    //Process if get data myCity then change cityName to myCity
    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      //Before use asyncStorage
      /*cityName: 'Ho Chi Minh',*/

      //After use asyncStorage
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      {
        /*Process for loading with react-native-progress */
      }
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const windowHeight = Dimensions.get('window').height;
  const percentHeight = parseInt(windowHeight / 100);
  const test = (windowHeight * percentHeight) / 100;
  const testHeight = `${(test + 70 - 100) / 2}%`;

  // console.log('windowHeight', windowHeight);
  // console.log('windowHeight', testHeight);

  /*Show info after call api when type name and click it */
  const {current, location} = weather;

  return (
    <View className="flex-1 relative">
      {/*Xly thanh bar ngay cột sóng */}
      <StatusBar style="light" />

      {/*Process show image for background */}
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className="absolute h-full w-full"
      />

      {/*Process for loading with react-native-progress */}
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          {/*Process for loading to show Loading... */
          /*<Text className="text-white text-4xl">Loading...</Text>*/}

          {/*Process for loading with react-native-progress */}
          <Progress.CircleSnail thickness={3} size={140} color="#0bb3b2" />
        </View>
      ) : (
        /*Process show status bar search */
        <KeyboardAwareScrollView className="flex flex-1 mt-4 ">
          {/*Search section*/}
          <View
            style={{
              height: '7%',
            }}
            className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              /*Process hide/show text "Search bar" after click icon search (transparent: màu trog suốt)*/
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : 'transparent',
              }}>
              {/*Process hide text "Search bar" */}
              {showSearch ? (
                <TextInput
                  // onChangeText={handleSearch}
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                  //Css for text "Search City"
                  className=" pl-6 h-10 pb-1 flex-1 text-base text-white "
                />
              ) : null}

              {/*Nút tìm kiếm */}
              <TouchableOpacity
                /*Process hide/show text "Search bar" after click icon search (use !showSearch) */
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{backgroundColor: theme.bgWhite(0.3)}}>
                {/*<Text>Icon</Text> */}
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>

            {/*Process hide/show text "London, United Kingdom" after click icon search */}
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;

                  {
                    /*Process border(bo viền) for hide/show text "London, United Kingdom" after click icon search */
                  }
                  let borderClass = showBorder
                    ? ' border-b-2 border-b-gray-400'
                    : '';
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      className={
                        'flex-row items-center border-0 p-3 px-4 mb-1' +
                        borderClass
                      }>
                      {/*Process show icon map pin next to text "London, United Kingdom" */}
                      <MapPinIcon size="20" color="gray" />

                      {/*Process show default after click*/}
                      {/*
                      // <Text className="text-black text-lg ml-2 ">
                      //   London, United Kingdom
                    // </Text> */}

                      {/*Process show name after type name and show after click*/}
                      <Text className="text-black text-lg font-medium ml-2 ">
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/*Nguyên Khung hiện trong background*/}
          {/*Process choose for forecast section*/}
          <View className="mx-4 flex justify-around flex-1 mt-5 ">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              {/*location + Text Name default before call Api*/}
              <Text className="text-white text-center text-2xl font-bold ">
                {/*London, */}
                {/*Show info after call api when type name and click it */}
                {location?.name},
              </Text>
              <Text
                className="text-lg font-semibold text-gray-300"
                style={{marginLeft: 5, alignSelf: 'flex-end'}}>
                {/*United Kingdom */}
                {/*Show info after call api when type name and click it */}
                {location?.country}
              </Text>
            </View>
            {/*Weather Image */}
            <View className="flex-row justify-center mb-1">
              <Image
                /*source={require('../assets/images/partlycloudy.png')}*/

                /*Show info after call api when type name and click it */
                /*Lấy icon(images from weatherapi) */
                /*source={{uri: 'https:' + current?.condition?.icon}}*/

                /*Lấy icon(images) from folder constant with file index.js) */
                source={weatherImages[current?.condition?.text]}
                className="w-52 h-52 mb-4 mt-5"
              />
            </View>

            {/*Degree celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5 ">
                {/*Make 23 to degree C*/}
                {/*23&#176;*/}
                {/*Show info after call api when type name and click it */}
                {current?.temp_c}&#176;
              </Text>
              {/*tracking-widest like "Letter Spacing"*/}
              <Text className="text-center text-white text-xl mb-4  tracking-widest">
                {/*Partly Cloudy */}
                {/*Show info after call api when type name and click it */}
                {current?.condition?.text}
              </Text>
            </View>

            {/*Other stats */}

            {/*Tốc Độ Gió*/}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/wind.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {/*22km*/}
                  {current?.wind_kph}km
                </Text>
              </View>

              {/*Độ Ẩm */}
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/drop.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {/*23%*/}
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/sun.png')}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {/*6:05 AM*/}
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>
          {/*Forecast for the next days */}
          <View style={{marginTop: testHeight}} className=" space-y-3">
            {/*Process show icon calendar */}
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>

            {/*Process for ScrollBar(cuộn) with images when full place to contain images */}
            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}
              /*Làm nền viền trắng mờ*/
              keyboardShouldPersistTaps="handled">
              {weather?.forecast?.forecastday?.map((item, index) => {
                /*Process hiện ngày + tên ngày */
                let date = new Date(item.date);
                let options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('en-US', options);

                /*Process hide ngày in order to only show date name */
                dayName = dayName.split(',')[0];

                return (
                  /*Monday*/
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{backgroundColor: theme.bgWhite(0.15)}}>
                    <Image
                      /*source={require('../assets/images/heavyrain.png')}*/
                      source={weatherImages[item?.day?.condition?.text]}
                      className="h-11 w-11"
                    />
                    {/*Chèn chữ vào viền trắng mờ*/}
                    <Text className="text-white">
                      {/*Monday*/} {/*{item.date}*/}
                      {dayName}
                    </Text>
                    <Text className="text-white text-xl font-semibold">
                      {/*13&#176;*/}
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
