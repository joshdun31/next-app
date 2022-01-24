import Link from "next/link";

function Poster({item,type}) {
    const getYear = (date) => {
        return date?.slice(0, 4);
      };
      const removeSpecialCharacters=(title)=>{
        return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, '')
      }
    
      const covertToLinkWords=(title)=>{
        var s=removeSpecialCharacters(title)
        return s.replace(/\s+/g, '-').toLowerCase()
      }
    
      const getLink=()=>{
        if(type==="movie"){
          return "/en/movie/" + item.id + "/" + covertToLinkWords(type==="movie"?item.title:item.name) + "-" + getYear(item.release_date)
        }
        else return "/en/tv/" + item.id + "/" + covertToLinkWords(type==="movie"?item.title:item.name) + "-" + getYear(item.first_air_date)
      }
    return(
        <>
            <Link href={getLink()}>
                <a><img src={"https://image.tmdb.org/t/p/w780"+item.poster_path} alt="" srcset="" /></a>
            </Link>
            <style jsx>
                {
                    `
                    img{
                        width:140px;
                        height:200px;
                        margin-right:12px;
                        margin-bottom:8px;
                        border-radius:3px;
                        cursor:pointer;
                    }
                    `
                }
            </style>
        </>
    )
}

export default Poster;
