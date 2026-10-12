import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
    useUpdatePlaylistMutation
} from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import type {CreatePlaylistArgs, PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const {data} = useFetchPlaylistsQuery()

    const [deletePlaylist] = useDeletePlaylistMutation()
    const [updatePlaylist] = useUpdatePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm("Are you sure?")) {
            deletePlaylist(playlistId)
        }
    }
    const updatePlaylistHandler = (playlistId: string) => {

    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map((tag) => tag.id),
            })
        }
        else {
            setPlaylistId(null)
        }
    }

    const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
        console.log(data)
        // updatePlaylist({
        //     playlistId,
        //     body: {
        //         title: "update",
        //         description: "1",
        //         tagIds: []
        //     }
        // })
    }


    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {data?.data.map(playlist => {

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

                                    : <div>
                                        <div>title: {playlist.attributes.title}</div>
                                        <div>description: {playlist.attributes.description}</div>
                                        <div>userName: {playlist.attributes.user.name}</div>
                                        <button onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
                                        <button onClick={() => editPlaylistHandler(playlist)}>Update</button>
                                    </div>
                            }

                        </div>
                    )
                })}
            </div>
        </div>
    )
}