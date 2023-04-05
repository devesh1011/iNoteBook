import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const state = {
        "name": "Devesh",
        "class": "5b"
    }
    // const [state, setState] = useState() 

    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;