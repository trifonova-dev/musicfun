import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {CreatePlaylistArgs, PlaylistData, PlaylistsResponse} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => `playlists`,
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (CreatePlaylistArgs) => ({
                url: 'playlists',
                method: 'post',
                body: {
                    data: {
                        type: "playlists",
                        attributes: CreatePlaylistArgs
                    }
                },
            }),
        }),
    })
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {useFetchPlaylistsQuery, useCreatePlaylistMutation} = playlistsApi