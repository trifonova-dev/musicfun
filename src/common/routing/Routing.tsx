import {Route, Routes} from "react-router";
import {MainPage} from "@/app/ui/MainPage/MainPage";
import {TracksPage} from "@/features/tracks/ui/TracksPage";
import {ProfilePage} from "@/features/auth/ui/ProfilePage/ProfilePage";
import {PlaylistsPage} from "@/features/playlists/ui/PlaylistsPage";
// import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound";
import {PageNotFound} from "@/common/components";
import {Path} from "@/common/routing/path";


export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage/>}/>
        <Route path={Path.Playlists} element={<PlaylistsPage/>}/>
        <Route path={Path.Tracks} element={<TracksPage/>}/>
        <Route path={Path.Profile} element={<ProfilePage/>}/>
        <Route path={Path.NotFound} element={<PageNotFound/>}/>
    </Routes>
)