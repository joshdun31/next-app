import Search from "../../../components/Search";


function SearchPage({data,total_pages,base_url}) {
    const results=data.results
    
    return <Search results={data.results} base_url={base_url} total_pages={total_pages} />
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${context.query.q}&page=${context.query.page}&include_adult=false`
        );
        const data = await res.json();
        if (!data.hasOwnProperty("success")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL,
                    total_pages:data.total_pages
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

export default SearchPage;
