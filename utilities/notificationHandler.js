import pages from "../navigation/routes";

const handleForegroundNotifications = (notification, navigation) => {
  if (!notification.data) return;
  if (notification.data.type === "openPage") {
    // navigation.popToTop();
    navigation.navigate(notification.data.page, {
      ...notification.data.params,
    });
    //   TODO: do some login to navigate user to the requested page
  }
};

const handleBackgroundNotification = (notification, navigation) => {
  if (!notification.data) return;
  if (notification.data.type === "openPage") {
    // navigation.popToTop();
    navigation.navigate(notification.data.page, {
      ...notification.data.params,
    });
    //   TODO: do some login to navigate user to the requested page
  }
};

export { handleForegroundNotifications, handleBackgroundNotification };
