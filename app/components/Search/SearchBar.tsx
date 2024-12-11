import {SearchClient} from "@algolia/client-search";
import styles from "./SearchBar.module.css";
import {useEffect, useRef, useState} from "react";
import {getAlgoliaClient} from "~/utils/algolia";
import {useDebounced} from "~/hooks";
import {Link} from "@remix-run/react";
import {PageType} from "~/generated/graphql";
import {LookingGlass} from "~/components/Icons";
import {Elephant} from "~/components/Elephant";

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

const mapTypeToPage = {
    [PageType.BlogPost]: "learn",
    [PageType.DocEntry]: "docs",
    "download_version": "download",
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

    return (
        <>
            <button
                aria-label="Search"
                className={styles.searchBtn}
                onClick={() => dialogRef.current?.showModal()}
            >
                <LookingGlass width={25} height={25} />
            </button>
            <dialog
                ref={dialogRef}
                className={styles.resultsDialog}
                onClick={() => {
                    dialogRef.current?.close();
                }}
            >
                <input
                    className={styles.searchInput}
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    placeholder={"What are you looking for?"}
                ></input>
                <div
                    className={styles.results}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    {results.length === 0 && (
                        <p className={styles.noResults}>
                            <Elephant />
                        </p>
                    )}
                    {results.map((result, i) => (
                        <Link
                            to={`/${mapTypeToPage[result.type]}/${encodeURIComponent(result.slug)}`}
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
                            {i < results.length - 1 && (
                                <hr className={styles.separator} />
                            )}
                        </Link>
                    ))}
                </div>
            </dialog>
        </>
    );
}
