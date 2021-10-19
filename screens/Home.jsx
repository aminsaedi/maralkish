import React from "react";
import { ScrollView, View } from "react-native";

// components import
import AppView from "../components/AppView/AppView";
import SpecialOffers from "./../components/SpecialOffers";
import CategoryGroup3By3 from "../components/CategoryGroup3By3";
import MostProducts from "../components/MostProducts";
import TopSlideShow from "../components/TopSlideShow";
import HomeSearchBar from "../components/HomeSearchBar";
import Banner from "../components/Banner";
import use3By3Products from "../hooks/use3By3Products";
import { isArray } from "lodash";
import DemoAlert from "../components/DemoAlert";

const Home = ({ navigation }) => {
  const categories = use3By3Products()?.homeCategories;

  return (
    <AppView topSafe skipAndroid>
      <HomeSearchBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "92%" }}
      >
        <TopSlideShow />
        <DemoAlert />
        <SpecialOffers style={{ marginBottom: 20 }} />
        {categories?.homeProductCategory1 && (
          <CategoryGroup3By3
            style={{ marginBottom: 20, marginTop: 20 }}
            categoryId={categories?.homeProductCategory1.id}
            title={categories?.homeProductCategory1.name}
            products={categories?.homeProductCategory1.products}
            totalItems={categories?.homeProductCategory1?.counts || 0}
            // category={categories[0]}
          />
        )}
        <Banner />
        <MostProducts mode="sales" style={{ marginTop: 20 }} />
        <Banner four />
        {categories?.homeProductCategory2 && (
          <CategoryGroup3By3
            style={{ marginBottom: 20 }}
            categoryId={categories?.homeProductCategory2.id}
            title={categories?.homeProductCategory2.name}
            products={categories?.homeProductCategory2.products}
            totalItems={categories?.homeProductCategory2?.counts || 0}
          />
        )}
        <MostProducts mode="views" />
        {categories?.homeProductCategory3 && (
          <CategoryGroup3By3
            style={{ marginBottom: 20 }}
            categoryId={categories?.homeProductCategory3.id}
            title={categories?.homeProductCategory3.name}
            products={categories?.homeProductCategory3.products}
            totalItems={categories?.homeProductCategory3?.counts || 0}
          />
        )}
      </ScrollView>
    </AppView>
  );
};

export default Home;
