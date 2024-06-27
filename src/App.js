import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimationRoutes from "./Component/AnimationRoutes";
import ScrollToTop from "./Component/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <AnimationRoutes/>
    </BrowserRouter>
  );
}

export default App;
