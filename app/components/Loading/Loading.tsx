import styles from "./Loading.module.css";
import {Logo} from "~/components/Logo";
import {useDebounced} from "~/hooks";

interface LoadingProps {
    enabled: boolean;
}

export function Loading({enabled}: LoadingProps) {
    const debounced = useDebounced(enabled, 1000);
    return (
        <div className={debounced ? styles.on : styles.off}>
            <Logo animated />
        </div>
    );
}
