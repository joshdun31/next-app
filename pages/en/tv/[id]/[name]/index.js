import Tv from "../../../../../components/Tv";

function TvPage({data,base_url}) {
    
    return(
        <main>
            <Tv data={data} base_url={base_url} />
        </main>
    )
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,similar`
        );
        const data = await res.json();
        if (!data.hasOwnProperty("success")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL                
                },
            };
        }
        return {
            notFound: true,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default TvPage;
