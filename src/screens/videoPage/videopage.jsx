import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

function VideoPage({ navigation }) {
  return (
    <View>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
        }}
      />
    </View>
  );
}

export { VideoPage };
