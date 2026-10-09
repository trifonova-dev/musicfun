import {useDeletePlaylistMutation, useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";

export const PlaylistsPage = () => {

    const {data} = useFetchPlaylistsQuery()

    const [deletePleylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm("Are you sure?")) {
            deletePleylist(playlistId)
        }
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {data?.data.map(playlist => {
                    return (
                        <div className={s.item} key={playlist.id}>
                            <div>title: {playlist.attributes.title}</div>
                            <div>description: {playlist.attributes.description}</div>
                            <div>userName: {playlist.attributes.user.name}</div>
                            <button onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}