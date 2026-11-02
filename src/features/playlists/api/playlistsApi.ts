import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {baseApi} from "@/features/playlists/api/api/baseApi";
import type {Images} from "@/common/types";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => `playlists`,
            providesTags: ["Playlist"],
        }),
        getOnePlaylist: build.query<{ data: PlaylistData }, string>({
            query: (playlistId) => ({
                url: `/playlists/${playlistId}`,
            }),
            providesTags: ["Playlist"],

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
            invalidatesTags: ["Playlist"],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({
                url: `/playlists/${playlistId}`,
                method: 'delete',

            }),
            invalidatesTags: ["Playlist"],
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => ({
                url: `/playlists/${playlistId}`,
                method: 'put',
                body: {
                    data: {
                        type: "playlists",
                        attributes: body,
                    }
                },
            }),
            invalidatesTags: ["Playlist"],
        }),
        uploadPlaylistCover: build.mutation<Images, { playlistId: string, file: File }>({
            query: ({playlistId, file}) => {
                const formData = new FormData()
                formData.append("file", file)
                return ({
                    url: `/playlists/${playlistId}/images/main`,
                    method: 'post',
                    body: formData
                })
            },
            invalidatesTags: ["Playlist"]
        }),
        deletePlaylistCover: build.mutation<void, { playlistId: string }>({
            query: ({playlistId}) => ({
                url: `playlists/${playlistId}/images/main`,
                method: "delete"
            }),
            invalidatesTags: ["Playlist"]
        }),
    })
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useGetOnePlaylistQuery,
    useLazyGetOnePlaylistQuery,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi