import "./App.css";
import Banner from "./components/banner/banner.component";
import ContentCards from "./components/content-cards/content-cards.component";
import { useState } from "react";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <>
      <GlobalProvider>
        <Banner />
        <ContentCards />
      </GlobalProvider>
    </>
  );
}

export default App;
