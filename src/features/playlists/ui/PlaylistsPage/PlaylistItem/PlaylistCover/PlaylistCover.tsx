import s from "./PlaylistCover.module.css"
import type {ChangeEvent} from "react";
import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from "@/features/playlists/api/playlistsApi";
import type {Images} from "@/common/types";
import defaultCover from "@/assets/images/default-playlist-cover.png"
import {toast} from "react-toastify";

type Props = {
    playlistId: string
    images: Images
}

export const PlaylistCover = ({playlistId, images}: Props) => {
    const originalCover = images.main.find(img => img.type === "original")
    const src = originalCover ? originalCover.url : defaultCover
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deletePlaylistCover] = useDeletePlaylistCoverMutation()


    const deleteCoverHandler = () => {
        deletePlaylistCover({playlistId})
    }
    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const maxSize = 1024 * 1024 //1mb

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

        const file = event.target.files?.length && event.target.files[0]
        if (!file) {
            return
        }
        if (!allowedTypes.includes(file.type)) {
            toast('Only JPEG, PNG or GIF images are allowed', {type: "error", theme: "colored"},)
        }

        if (file.size > maxSize) {
            toast('Max size is less than ' + maxSize, {type: "error", theme: "colored"})
        }

        uploadPlaylistCover({
            playlistId,
            file
        })
    }


    return (
        <>
            <img src={src} alt="cover" width={'240px'} className={s.cover}/>
            <input type={"file"} accept={"image/jpeg, image/png, image/gif"} onChange={uploadCoverHandler}/>
            {originalCover && <button onClick={() => deleteCoverHandler()}>Delete custom cover</button>}
        </>
    )
}