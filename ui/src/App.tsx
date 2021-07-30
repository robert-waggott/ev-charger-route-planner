import React from "react";
import { FullScreenMap } from "./components/full-screen-map";
import { Sidebar } from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <Sidebar />
            <FullScreenMap></FullScreenMap>
        </div>
    );
}

export default App;
