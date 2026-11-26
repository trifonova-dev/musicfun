import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './PlaylistsSkeleton.module.css'

type Props = {
    cardsCount?: number
}

export const PlaylistSkeleton = ({cardsCount = 2}: Props) => {
    return (
        <SkeletonTheme baseColor="#e9e3f7" highlightColor="#f2f2f2">
            {/* навигация */}
            <div className={styles.nav}>
                <Skeleton width={45} height={20}/>
                <Skeleton width={75} height={20}/>
                <Skeleton width={55} height={20}/>
                <Skeleton width={55} height={20}/>
            </div>

            {/* Playlists page */}
            <div className={styles.pageTitle}>
                <Skeleton width={245} height={36}/>
            </div>

            {/* Create new playlist */}
            <div className={styles.form}>
                <Skeleton width={257} height={28} containerClassName={styles.formTitle}/>
                <Skeleton width={190} height={24}/>
                <Skeleton width={190} height={24}/>
                <Skeleton width={125} height={26}/>
            </div>

            {/* поиск */}
            <Skeleton height={26}/>

            {/* карточки */}
            <div className={styles.cardsList}>
                {Array.from({length: cardsCount}, (_, index) => (
                    <div key={index} className={styles.card}>
                        <Skeleton width={240} height={240} borderRadius={4}/>
                        <Skeleton width={190} height={22}/>
                        <Skeleton width={100} height={18}/>
                        <Skeleton width={180} height={18}/>
                        <div className={styles.cardButtons}>
                            <Skeleton width={60} height={24}/>
                            <Skeleton width={60} height={24}/>
                        </div>
                    </div>
                ))}
            </div>

            {/* пагинация */}
            <div className={styles.pagination}>
                <Skeleton width={36} height={36} borderRadius={6}/>
                <Skeleton width={36} height={36} borderRadius={6}/>
                <Skeleton width={20} height={16}/>
                <Skeleton width={56} height={36} borderRadius={6}/>
                <Skeleton width={160} height={20} containerClassName={styles.perPage}/>
            </div>
        </SkeletonTheme>
    )
}