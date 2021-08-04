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

const Home = ({ navigation }) => {
  const categories = use3By3Products()?.homeCategories;

  // console.log(Object.keys(categories));

  const singleBanner = [
    {
      id: 1,
      image:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/74ee43a0fdaea9021e1474b52cd1373937988cea_1627066741.jpg?x-oss-process=image/quality,q_80",
    },
  ];

  const fourBanner = [
    {
      id: 1,
      image:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/2576e414be366f03b774767e714730ca15530d41_1627128451.jpg?x-oss-process=image/quality,q_80",
    },
    {
      id: 2,
      image:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/fd5f2e3fa5c47b904398e592c88d5f0f9700e8c6_1626686835.jpg?x-oss-process=image/quality,q_80",
    },
    {
      id: 3,
      image:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/956cd52f1f18f11284016c86561d53bcdcfdeedd_1612606849.jpg?x-oss-process=image/quality,q_80",
    },
    {
      id: 4,
      image:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/d82a1e23491133347a1a1a2e7a6f8f1f7c9a7c08_1626245449.jpg?x-oss-process=image/quality,q_80",
    },
  ];

  return (
    <AppView topSafe>
      <HomeSearchBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "92%" }}
      >
        <TopSlideShow />
        <SpecialOffers style={{ marginBottom: 20 }} />
        {/* <Banner count={4} data={fourBanner} /> */}
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
        {/* <Banner data={singleBanner} /> */}
        <MostProducts mode="sales" style={{ marginTop: 20 }} />
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
