import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData | null) => void
}

export const PlaylistItem = ({playlist, editPlaylistHandler, deletePlaylistHandler}: Props) => {
    return (
        <div>
            <div>title: {playlist.attributes.title}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>Update</button>
        </div>
    )
}