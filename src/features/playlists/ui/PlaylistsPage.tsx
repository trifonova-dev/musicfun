import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
    useLazyGetOnePlaylistQuery,
    useUpdatePlaylistMutation
} from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const {data: playlistsResponse} = useFetchPlaylistsQuery()
    const [getOnePlaylist] = useLazyGetOnePlaylistQuery()

    const [deletePlaylist] = useDeletePlaylistMutation()
    const [updatePlaylist] = useUpdatePlaylistMutation()

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

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = playlistsResponse => {
        if (!playlistId) return
        updatePlaylist({
            playlistId,
            body: playlistsResponse
        }).then(() => {
            setPlaylistId(null)
        })
    }


    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {playlistsResponse?.data.map(playlist => {

                    const isEditing = playlist.id === playlistId

                    return (
                        <div className={s.item} key={playlist.id}>
                            {
                                isEditing ?
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h2>Edit playlist</h2>
                                        <div>
                                            <input {...register('title')} placeholder={'title'}/>
                                        </div>
                                        <div>
                                            <input {...register('description')} placeholder={'description'}/>
                                        </div>
                                        <button type={'submit'}>save</button>
                                        <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                                            cancel
                                        </button>
                                    </form>

                                    : <PlaylistItem
                                        playlist={playlist}
                                        deletePlaylistHandler={deletePlaylistHandler}
                                        editPlaylistHandler={editPlaylistHandler }/>

                            }

                        </div>
                    )
                })}
            </div>
        </div>
    )
}