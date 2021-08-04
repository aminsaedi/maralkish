import React, { useContext } from "react";
import { WebView } from "react-native-webview";

import AppView from "./../components/AppView/AppView";
import StoreSettingContext from "./../utilities/storeSettingContext";

const TermOfUse = () => {
  const termOfUse = useContext(StoreSettingContext)?.termOfUse;
  return (
    <AppView>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{ html: termOfUse || "<h1><center>متن html شرایط استفاده</center></h1>" }}
      />
    </AppView>
  );
};

export default TermOfUse;
