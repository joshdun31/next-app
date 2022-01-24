import Poster from '../../components/Poster';
import Head from 'next/head';
// import style from '../../components/style/home.scss';

function Home({movieData,tvData}) {
    return (
        <div>
            {/* <Head> */}
                {/* <title>ZFlix | Home</title> */}
                {/* <meta name="title" content={data.title} />
                <meta name="description" content={data.overview}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={base_url+router.asPath}/>
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={data.title}/>
                <meta property="og:description" content={data.overview}/>
                <meta property="og:image" content={"https://image.tmdb.org/t/p/w780"+data.poster_path}/>
                
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={base_url+router.asPath}/>
                <meta property="twitter:title" content={data.title}/>
                <meta property="twitter:description" content={data.overview}/>
                <meta property="twitter:image" content={"https://image.tmdb.org/t/p/w780"+data.poster_path}></meta> */}
            {/* </Head> */}
            <div className={"main_content"}>
                <section className="section-main">
                    <div className="section-header">
                        <h2 className="heading">Trending Movies</h2>
                        <p>
                            Here are some of the most recent movies recommended by our
                            community
                        </p>
                    </div>

                    <div className="whole-poster">
                        <div className="poster-container movie">
                            {movieData.map((item) => (
                                <Poster type="movie" key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-main">
                    <div className="section-header">
                        <h2 className="heading">Trending TV Shows</h2>
                        <p>Check out what everyone is talking about</p>
                    </div>
                    
                    <div className="whole-poster">
                        <div className="poster-container">
                            {tvData.map((item) => (
                                <Poster type="tv" key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    try {
        const movieRes=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
        const movieData=await movieRes.json()
        const tvRes=await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`)
        const tvData=await tvRes.json()
        return {
            props:{
                movieData:movieData.results,
                tvData:tvData.results
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default Home;
