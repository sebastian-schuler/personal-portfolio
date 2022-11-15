import React, { useContext, useState } from "react";

interface Props {
    children: React.ReactNode;
}

interface AppContext {
    contactDrawerVisible: boolean;
    setContactDrawerVisible: (visible: boolean) => void;
}

const AppContext = React.createContext<AppContext>({
    contactDrawerVisible: false,
    setContactDrawerVisible: () => { }
});

const GlobalContextProvider: React.FC<Props> = (props) => {

    const [isContactDrawerVisible, setIsContactDrawerVisible] = useState(false);

    return (
        <AppContext.Provider
            value={{
                contactDrawerVisible: isContactDrawerVisible,
                setContactDrawerVisible: setIsContactDrawerVisible
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);

export default GlobalContextProvider;