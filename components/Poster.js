import Link from "next/link";
import Image from "next/image";
import styles from '../scss/components/poster.module.scss';

function Poster({ item, type }) {
  const getYear = (date) => {
    return date?.slice(0, 4);
  };
  const removeSpecialCharacters = (title) => {
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
  };

  const covertToLinkWords = (title) => {
    var s = removeSpecialCharacters(title);
    return s.replace(/\s+/g, "-").toLowerCase();
  };

  const getLink = () => {
    if (type === "movie") {
      return (
        "/en/movie/" +
        item.id +
        "/" +
        covertToLinkWords(type === "movie" ? item.title : item.name) +
        "-" +
        getYear(item.release_date)
      );
    } else
      return (
        "/en/tv/" +
        item.id +
        "/" +
        covertToLinkWords(type === "movie" ? item.title : item.name) +
        "-" +
        getYear(item.first_air_date)
      );
  };
  return (
    <>
      <Link href={getLink()}>
        <a className={styles.poster_link}>
          <div className={styles.poster_container}>
            <Image
              src={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              layout="fill"
              placeholder="blur"
              objectFit="cover"
              blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              alt={item.title}
            />
          </div>
        </a>
      </Link>
    </>
  );
}

export default Poster;
