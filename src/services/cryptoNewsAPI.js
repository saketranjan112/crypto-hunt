import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

const createRequest = (url) => ({ url, headers: headers });

export const cryptoNewsAPI = createApi({
    reducerPath: 'cryptoNewsAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsAPI;