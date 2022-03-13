import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../scss/components/torrent.module.scss";
import Head from "next/head";

const dropValues = [
    { name: "Yts", value: "Yts", type: "Movies" },
    { name: "Pirate Bay", value: "ThePirateBay", type: "All" },
    {name:'Rarbg',value:"Rarbg",type:"All"}
];
function TorrentSearch({base_url }) {
    const router = useRouter();
    const [query, setquery] = useState("");
    const [torrents, settorrents] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false)
    const [searchType, setsearchType] = useState({
        name: "Yts",
        value: "Yts",
        type: "Movies",
    });
    const [dropdownActive, setdropdownActive] = useState(false);
    let overview =
    "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";


    useEffect(() => {
        window.addEventListener("click",(e)=>{
            if (e.target.id!=="dropdown" && dropdownActive) {
                setdropdownActive(false)
            }
        })    
    
      return () => {
      }
    }, [dropdownActive])
    

    const getTorrents = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            seterror(false)
            const { data } = await axios.post("/api/v2/torrent", {
                query,
                providers: [searchType.value],
                type: searchType.type,
            });
            settorrents(data.results);
            setloading(false);
        } catch (error) {
            seterror(true)
            settorrents(error.message.data);
            setloading(false);
        }
    };

    const setDropValue = (value) => {
        setsearchType(value);
        setdropdownActive(false);
    };
    return (
        <>
            <Head>
                <title>Torrent Search - ZFlix</title>
                <meta name="title" content={"Torrent Search - ZFlix"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"Torrent Search - ZFlix"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/favicon.ico" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"Torrent Search - ZFlix"}
                />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/favicon.ico"></meta>
            </Head>
            <div className={styles.w_container}>
                <div className={styles.search_input_container}>
                    <form onSubmit={getTorrents}>
                        <input
                            className={styles.search_input}
                            type="text"
                            name="query"
                            placeholder="Search for torrents (movie, tv show, game etc.,)"
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                        />
                    </form>
                    <div className={styles.dropdown_container} id="dropdown">
                        <div
                            className={styles.selected_value}
                            onClick={() => setdropdownActive((prev) => !prev)}
                            id="dropdown"
                        >
                            <p id="dropdown">{searchType.name}</p>
                            <i id="dropdown" className="bi bi-caret-down-fill"></i>
                        </div>
                        <div
                            className={
                                dropdownActive
                                    ? styles.option_container + " " + styles.active
                                    : styles.option_container
                            }
                        >
                            {dropValues.map((item, i) => (
                                <div key={i} className={styles.option} onClick={() => setDropValue(item)}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div
                        style={{
                            margin: "20px auto",
                            width: "max-content",
                        }}
                    >
                        Loading
                    </div>
                ) : (<>
                    {!error && torrents?.length?    
                        <div className={styles.result_container}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Seed</th>
                                        <th>Leech</th>
                                        <th>Magnet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {torrents?.map((item, i) => (
                                        <tr key={i} className={styles.torrent_box}>
                                            <td>
                                                <p>{i+1}</p>
                                            </td>
                                            <td className={styles.torrent_box_r_1}>
                                                <p>{item.title}</p>
                                            </td>
                                            <td className={styles.torrent_box_r_2}>
                                                <p>{item.size}</p>
                                            </td>
                                            <td>
                                                <p>{item.seeds}</p>
                                            </td>
                                            <td>
                                                <p>{item.peers}</p>
                                            </td>
                                            <td>
                                                <a href={item.magnet}>
                                                    <p>link</p>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    :
                        <>
                        {error?
                            <div style={{
                                margin: "40px auto",
                                width: "max-content",
                            }}>
                                <h3>Could not find torrents</h3>
                            </div>
                            :null
                        }                    
                        </>
                    }
                    </>
                )}
            </div>
        </>
    );
}

export default TorrentSearch;
