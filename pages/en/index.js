import Home from '../../components/Home';
import { motion } from "framer-motion";

function HomePage({movieData,tvData,base_url}) {
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100
      };

    return (
        <motion.main
            transition={config}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }} 
        >
            <Home movieData={movieData} tvData={tvData} base_url={base_url} />
        </motion.main>
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

export default HomePage;
