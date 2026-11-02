import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.css'
import {useUploadPlaylistCoverMutation} from "@/features/playlists/api/playlistsApi";
import type {ChangeEvent} from "react";

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData | null) => void
}

export const PlaylistItem = ({playlist, editPlaylistHandler, deletePlaylistHandler}: Props) => {
    const originalCover = playlist.attributes.images.main.find(img => img.type === "original")
    const src = originalCover ? originalCover.url : defaultCover

    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const maxSize = 1024 * 1024 //1mb

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

        const file = event.target.files?.length && event.target.files[0]
        if (!file) {
            return
        }
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPEG, PNG or GIF images are allowed')
        }

        if (file.size > maxSize) {
            alert('Max size is less than ' + maxSize)
        }

        uploadPlaylistCover({
            playlistId: playlist.id,
            file
        })
    }


    return (
        <div>
            <img src={src} alt="cover" width={'240px'} className={s.cover}/>
            <input type={"file"} accept={"image/jpeg, image/png, image/gif"} onChange={uploadCoverHandler}/>
            <div>title: {playlist.attributes.title}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>Update</button>
        </div>
    )
}