import Head from "next/head";
import { getYear } from '../utils/functions';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from '../scss/components/tv.module.scss';
import styles2 from '../scss/components/movie.module.scss';


function Tv({ data, base_url }) {
    const router = useRouter();

    let {id,name}=router.query

    const getTitle=()=>{
        let title = data.name ? data.name : "";
        let year = data.first_air_date ? " (" + getYear(data.first_air_date) + ")" : "";
        return title + year + " - ZFlix";
    }
    console.log(data);
    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="title" content={getTitle()} />
                <meta name="description" content={data.overview} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={getTitle()} />
                <meta property="og:description" content={data.overview} />
                <meta
                    property="og:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={getTitle()} />
                <meta property="twitter:description" content={data.overview} />
                <meta
                    property="twitter:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                ></meta>
            </Head>
            <div className={styles2.w_content}>
                <div className={styles2.content}>
                    <div
                        className={styles2.content_bg}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                        }}
                    ></div>

                    <div className={styles2.content_parent}>
                        <div className={styles2.content_hero}>
                            <div className={styles2.content_info}>
                                <div className={styles2.content_poster}>
                                    <img
                                        src={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                                        alt=""
                                        srcset=""
                                    />
                                </div>
                                <div className={styles2.content_plot}>
                                    <h2 className={styles2.content_title}>{data.name}</h2>
                                    <p className={styles2.content_tagline}>{data.tagline}</p>
                                    <p className={styles2.content_details}>
                                        <i className="bi bi-calendar-day"></i>{" "}
                                        {getYear(data.first_air_date)}
                                        <span className="dot">.</span>
                                        <span>
                                            <i className="bi bi-star-fill"></i> {data.vote_average}
                                        </span>
                                        <span className={styles2.dot}>.</span>
                                        <span className={styles2.runtime}>
                                            <i className="bi bi-clock"></i> {data.runtime} mins
                                        </span>
                                    </p>
                                    <div className={styles2.genres}>
                                        {data?.genres?.map((item, i) => (
                                            <span className={styles2.genre}>{item.name}</span>
                                        ))}
                                    </div>
                                    <p className={styles2.content_overview}>{data.overview}</p>
                                    <div className={styles2.show}>
                                        <div className={styles2.watch_now} onClick={() => setwatch(true)}>
                                            <i class="bi bi-play-fill"></i>
                                            Watch Now
                                        </div>
                                        <div
                                            className={styles2.show_trailer}
                                            onClick={() => setwatch(true)}
                                        >
                                            Trailer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.season_container}>
                            <div className={styles.c_header}>
                                <div className={styles.h_line} />
                                <h2>Seasons</h2>
                                <div className={styles.h_line} />
                            </div>
                            <div className={styles.season_dropdown}>
                                <div className={styles.seasons}>
                                    {data.seasons.map((item) => {
                                        return item.season_number !== 0 ? (
                                            <Link
                                                href={
                                                    "/en/tv/" +
                                                    id +
                                                    "/" +
                                                    name +
                                                    "/season-" +
                                                    item.season_number
                                                }
                                            >
                                                <div className={styles.season} >
                                                    <img
                                                        src={
                                                            "https://image.tmdb.org/t/p/w500" +
                                                            item.poster_path
                                                        }
                                                        alt=""
                                                    />
                                                    <div className={styles.s_content} >
                                                        
                                                        <div className={styles.s_no} >
                                                            Season {item.season_number}
                                                        </div>
                                                        {/* <div className="s-overview">{item.overview}</div> */}
                                                        <p className={styles.s_e_count}>
                                                            {item.episode_count} Episodes
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* {data?.credits?.cast.length ? (
                            <div className="content-c">
                                <div className="c-header">
                                    <div className="h-line" />
                                    <h2>Cast</h2>
                                    <div className="h-line" />
                                </div>
                                <div className="c-container">
                                    {data?.credits?.cast.map((item) => (
                                        <div className="c-parent">
                                            {item.profile_path ? (
                                                <img
                                                    className="c-image"
                                                    src={
                                                        "https://image.tmdb.org/t/p/original" +
                                                        item.profile_path
                                                    }
                                                    alt=""
                                                />
                                            ) : (
                                                <div className="no-image-container">
                                                    <img
                                                        className="no-image"
                                                        src="/assets/image-not-found.png"
                                                        alt="not found"
                                                        srcset=""
                                                    />
                                                </div>
                                            )}
                                            <div className="c-detail">
                                                <p className="c-name">{item.name}</p>
                                                <p className="c-job">
                                                    <em>{item.character}</em>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {data?.credits?.crew.length ? (
                            <div className="content-c">
                                <div className="c-header">
                                    <div className="h-line" />
                                    <h2>Crew</h2>
                                    <div className="h-line" />
                                </div>
                                <div className="c-container">
                                    {data?.credits?.crew.map((item) => (
                                        <div className="c-parent">
                                            {item.profile_path ? (
                                                <img
                                                    className="c-image"
                                                    src={
                                                        "https://image.tmdb.org/t/p/original" +
                                                        item.profile_path
                                                    }
                                                    alt=""
                                                />
                                            ) : (
                                                <div className="no-image-container">
                                                    <img
                                                        className="no-image"
                                                        src="/assets/image-not-found.png"
                                                        alt="not found"
                                                        srcset=""
                                                    />
                                                </div>
                                            )}
                                            <div className="c-detail">
                                                <p className="c-name">{item.name}</p>
                                                <p className="c-job">
                                                    <em>{item.job}</em>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tv;
