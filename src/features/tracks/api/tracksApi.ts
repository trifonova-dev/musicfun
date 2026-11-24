import {baseApi} from "@/features/playlists/api/api/baseApi";
import type {FetchTracksResponse} from "@/features/tracks/api/tracksApi.types";

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | undefined>({
            infiniteQueryOptions: {
                initialPageParam: undefined,
                getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams, queryArg) => {
                }
            },
            query: ({pageParam}) => ({
                url: 'playlists/tracks',
                params: {cursor: pageParam, paginationType: "cursor", pageSize: 5},
            }),
        }),
    }),
})

export const {useFetchTracksInfiniteQuery} = tracksApi