import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
    useLazyGetOnePlaylistQuery
} from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import {EditPlaylistForm} from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm";
import {useForm} from "react-hook-form";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/components";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, changePageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)
    const {data, isLoading} = useFetchPlaylistsQuery({search: debounceSearch, pageNumber: currentPage, pageSize})

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
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type="search"
                placeholder={'Search playlist by title'}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            <div className={s.items}>
                {!data?.data.length && !isLoading && <h2 style={{fontSize: '40px'}}>Playlist not found 😭😔</h2>}
                {data?.data.map(playlist => {

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
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSize}
            />
        </div>
    )
}