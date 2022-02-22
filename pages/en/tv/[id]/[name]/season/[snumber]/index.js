import TvSeason from "../../../../../../../components/TvSeason";


function TvSeasonPage({data,seasondata,base_url}) {

    return <TvSeason data={data} seasondata={seasondata} base_url={base_url}  />
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,similar`
        );
        const data = await res.json();
        const res1 = await fetch(
            `https://api.themoviedb.org/3/tv/${context.query.id}/season/${context.query.snumber}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,similar`
        );
        const data1 = await res1.json();

        if (!data.hasOwnProperty("success") && !data1.hasOwnProperty("success") ) {
            return {
                props: {
                    data:data1,
                    seasondata:data,
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

export default TvSeasonPage;