import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { covertToLinkWords, getYear,getDate } from '../utils/functions';
import { useRouter } from "next/router"
import styles from '../scss/components/navbar.module.scss';

function Navbar() {
    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [searchShow, setsearchShow] = useState(false);
    const [query, setquery] = useState("");
    const inputRef = useRef();
    const navbarRef=useRef()
    const [results, setresults] = useState({});
    const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [currentSuggestion, setcurrentSuggestion] = useState(0);
    const [suggestionLoading, setsuggestionLoading] = useState(false);

    const router=useRouter()
    const { pathname } = router;

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 191) {
                handleSearchToggle();
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 72) {
                router.push("/en");
            }
        });
        document.addEventListener("click", (e) => {
            if (e.target.id !== "query") {
                setsearchContainerVisible(false);
            }
        });
        window.onscroll = (e) => {
            if (window.pageYOffset > 1) {
                navbarRef.current.classList.add(styles.scroll);
            } else {
                navbarRef.current.classList.remove(styles.scroll);
            }
        };

        if (pathname === "/en/search") {
            setquery(router.query.q)
        }
        // return () => { document.removeEventListener('click',(e)=>{console.log("click removed");})};
    }, []);


    useEffect(() => {
        if (pathname !== "/en/search") {
            inputRef.current.blur();
        }
        return () => { };
    }, [router.route]);

    let timer;

    const handleSearchToggle = () => {
        inputRef.current.focus();
    };
    const clearSearch = () => {
        setquery("");
        setresults([]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate({
        //     pathname: "/en/search",
        //     search: "?" + new URLSearchParams({ q: query }).toString(),
        // });
    };

    function suggestionUp() {
        if (results.results.length > 1 && currentSuggestion !== 0) {
            setcurrentSuggestion((prev) => prev - 1);
        }
    }

    function suggestionDown() {
        if (results.results.length >= 4 && currentSuggestion !== 3) {
            setcurrentSuggestion((prev) => prev + 1);
        } else if (currentSuggestion !== results.results.length - 1) {
            setcurrentSuggestion((prev) => prev + 1);
        }
    }
    const getResults = async () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(async () => {
            try {
                if (query && query?.length) {
                    setsuggestionLoading(true);
                    var response = await axios.get(
                        `
                        https://api.themoviedb.org/3/search/multi?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&query=${query}&page=1&include_adult=false`
                    );
                    setresults(response.data);
                    setsuggestionLoading(false);
                } else {
                    setresults([]);
                }
            } catch (error) {
                console.log("error ", error);
            }
        }, 250);
    };

    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }
    function onhover(i) {
        // setcurrentSuggestion(i)
    }
    return (
        <nav className={styles.navbar} ref={navbarRef} id="navbar">
            <div className={styles.nav_left_part}>
                <Link href="/en" passHref>
                    <a>
                        <div className={styles.nav_header}>
                            <img src="/assets/apple-touch-icon.png" alt="" srcset="" />
                        </div>
                    </a>
                </Link>
                <ul className={styles.nav_list+' '+styles.nav_middle}>
                    <Link href="/en/movie">
                        <a>
                            <li
                                className={styles.nav_item+' '+styles.dropdown}
                                onMouseEnter={() => setmoviesDropdown(true)}
                                onMouseLeave={() => setmoviesDropdown(false)}
                            >
                                Movies
                                <span>
                                    <i
                                        className={
                                            moviesDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                        }
                                    ></i>
                                </span>
                                <ul className={styles.nav_list_child+' '+styles.first}>
                                    <Link href="/en/popular/movies">
                                        <li className={styles.nav_item_child+' '+ styles.first}>Most Popular</li>
                                    </Link>
                                    <Link href="/en/most-recent/movies">
                                        <li className={styles.nav_item_child}>Most Recent</li>
                                    </Link>
                                    <Link href="/en/top-rated/movies">
                                        <li className={styles.nav_item_child+' '+styles.last}>Top Rated</li>
                                    </Link>
                                </ul>
                            </li>
                        </a>
                    </Link>
                    <Link href="/en/tv">
                        <a>
                            <li
                                className={styles.nav_item}
                                onMouseEnter={() => settvshowsDropdown(true)}
                                onMouseLeave={() => settvshowsDropdown(false)}
                            >
                                TV Shows
                                <span>
                                    <i
                                        className={
                                            tvshowsDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                        }
                                    ></i>
                                </span>
                                <ul className={styles.nav_list_child+' '+styles.last}>
                                    <Link href="/en/popular/tv-shows">
                                        <li className={styles.nav_item_child+' '+styles.first}>Most Popular</li>
                                    </Link>
                                    <Link href="/en/most-recent/tv-shows">
                                        <li className={styles.nav_item_child}>Most Recent</li>
                                    </Link>
                                    <Link href="/en/top-rated/tv-shows">
                                        <li className={styles.nav_item_child+' '+styles.last}>Top Rated</li>
                                    </Link>
                                </ul>
                            </li>
                        </a>
                    </Link>
                    <Link href="/en/login">
                        <a>
                            <li className={styles.nav_item}>Genre</li>
                        </a>
                    </Link>
                </ul>
            </div>
            <ul className={styles.nav_list}>
                <div className={styles.search_container}>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            autoComplete="false"
                            autoCorrect="false"
                            spellCheck={false}
                            type="text"
                            name="q"
                            id="query"
                            value={query}
                            onFocus={() => setsearchContainerVisible(true)}
                            onKeyUp={getResults}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setquery(e.target.value)}
                            placeholder="What are you looking for?"
                        />
                    </form>

                    {suggestionLoading ? (
                        <li className={styles.nav_item+' '+styles.s+' '+styles.load}>
                            <i class="bi bi-arrow-repeat"></i>
                        </li>
                    ) : (
                        <li
                            className={
                                query && query.length ? styles.nav_item+' '+styles.clear+' '+styles.s+' '+styles.active : styles.nav_item+' '+styles.clear+' '+styles.s
                            }
                            onClick={clearSearch}
                        >
                            <i className="bi bi-x-lg"></i>
                        </li>
                    )}

                    <li className={styles.nav_item+' '+styles.search+' '+styles.s} onClick={handleSearchToggle}>
                        <i className="bi bi-search"></i>
                    </li>

                    <ul
                        className={
                            searchContainerVisible ? styles.s_results+' '+styles.active : styles.s_results
                        }
                    >
                        {results?.results
                            ?.slice(0, 4)
                            ?.map((item, i) =>
                                item.media_type === "movie" ? (
                                    <Movie
                                        index={i}
                                        onhover={onhover}
                                        key={item.id}
                                        active={currentSuggestion === i ? true : false}
                                        item={item}
                                    />
                                ) : item.media_type === "tv" ? (
                                    <Tv
                                        key={item.id}
                                        index={i}
                                        onhover={onhover}
                                        active={currentSuggestion === i ? true : false}
                                        item={item}
                                    />
                                ) : null
                            )}
                        {results?.results?.length > 4 ? (
                            <li className={styles.more_results}>
                                <span>See more results</span>
                                <Link href={"/en/search?q=" + query + "&page=1"}>
                                    <span>
                                        <i className="bi bi-arrow-right"></i>
                                    </span>
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
                <Link href="/en/login">
                    <a>
                        <li className={styles.nav_item}>Login</li>
                    </a>
                </Link>
                <Link href="/en/login">
                    <a>
                        <li className={styles.nav_item}>Sign Up</li>
                    </a>
                </Link>
            </ul>
        </nav>
    );
}

function Movie({ item, active, index, onhover }) {
    return (
        <Link
            href={
                "/en/movie/" +
                item.id +
                "/" +
                covertToLinkWords(item.title) +
                "-" +
                getYear(item.release_date)
            }
        >
            <a>
                <li
                    onMouseEnter={() => onhover(index)}
                    className={active ? styles.result+' '+styles.active:styles.result}
                >
                    <div className={styles.r_left}>
                        {item.poster_path ? (
                            <img
                                src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                                alt={item.title}
                                srcset=""
                            />
                        ) : (
                            <img
                                className={styles.no_image}
                                alt={item.title + "image not found"}
                                src="/assets/image-not-found.png"
                            />
                        )}
                    </div>
                    <div className={styles.r_right}>
                        <p className={styles.title}>{item.title}</p>
                        <p>{getDate(item.release_date)}</p>
                        {/* <p>{item?.genre_ids?.map((item1, i) => (
                            <span className="genre">{item1} </span>
                        ))}
                    </p> */}
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i style={{ fontSize: "0.8rem" }} className="fas fa-star"></i>
                            </span>
                            {item.vote_average}
                        </p>
                        <p className={styles.media_type}>Movie</p>
                    </div>
                </li>
            </a>
        </Link>
    );
}
function Tv({ item, active, index, onhover }) {
    return (
        <Link
            href={
                "/en/tv/" +
                item.id +
                "/" +
                covertToLinkWords(item.name) +
                "-" +
                getYear(item.first_air_date)
            }
        >
            <a>
                <li
                    onMouseEnter={() => onhover(index)}
                    className={active ? styles.result+' '+styles.active:styles.result}
                >
                    <div className={styles.r_left}>
                        {item.poster_path ? (
                            <img
                                src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                                alt={item.name}
                                srcset=""
                            />
                        ) : (
                            <img
                                className={styles.no_image}
                                alt={item.name + "image not found"}
                                src="/assets/image-not-found.png"
                            />
                        )}
                    </div>
                    <div className={styles.r_right}>
                        <p className={styles.title}>{item.name}</p>
                        <p>{getDate(item.first_air_date)}</p>
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i style={{ fontSize: "0.8rem" }} className="fas fa-star"></i>
                            </span>
                            {item.vote_average}
                        </p>
                        <p className={styles.media_type}>TV</p>
                    </div>
                </li>
            </a>
        </Link>
    );
}

export default Navbar;
