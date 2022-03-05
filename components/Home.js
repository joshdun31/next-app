import { useRouter } from "next/router";
import styles from "../scss/components/home.module.scss";
import Head from "next/head";
import Poster from "./atoms/Poster";
import ScrollContainer from "react-indiana-drag-scroll";

function Home({ movieData, tvData, base_url }) {
    const router = useRouter();
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    const shareContent=async()=>{
        try {
            await navigator.share({ title: "Example Page", url: "http://localhost:3000/en/hello" });
            console.log("Data was shared successfully");
          } catch (err) {
            console.error("Share failed:", err.message);
          }
    }

    return (
        <>
            <Head>
                <title>ZFlix - Watch Movies & TV Shows</title>
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
            <div className={styles.main_content}>
                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending Movies</h2>
                        <p>
                            Here are some of the most recent movies recommended by our
                            community
                        </p>
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div
                                className={styles.poster_container
                                }
                            >
                                {movieData.map((item) => (
                                    <Poster type="movie" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section>

                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending TV Shows</h2>
                        <p>Check out what everyone is talking about</p>
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div
                                className={ styles.poster_container
                                }
                            >
                                {tvData.map((item) => (
                                    <Poster type="tv" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section>
            </div>
            <button onClick={shareContent}>Share </button>
        </>
    );
}

export default Home;

/*
 <div className={styles.whole_poster} ref={movieSlideContainer}>
    {movieScrollLeft==0?
        null
        :
        <div className={styles.left_arrow+' '+styles.arrow} onClick={handleMovieSlideLeft}>
            <img src="./assets/left-arrow.png" className={styles.arrow_image} alt="" srcSet="" />
        </div>
    }
    <div className={styles.poster_container} ref={movieSlide}>
        {movieData.map((item) => (
            <Poster type="movie" key={item.id} item={item} />
        ))}
    </div>
    <div className={styles.right_arrow+' '+styles.arrow} onClick={handleMovieSlideRight}>
        <img src="./assets/right-arrow.png" className={styles.arrow_image} alt="" srcSet="" />
    </div>
</div>
*/
