import {useGetOnePlaylistQuery} from "@/features/playlists/api/playlistsApi";

type Props = {
    playlistId: string
}

export const PlaylistDescription = ({playlistId}: Props) => {
    const {data: response} = useGetOnePlaylistQuery(playlistId)

    return (
        <div>description: {response?.data.attributes.description}</div>
    )
}