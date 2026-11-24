import {useFetchTracksInfiniteQuery} from "@/features/tracks/api/tracksApi";
import styles from "./TracksPage.module.css";

export const TracksPage = () => {
    const {data} = useFetchTracksInfiniteQuery()
    console.log(data)

    const pages = data?.pages.map((page) => page.data).flat() || []

    return (
        <div>
            <h1>Tracks page</h1>
            <div className={styles.list}>
                {pages.map(track => {
                    const {title, user, attachments} = track.attributes

                    return (
                        <div key={track.id} className={styles.item}>
                            <div>
                                <p>Title: {title}</p>
                                <p>Name: {user.name}</p>
                            </div>
                            {attachments.length ? <audio controls src={attachments[0].url}/> : 'no file'}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}