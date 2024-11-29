import {SearchClient} from "@algolia/client-search";
import styles from "./SearchBar.module.css";
import {useEffect, useRef, useState} from "react";
import {getAlgoliaClient} from "~/utils/algolia";
import {useDebounced} from "~/hooks";
import {Link} from "@remix-run/react";
import {PageType} from "~/generated/graphql";

type SearchResults = {
    title: string;
    content: string;
    slug: string;
    type: PageType;
    _highlightResult: {
        title: {
            value: string;
            matchLevel: string;
            fullyHighlighted: boolean;
            matchedWords: string[];
        };
        content: {
            value: string;
            matchLevel: string;
            fullyHighlighted: boolean;
            matchedWords: string[];
        };
    };
};

export function SearchBar() {
    const alClient = useRef<SearchClient | null>(null);
    const [results, setResults] = useState<SearchResults[]>([]);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounced(query, 500);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!alClient.current) alClient.current = getAlgoliaClient(window);
        if (!debouncedQuery) {
            setResults([]);
            return;
        }
        alClient.current
            .search({
                requests: [
                    {
                        indexName: "content_index",
                        params: `query=${debouncedQuery}`,
                    },
                ],
                strategy: "stopIfEnoughMatches",
            })
            .then(res =>
                setResults(res.results[0].hits as unknown as SearchResults[])
            )
            .catch(() => setResults([]));
    }, [debouncedQuery]);

    console.log(results);
    return (
        <>
            <button
                className={styles.searchBtn}
                onClick={() => dialogRef.current?.showModal()}
            >
                🔍
            </button>
            <dialog ref={dialogRef} className={styles.resultsDialog}>
                <input
                    className={styles.searchInput}
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                ></input>
                <div className={styles.results}>
                    {results.length === 0 && (
                        <p className={styles.noResults}>:(</p>
                    )}
                    {results.map((result, i) => (
                        <Link
                            to={`/${result.type === PageType.BlogPost ? "blog" : "docs"}/${encodeURIComponent(result.slug)}`}
                            key={i}
                            onClick={() => dialogRef.current?.close()}
                        >
                            <div className={styles.result}>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: result._highlightResult.title
                                            .value,
                                    }}
                                ></p>
                                <p
                                    className={styles.resultContent}
                                    dangerouslySetInnerHTML={{
                                        __html: result._highlightResult.content
                                            .value,
                                    }}
                                ></p>
                            </div>
                        </Link>
                    ))}
                </div>
            </dialog>
        </>
    );
}
