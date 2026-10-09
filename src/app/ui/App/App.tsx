// import {Routing} from "@/common/routing/Routing";
import s from "./App.module.css"

import {Routing} from "@/common/routing";
import {Header} from "@/common/components";


function App() {
    return (
        <>
            <Header/>
            <div className={s.layout}>
                <Routing/>
            </div>
        </>
    )
}

export default App
