import Head from "next/head";
import { getYear } from '../utils/functions';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from '../scss/components/tv.module.scss';
import styles2 from '../scss/components/movie.module.scss';
import styles3 from '../scss/components/cast.module.scss';
import Image from "next/image";

function Tv({ data, base_url }) {
    const router = useRouter();

    let {id,name}=router.query

    const getTitle=()=>{
        let title = data.name ? data.name : "";
        let year = data.first_air_date ? " (" + getYear(data.first_air_date) + ")" : "";
        return title + year + " - ZFlix";
    }
    
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
                                    <div className={data.poster_path?styles2.content_poster_image:styles2.content_poster_image+' '+styles2.no_image}>
                                        <Image
                                            src={
                                                data.poster_path
                                                    ? "https://image.tmdb.org/t/p/w780" + data.poster_path
                                                    : "/assets/image-not-found.png"
                                            }
                                            layout="fill"
                                            placeholder="blur"
                                            objectFit={data.poster_path?"cover":"contain"}
                                            objectPosition={data.poster_path?"top":"center"}
                                            blurDataURL={
                                                "https://image.tmdb.org/t/p/w780" + data.poster_path
                                            }
                                            alt={data.title}
                                        />
                                    </div>
                                </div>
                                <div className={styles2.content_plot}>
                                    <h2 className={styles2.content_title}>{data.name}</h2>
                                    <p className={styles2.content_tagline}>{data.tagline}</p>
                                    <p className={styles2.content_details}>
                                        <i className="bi bi-calendar-day"></i>{" "}
                                        {getYear(data.first_air_date)}
                                        <span className={styles2.dot} ></span>
                                        <span>
                                            <i className="bi bi-star-fill"></i> {data.vote_average}
                                        </span>
                                        <span className={styles2.dot}></span>
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
                            <div className={styles2.c_header}>
                                <div className={styles2.h_line} />
                                <h2>Seasons</h2>
                                <div className={styles2.h_line} />
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
                                                    "/season/" +
                                                    item.season_number
                                                }
                                            >
                                                <a>
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
                                                </a>
                                            </Link>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                        {data?.credits?.cast.length ? (
                            <div className={styles3.content_c} >
                                <div className={styles2.c_header} >
                                    <div className={styles2.h_line}  />
                                    <h2>Cast</h2>
                                    <div className={styles2.h_line}  />
                                </div>
                                <div className={styles3.c_container} >
                                    {data?.credits?.cast.map((item) => (
                                        <div className={styles3.c_parent} >
                                            <div className={item.profile_path ?styles3.c_image:styles3.c_image+' '+styles3.no_image}>
                                                <Image
                                                    src={item.profile_path ?"https://image.tmdb.org/t/p/w780" + item.profile_path:"/assets/image-not-found.png"}
                                                    layout="fill"
                                                    placeholder="blur"
                                                    objectFit="cover"
                                                    blurDataURL={"https://image.tmdb.org/t/p/w780" + item.profile_path}
                                                    alt={item.title}
                                                    />
                                            </div>
                                            <div className={styles3.c_detail} >
                                                <p className={styles3.c_name} >{item.name}</p>
                                                <p className={styles3.c_job} >
                                                    <em>{item.character}</em>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {data?.credits?.crew.length ? (
                            <div className={styles3.content_c} >
                                <div className={styles3.c_header} >
                                    <div className={styles2.h_line}  />
                                    <h2>Crew</h2>
                                    <div className={styles2.h_line}  />
                                </div>
                                <div className={styles3.c_container} >
                                    {data?.credits?.crew.map((item) => (
                                        <div className={styles3.c_parent} >
                                            <div className={item.profile_path ?styles3.c_image:styles3.c_image+' '+styles3.no_image}>
                                                <Image
                                                    src={item.profile_path ?("https://image.tmdb.org/t/p/w780" + item.profile_path):"/assets/image-not-found.png"}
                                                    layout="fill"
                                                    placeholder="blur"
                                                    objectFit="cover"
                                                    blurDataURL={"https://image.tmdb.org/t/p/w780" + item.profile_path}
                                                    alt={item.title}
                                                    />
                                            </div>
                                            <div className={styles3.c_detail} >
                                                <p className={styles3.c_name} >{item.name}</p>
                                                <p className={styles3.c_job} >
                                                    <em>{item.job}</em>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tv;
