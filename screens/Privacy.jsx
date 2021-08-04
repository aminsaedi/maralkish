import React, { useContext } from "react";
import { WebView } from "react-native-webview";

import AppView from "./../components/AppView/AppView";
import StoreSettingContext from "./../utilities/storeSettingContext";

const Privacy = () => {
  const privacy = useContext(StoreSettingContext)?.privacy;
  return (
    <AppView>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{ html: privacy || "<h1><center>متن html حریم خصوصی</center></h1>" }}
      />
    </AppView>
  );
};

export default Privacy;
