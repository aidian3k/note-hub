import { store } from "./src/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AppNavigator } from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GluestackUIProvider>
  );
}
