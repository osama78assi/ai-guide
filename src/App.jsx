import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingHeader from "./sctions/LandingHeader";
import Intro from "./sctions/Intro";
import Advantages from "./sctions/Advantages";
import Drawbacks from "./sctions/Drawbacks";
import Tutorial from "./sctions/Tutorial";
import Gallery from "./sctions/Gallery";
import Footer from "./sctions/Footer";
import VideosTutorial from "./sctions/VideosTutorial";
import FloatingSoundMenu from "./components/FloatingSoundMenu";
import AudioProvider from "./context/AudioProvider";

function App() {
    return (
        <AudioProvider>
            <Navbar />

            <FloatingSoundMenu />

            <LandingHeader />

            <Intro />

            <Advantages />

            <Drawbacks />

            <Tutorial />

            <VideosTutorial />

            <Gallery />

            <Footer />
        </AudioProvider>
    );
}

export default App;
