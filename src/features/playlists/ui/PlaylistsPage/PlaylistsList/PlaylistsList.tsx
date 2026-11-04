import {EditPlaylistForm} from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import s from "./PlaylistsList.module.css"
import {useState} from "react";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {useDeletePlaylistMutation, useLazyGetOnePlaylistQuery} from "@/features/playlists/api/playlistsApi";
import {useForm} from "react-hook-form";

type Props = {
    playlists: PlaylistData[]
    isPlaylistsLoading: boolean
}

export const PlaylistsList = ({playlists, isPlaylistsLoading}: Props) => {

    const [playlistId, setPlaylistId] = useState<string | null>(null)

    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const [getOnePlaylist] = useLazyGetOnePlaylistQuery()

    const [deletePlaylist] = useDeletePlaylistMutation()


    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm("Are you sure?")) {
            deletePlaylist(playlistId)
        }
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            getOnePlaylist(playlist.id).unwrap().then(response => {
                reset({
                    title: response.data.attributes.title,
                    description: response.data.attributes.description,
                    tagIds: response.data.attributes.tags.map(tag => tag.id)
                })
            })
        }
        else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.items}>
            {!playlists.length && !isPlaylistsLoading && <h2 style={{fontSize: '40px'}}>Playlist not found 😭😔</h2>}
            {playlists.map(playlist => {

                const isEditing = playlist.id === playlistId

                return (
                    <div className={s.item} key={playlist.id}>
                        {
                            isEditing
                                ? <EditPlaylistForm
                                    playlistId={playlistId}
                                    setPlaylistId={setPlaylistId}
                                    editPlaylistHandler={editPlaylistHandler}
                                    register={register}
                                    handleSubmit={handleSubmit}/>
                                : <PlaylistItem
                                    playlist={playlist}
                                    deletePlaylistHandler={deletePlaylistHandler}
                                    editPlaylistHandler={editPlaylistHandler}/>

                        }
                    </div>
                )
            })}
        </div>
    )
}