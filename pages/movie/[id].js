import { useRouter } from "next/router";
import style from '../../components/movie.module.css';
import Head from 'next/head';


function Movie(props) {
    const router=useRouter()
    console.log(router.asPath);
    return(
        <>
            <Head>
                <title>{props.data.title}</title>
                <meta name="title" content={props.data.title} />
                <meta name="description" content={props.data.overview}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://serene-engelbart-f5988f.netlify.app"+router.asPath}/>
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={props.data.title}/>
                <meta property="og:description" content={props.data.overview}/>
                <meta property="og:image" content={"https://image.tmdb.org/t/p/w780"+props.data.poster_path}/>
                
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={"https://serene-engelbart-f5988f.netlify.app"+router.asPath}/>
                <meta property="twitter:title" content={props.data.title}/>
                <meta property="twitter:description" content={props.data.overview}/>
                <meta property="twitter:image" content={"https://image.tmdb.org/t/p/w780"+props.data.poster_path}></meta>
            </Head>
            <div className={style.movie_detail}>
                <div className={style.overview}>
                    <img className={style.poster} src={"https://image.tmdb.org/t/p/w780"+props.data.poster_path} alt={props.data.title} srcset="" />
                    <div>
                        <h2>{props.data.title}</h2> 
                        <p>{props.data.release_date}</p>
                        <p>{props.data.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const res=await fetch(`https://api.themoviedb.org/3/movie/${context.query.id}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits,recommendations,similar`)
    const data=await res.json()
    return{
        props:{
            data
        }
    }
}

export default Movie;