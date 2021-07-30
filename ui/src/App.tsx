import React from "react";
import { FullScreenMap } from "./components/full-screen-map";
import { Sidebar } from "./components/sidebar";

function App() {
    return (
        <div className="App">
            <Sidebar />
            <FullScreenMap></FullScreenMap>
        </div>
    );
}

export default App;
