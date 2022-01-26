import Poster from '../../components/Poster';
import Head from 'next/head';
import styles from  '../../scss/components/home.module.scss';
import { useRouter } from "next/router";
import { useRef,useState } from 'react';

function Home({movieData,tvData,base_url}) {
    const router = useRouter();
    let overview=`ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info 
        service featuring high quality content for a huge selection of titles 
        and new releases! Available in all countries.`

    const [movieScrollLeft, setmovieScrollLeft] = useState(0);
    const movieSlide = useRef(null);
    const tvSlide = useRef(null);
    const movieSlideContainer = useRef(null);
    function handleMovieSlideRight() {
        let v=movieSlide.current.scrollLeft
        if (Math.ceil(v+movieSlide.current.offsetWidth)<(movieSlide.current.scrollWidth)) {
            movieSlide.current.scrollLeft=movieSlide.current.scrollLeft+movieSlideContainer.current.offsetWidth
            setmovieScrollLeft(v+movieSlideContainer.current.offsetWidth)
        }
    }
    function handleMovieSlideLeft() {
        let v=movieSlide.current.scrollLeft
        if (v>0) {
            movieSlide.current.scrollLeft=movieSlide.current.scrollLeft-movieSlideContainer.current.offsetWidth
            setmovieScrollLeft(v-movieSlideContainer.current.offsetWidth)   
        }
    }
    function handleTvSlideRight() {
        tvSlide.current.scrollLeft=tvSlide.current.scrollLeft+movieSlideContainer.current.offsetWidth
    }
    function handleTvSlideLeft() {
        tvSlide.current.scrollLeft=tvSlide.current.scrollLeft-movieSlideContainer.current.offsetWidth
    }
    return (
        <div>
            <Head>
                <title>ZFlix - Watch Movies & TV Shows</title>
                <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta name="description" content={overview}/>
                <meta name="keywords" content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={base_url+router.asPath}/>
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"}/>
                <meta property="og:description" content={overview}/>
                <meta property="og:image" content="/favicon.ico"/>
                
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={base_url+router.asPath}/>
                <meta property="twitter:title" content={"ZFlix - Watch Movies & TV Shows"}/>
                <meta property="twitter:description" content={overview}/>
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

                    <div className={styles.whole_poster} ref={movieSlideContainer}>
                        {movieScrollLeft==0?
                            null
                            :
                            <div className={styles.left_arrow+' '+styles.arrow} onClick={handleMovieSlideLeft}>
                                <img src="./assets/left-arrow.png" className={styles.arrow_image} alt="" srcset="" />
                            </div>
                        }
                        <div className={styles.poster_container} ref={movieSlide}>
                            {movieData.map((item) => (
                                <Poster type="movie" key={item.id} item={item} />
                            ))}
                        </div>
                        <div className={styles.right_arrow+' '+styles.arrow} onClick={handleMovieSlideRight}>
                            <img src="./assets/right-arrow.png" className={styles.arrow_image} alt="" srcset="" />
                        </div>
                    </div>
                </section>

                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending TV Shows</h2>
                        <p>Check out what everyone is talking about</p>
                    </div>
                    
                    <div className={styles.whole_poster}>
                        <div className={styles.left_arrow+' '+styles.arrow} onClick={handleTvSlideLeft}>
                            <img src="./assets/left-arrow.png" className={styles.arrow_image} alt="" srcset="" />
                        </div>
                        <div className={styles.poster_container} ref={tvSlide}>
                            {tvData.map((item) => (
                                <Poster type="tv" key={item.id} item={item} />
                            ))}
                        </div>
                        <div className={styles.right_arrow+' '+styles.arrow} onClick={handleTvSlideRight}>
                            <img src="./assets/right-arrow.png" className={styles.arrow_image} alt="" srcset="" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const movieRes=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
        const movieData=await movieRes.json()
        const tvRes=await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`)
        const tvData=await tvRes.json()
        return {
            props:{
                movieData:movieData.results,
                tvData:tvData.results,
                base_url: process.env.BASE_URL
            }
        }
    } catch (error) {
        console.log(error.message);
        return {
            notFound:true
        }
    }
}

export default Home;
