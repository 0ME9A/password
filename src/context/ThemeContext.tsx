import React from "react";

type ColorModeContextType = React.Context<{
    toggleColorMode: () => void;
}>

const ColorModeContext: ColorModeContextType = React.createContext({ toggleColorMode: () => { } });

export default ColorModeContext;