import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm";
import {type ChangeEvent, useState} from "react";
import {Pagination} from "@/common/components";
import {PlaylistsList} from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {useDebounceValue} from "@/common/hooks";
import 'react-loading-skeleton/dist/skeleton.css'
import {PlaylistSkeleton} from "@/features/playlists/ui/PlaylistsPage/PlaylistsSkeleton/PlaylistsSkeleton";
import {toast} from "react-toastify";


export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)
    const {data, isError, error, isLoading} = useFetchPlaylistsQuery({
            search: debounceSearch,
            pageNumber: currentPage,
            pageSize
        },
        // pollingInterval: 3000,//each request will repeat each 3 seconds
        // skipPollingIfUnfocused: true,//if unfocus-skip polling interval
    )

    if (error) {
        if ('status' in error) {
            //FetchBaseQueryError
            const errMsg = 'error' in error ? error.error :
                (error.data as { error: string }).error ||
                (error.data as { message: string }).message ||
                "Something went wrong"

            toast(errMsg, {type: "error", theme: "colored"})
        }
        else {

            // SerializedError
            const errMsg = error.message || "Something went wrong"
            toast(errMsg, {type: "error", theme: "colored"})
        }
        //
    }

    console.log({isError, error})


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