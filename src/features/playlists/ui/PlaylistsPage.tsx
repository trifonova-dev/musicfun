import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";

export const PlaylistsPage = () => {

    const {data, isLoading} = useFetchPlaylistsQuery()
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>Playlists page</h1>
            <div>
                {data?.data.map((playlist) => {
                    return (
                        <div key={playlist.id}>
                            {playlist.attributes.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}