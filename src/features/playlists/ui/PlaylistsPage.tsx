import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import {type ChangeEvent, useState} from "react";
import {Pagination} from "@/common/components";
import {PlaylistsList} from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {useDebounceValue} from "@/common/hooks";
import 'react-loading-skeleton/dist/skeleton.css'
import {PlaylistSkeleton} from "@/features/playlists/ui/PlaylistsPage/PlaylistsSkeleton/PlaylistsSkeleton";


export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)
    const {data, currentData, isLoading, isFetching, status} = useFetchPlaylistsQuery({
            search: debounceSearch,
            pageNumber: currentPage,
            pageSize
        },
        // pollingInterval: 3000,//each request will repeat each 3 seconds
        // skipPollingIfUnfocused: true,//if unfocus-skip polling interval
    )
    console.log({isLoading, isFetching, status, currentData, data})


    const changePageSizeHandler = (size: number) => {
        setCurrentPage(1)
        setPageSize(size)
    }
    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    if (isLoading) return <PlaylistSkeleton/>

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type="search"
                placeholder={'Search playlist by title'}
                onChange={searchPlaylistHandler}
            />
            <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading}/>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}