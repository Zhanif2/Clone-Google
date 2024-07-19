import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import SearchedImageItemTemplate from "./SearchedImageItemTemplate";
import Pagination from "./Pagination";
import { Context } from "../utils/ContextApi";

const SearchResult = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const { query, startIndex } = useParams();
    const { imageSearch } = useContext(Context);

    useEffect(() => {
        fetchSearchResults();
        window.scrollTo(0, 0);
    }, [query, startIndex, imageSearch]);

    const fetchSearchResults = async () => {
        try {
            let payload = { q: query, start: startIndex };
            if (imageSearch) {
                payload.searchType = "image";
            }
            const res = await fetchDataFromApi(payload);
            console.log("API Response: ", res);
            setResult(res);
            setError(null); // Reset error if API call is successful
        } catch (error) {
            console.error("Error fetching search results: ", error);
            setError(error);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col min-h-[100vh]">
                <SearchResultHeader />
                <main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <p className="text-red-500 text-lg">Error: {error.message}</p>
                            {error.response && error.response.status === 429 && (
                                <p className="text-sm">You have exceeded your daily quota. Please try again later.</p>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex flex-col min-h-[100vh]">
                <SearchResultHeader />
                <main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const { items, queries, searchInformation } = result;

    return (
        <div className="flex flex-col min-h-[100vh]">
            <SearchResultHeader />
            <main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
                <div className="flex text-sm text-[#70757a] mb-3">
                    {`About ${searchInformation.formattedTotalResults} results in (${searchInformation.formattedSearchTime})`}
                </div>
                {!imageSearch ? (
                    <>
                        {items.map((item, index) => (
                            <SearchedItemTemplate key={index} data={item} />
                        ))}
                    </>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                        {items.map((item, index) => (
                            <SearchedImageItemTemplate key={index} data={item} />
                        ))}
                    </div>
                )}
                <Pagination queries={queries} />
            </main>
            <Footer />
        </div>
    );
};

export default SearchResult;
