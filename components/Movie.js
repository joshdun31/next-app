import Head from "next/head";
import Poster from './Poster';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getMonth,getMinute,getYear,convertMoney,getHour } from '../utils/functions';
import styles from '../scss/components/movie.module.scss';
import Link from "next/link";

function Movie({data,base_url}) {

    const router = useRouter();
    const [torrents, settorrents] = useState({});
    useEffect(() => {
        settorrents({});
        async function getAllResults() {
            await getTorrents();
        }
        getAllResults();
        return () => { };
    }, [router.query]);

    const getTitle = () => {
        let title = data.title ? data.title : "";
        let year = data.release_date ? " (" + getYear(data.release_date) + ")" : "";
        return title + year + " - ZFlix";
    };

    const getTorrents = async () => {
        try {
            var res = await fetch(
                `
                /api/v2/torrent/movie/${data.title
                } ${getYear(data.release_date)}`
            );
            let response = await res.json();
            settorrents(response);
        } catch (error) {
            console.log("Cannot find torrents");
        }
    };
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
            <div className={styles.w_content}>
                <div className={styles.content}>
                    <div
                        className={styles.content_bg}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                        }}
                    ></div>
                    <div className={styles.content_parent}>
                        <div className={styles.content_hero}>
                            <div className={styles.content_info}>
                                <div className={styles.content_poster}>
                                    <img
                                        src={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                                        alt=""
                                        srcset=""
                                    />
                                </div>

                                <div className={styles.content_plot}>
                                    <h2 className={styles.content_title}>{data.title}</h2>
                                    <p className={styles.content_tagline}>{data.tagline}</p>
                                    <p className={styles.content_details}>
                                        <i className="bi bi-calendar-day"></i>{" "}
                                        {getMonth(data.release_date)}{" "}
                                        {data?.release_date?.slice(8, 10)},{" "}
                                        {getYear(data.release_date)}
                                        <span className={styles.dot}>.</span>
                                        <span>
                                            <i className="bi bi-star-fill"></i> {data.vote_average}
                                        </span>
                                        <span className={styles.dot}>.</span>
                                        <span className={styles.runtime}>
                                            <i className="bi bi-clock"></i>
                                            {(data.runtime > 60
                                                ? getHour(data.runtime) + "hr "
                                                : "") +
                                                (getMinute(data.runtime)
                                                    ? getMinute(data.runtime) + " min"
                                                    : "")}
                                        </span>
                                    </p>
                                    <div className={styles.genres}>
                                        {data?.genres?.map((item, i) => (
                                            <span className={styles.genre}>{item.name}</span>
                                        ))}
                                    </div>
                                    <p className={styles.content_overview}>{data.overview}</p>
                                    <div className={styles.show}>
                                        <Link href={router.asPath+'/watch'}>
                                            <div className={styles.watch_now}>
                                                <i class="bi bi-play-fill"></i>
                                                Watch Now
                                            </div>
                                        </Link>
                                        <div
                                            className={styles.show_trailer}
                                            onClick={() => setwatch(true)}
                                        >
                                            Trailer
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.content_o_details}>
                                    <table>
                                        <tr>
                                            <td>Original Title</td>
                                            <td>{data.original_title}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{data.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Language</td>
                                            <td>
                                                {" "}
                                                {data.spoken_languages.map((item, i) => (
                                                    <span>
                                                        {item.english_name}
                                                        {i != data.spoken_languages.length - 1
                                                            ? ","
                                                            : ""}{" "}
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Budget</td>
                                            <td>{convertMoney(data.budget)}</td>
                                        </tr>
                                        <tr>
                                            <td>Revenue</td>
                                            <td>{convertMoney(data.revenue)}</td>
                                        </tr>
                                        <tr>
                                            <td>Production</td>
                                            <td>
                                                {" "}
                                                {data.production_companies.map((item, i) => (
                                                    <span>
                                                        {item.name}
                                                        {i != data.production_companies.length - 1
                                                            ? ","
                                                            : ""}{" "}
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Available in</td>
                                            <td>
                                                {Object.keys(torrents).length ? (
                                                    torrents?.results?.length ? null : (
                                                        <span>Not available</span>
                                                    )
                                                ) : (
                                                    <span>Getting torrent files</span>
                                                )}
                                                {torrents?.results?.map((item) => {
                                                    let hash = item.link.split("/")[5];
                                                    let name = String(item.title).split(" ");
                                                    return (
                                                        <a
                                                            title={item.title}
                                                            className="magnet-file"
                                                            href={
                                                                "magnet:?xt=urn:btih:" +
                                                                hash +
                                                                "&amp;dn=" +
                                                                item.title +
                                                                "&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
                                                            }
                                                        >
                                                            <img
                                                                src={"/assets/magnet.svg"}
                                                                alt={"Magnet"}
                                                            ></img>{" "}
                                                            <span>{name[name.length - 1]}</span>
                                                        </a>
                                                    );
                                                })}
                                                <br />
                                                {torrents?.results?.map((item) => {
                                                    let hash = item.link.split("/")[5];
                                                    let name = String(item.title).split(" ");
                                                    return (
                                                        <a
                                                            title={item.title}
                                                            className="torrent-file"
                                                            href={
                                                                "https://torrents.yts.hn/torrent/download/" +
                                                                hash
                                                            }
                                                        >
                                                            <i class="bi bi-download"></i>{" "}
                                                            <span>{name[name.length - 1]}</span>
                                                        </a>
                                                    );
                                                })}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* <div className="content-c" >
                        <div className="c-header">
                        <div className="h-line" />
                        <h2>Cast</h2>
                        <div className="h-line" />
                        </div>
                        <ScrollContainer className="c-container">
                        {data.credits.cast.map((item) => (
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
                        </ScrollContainer>
                    </div>
                    <div className="content-c">
                        <div className="c-header">
                        <div className="h-line" />
                        <h2>Crew</h2>
                        <div className="h-line" />
                        </div>
                        <ScrollContainer className="c-container">
                        {data.credits.crew.map((item) => (
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
                        </ScrollContainer>
                    </div> */}
                        {
                            data.recommendations.results.length?
                                <div className={styles.recommendation_container} > 
                                    <div className={styles.c_header}>
                                        <div className={styles.h_line} />
                                        <h2>More like this</h2>
                                        <div className={styles.h_line} />
                                    </div>
                                    <div className={styles.r_poster_container}>
                                        {data.recommendations.results.map((item) => (
                                            <Poster type="movie" key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            :null
                            }
                        {
                            data.similar.results.length?
                                <div className={styles.recommendation_container}>
                                    <div className={styles.c_header}>
                                        <div className={styles.h_line} />
                                        <h2>Recommendations</h2>
                                        <div className={styles.h_line} />
                                    </div>
                                    <div className={styles.r_poster_container}>
                                        {data.similar.results.map((item) => (
                                            <Poster type="movie" key={item.id} item={item} />
                                        ))}
                                    </div>
                                </div>
                            :null
                            }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie;
