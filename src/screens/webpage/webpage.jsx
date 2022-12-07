const { View, Text } = require("react-native");
import { WebView } from "react-native-webview";

function WebPage() {
  return (
    <WebView style={{ flex: 1 }} source={{ uri: "https://www.facebook.com" }} />
  );
}

export { WebPage };
