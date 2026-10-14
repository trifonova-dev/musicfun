import {useUpdatePlaylistMutation} from "@/features/playlists/api/playlistsApi";
import {type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister} from "react-hook-form";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";

type Props = {
    playlistId: string
    setPlaylistId: (playlistId: string | null) => void
    editPlaylistHandler: (playlist: PlaylistData | null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({playlistId, setPlaylistId, editPlaylistHandler, register, handleSubmit}: Props) => {
    const [updatePlaylist] = useUpdatePlaylistMutation()


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
    )
}