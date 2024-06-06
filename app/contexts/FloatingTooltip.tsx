import {ReactNode, createContext, useContext, useState} from "react";

interface FloatingTooltipContextType {
    content: ReactNode;
    setContent: (content: ReactNode) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const FloatingTooltipContext = createContext<FloatingTooltipContextType>(
    {
        content: null,
        setContent: () => {},
        visible: false,
        setVisible: () => {},
    }
);

export function FloatingTooltipProvider({
    children,
}: {
    children?: ReactNode | ReactNode[];
}) {
    const [content, setContent] = useState<ReactNode>(null);
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <FloatingTooltipContext.Provider
            value={{content, setContent, visible, setVisible}}
        >
            {children}
        </FloatingTooltipContext.Provider>
    );
}

export const useFloatingTooltip = () => {
    const context = useContext(FloatingTooltipContext);
    if (!context) {
        throw new Error(
            "useFloatingTooltip must be used within a FloatingTooltipProvider"
        );
    }
    return context;
};
