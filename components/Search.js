import {
    getMonth,
    getMinute,
    getYear,
    convertMoney,
    getHour,
    getDate,
    covertToLinkWords,
} from "../utils/functions";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../scss/components/search.module.scss";
import Head from "next/head";
import Image from "next/image";

function Search({ results, total_pages, base_url }) {
    const router = useRouter();
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    return (
        <>
            <Head>
                <title>{router.query.q} - ZFlix</title>
                <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/favicon.ico" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"ZFlix - Watch Movies & TV Shows"}
                />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/favicon.ico"></meta>
            </Head>
            <div className={styles.search_container}>
                {results.length ? (
                    <div className={styles.first_result_container}>
                        <div className={styles.first_result_image}>
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/original" +
                                    results[0].backdrop_path
                                }
                                alt=""
                            />
                        </div>
                        <div className={styles.first_result_detail}>
                            <p className={styles.title}>
                                {results[0].media_type === "movie"
                                    ? results[0].title
                                    : results[0].name}{" "}
                                (
                                {results[0].media_type === "movie"
                                    ? getYear(results[0].release_date)
                                    : getYear(results[0].first_air_date)}
                                )
                            </p>
                            <div className={styles.watch_now}>
                                <span>
                                    <i class="bi bi-play-fill"></i>
                                </span>
                                Watch Now
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className={styles.whole_results_container}>
                    <div className={styles.result_genre}></div>
                    <div className={styles.search_results}>
                        <p className={styles.result_heading}>
                            Search results for <strong>{router.query.q}</strong>
                        </p>
                        <div className={styles.results_container}>
                            {results.map((item) =>
                                item.media_type === "movie" ? (
                                    <Movie item={item} key={item.id} />
                                ) : item.media_type === "tv" ? (
                                    <TvShow item={item} key={item.id} />
                                ) : null
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Movie({ item }) {
    return (
        <div className={styles.result_box} key={item.id}>
            <Link
                href={
                    "/en/movie/" +
                    item.id +
                    "/" +
                    covertToLinkWords(item.title) +
                    "-" +
                    getYear(item.release_date)
                }
            >
                <a>
                    <div className={item.poster_path?styles.result_image:(styles.result_image+' '+styles.no_image)}>
                        <Image
                            src={
                                item.poster_path
                                    ? "https://image.tmdb.org/t/p/w780" + item.poster_path
                                    : "/assets/image-not-found.png"
                            }
                            layout="fill"
                            placeholder="blur"
                            objectFit={item.poster_path?"cover":"contain"}
                            blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
                            alt={item.title}
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.result_detail}>
                <Link
                    href={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date)
                    }
                >
                    <a>
                        <p className={styles.result_title}>{item.title}</p>
                    </a>
                </Link>
                <p className={styles.result_tagline}>{item.tagline}</p>
                <p className={styles.result_date}>
                    <span>
                        <i class="bi bi-calendar-day"></i>
                    </span>
                    {getDate(item.release_date)}
                </p>
                <p className={styles.result_overview}>{item.overview}</p>
                <Link
                    href={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date) +
                        "/watch"
                    }
                >
                    <a>
                        <div className={styles.watch_now}>
                            <span>
                                <i class="bi bi-play-fill"></i>
                            </span>
                            Watch Now
                        </div>
                    </a>
                </Link>
                <p className={styles.result_type}>Movie</p>
            </div>
        </div>
    );
}
function TvShow({ item }) {
    return (
        <Link
            href={
                "/en/tv/" +
                item.id +
                "/" +
                covertToLinkWords(item.name) +
                "-" +
                getYear(item.first_air_date)
            }
        >
            <a>
                <div className={styles.result_box} key={item.id}>
                    <div className={styles.result_image}>
                        <Image
                            src={
                                item.poster_path
                                    ? "https://image.tmdb.org/t/p/w780" + item.poster_path
                                    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                            }
                            layout="fill"
                            placeholder="blur"
                            objectFit="cover"
                            blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
                            alt={item.name}
                        />
                    </div>
                    <div className={styles.result_detail}>
                        <p className={styles.result_title}>{item.name}</p>
                        <p className={styles.result_date}>
                            <span>
                                <i class="bi bi-calendar-day"></i>
                            </span>
                            {getDate(item.first_air_date)}
                        </p>
                        <p className={styles.result_tagline}>{item.tagline}</p>
                        <p className={styles.result_overview}>{item.overview}</p>
                        <p className={styles.result_type}>TV Show</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default Search;
