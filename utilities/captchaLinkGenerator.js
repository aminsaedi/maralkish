import {baseURL} from "../api/client";

export default captchaLinkGenerator = () => {
  const timestamp = Date.now();
  return {
    uri: baseURL + "/captcha.png?uniqueId=" + timestamp + "app",
    uniqueId: timestamp + "app",
  };
};
