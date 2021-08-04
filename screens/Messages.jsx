import React, { useState, useEffect } from "react";

import MessageTypeSelector from "./../components/MessageTypeSelector";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import colors from "../utilities/colors";
import Message from "../components/Message";
import Line from "../components/Line";

const Messages = () => {
  const options = [
    { id: 1, name: "همه پیام‌ها", activeColor: colors.primaryColor },
    {
      id: 2,
      name: "سفارش‌ها",
      icon: "cart-outline",
      activeColor: colors.seconadryColor,
    },
    {
      id: 3,
      name: "پیشنهاد‌ها",
      icon: "cloud-outline",
      activeColor: colors.primaryColor,
    },
    { id: 4, name: "تراکنش‌ها", icon: "cart", activeColor: colors.green },
  ];
  const [activeMessageType, setActiveMEssageType] = useState(options[0]);

  const messages = [
    {
      id: 1,
      typeId: 2,
      title: "سفارش شما پردازش و آماده ارسال شده است",
      subTitle:
        "زمانی که شما برای تحویل انتخاب کریده‌اید، فردا و بازه ۹ تا ۲۲ است.",
      images: [
        {
          id: 935994,
          name: "3044888.jpg",
          size: 102189,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/935994",
        },
        {
          id: 935995,
          name: "3044896.jpg",
          size: 33481,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/935995",
        },
        {
          id: 936019,
          name: "3044897.jpg",
          size: 67485,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/936019",
        },
        {
          id: 936107,
          name: "3044900.jpg",
          size: 29804,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/936107",
        },
      ],
      link: "google.com",
      moreDetailTitle: "مشاهده سفارش",
      date: new Date(16254597780),
    },
    {
      id: 2,
      typeId: 2,
      title: "سفارش شما ثبت شده و درحال پردازش است",
      subTitle: "وضعیت سفارش خود را از اینجا میتوانید پیگیری کنید",
      images: [
        {
          id: 935994,
          name: "3044888.jpg",
          size: 102189,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/935994",
        },
        {
          id: 935995,
          name: "3044896.jpg",
          size: 33481,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/935995",
        },
        {
          id: 936019,
          name: "3044897.jpg",
          size: 67485,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/936019",
        },
        {
          id: 936107,
          name: "3044900.jpg",
          size: 29804,
          title: null,
          description: null,
          alt: null,
          address: "/attachments/936107",
        },
      ],
      link: "google.com",
      moreDetailTitle: "مشاهده سفارش",
      date: new Date(16228713780),
    },
    {
      id: 3,
      typeId: 3,
      title: "😍  پاور بانک ارزان شد  😁",
      subTitle:
        "همین امروز دیجی‌پلاسی شو و شارژر همراه رانیک پرایم را ۳۰ درصد تخفیف بخر",
      link: "google.com",
      moreDetailTitle: "مشاهده",
      date: new Date(16253769780),
    },
  ];
  const [filteredMessages, setFilteredMessages] = useState(messages);

  const filterMessages = () => {
    if (activeMessageType.id === 1) return setFilteredMessages(messages);
    const copy = messages.filter((i) => i.typeId === activeMessageType.id);
    // console.log(copy);
    setFilteredMessages(copy);
  };

  useEffect(() => {
    filterMessages();
  }, [activeMessageType]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.messageTypeContainer}>
              <FlatList
                data={options}
                keyExtractor={(i) => i.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                inverted
                renderItem={({ item }) => (
                  <MessageTypeSelector
                    item={item}
                    isActive={item.id === activeMessageType.id}
                    onPress={() => setActiveMEssageType(item)}
                  />
                )}
              />
            </View>
          )}
          data={filteredMessages}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <Message item={item} messageTypes={options} />
          )}
          ItemSeparatorComponent={Line}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  messageTypeContainer: {
    width: "100%",
    marginTop: "2.5%",
    // height : "3.5%"
    marginBottom : 20
  },
});

export default Messages;
