import { useState } from "react";
import axios from "axios";
import styles from "../scss/components/torrent.module.scss";

const dropValues = [
    { name: "Yts", value: "Yts", type: "Movies" },
    { name: "Pirate Bay", value: "ThePirateBay", type: "All" },
    {name:'1337x',value:"1337x",type:"All"}
];
function TorrentSearch({ }) {
    const [query, setquery] = useState("");
    const [torrents, settorrents] = useState([]);
    const [loading, setloading] = useState(false);
    const [searchType, setsearchType] = useState({
        name: "Yts",
        value: "Yts",
        type: "Movies",
    });
    const [dropdownActive, setdropdownActive] = useState(false);
    const getTorrents = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const { data } = await axios.post("/api/v2/torrent", {
                query,
                providers: [searchType.value],
                type: searchType.type,
            });
            settorrents(data.results);
            setloading(false);
        } catch (error) {
            console.log("error occured ", error);
        }
    };

    const setDropValue = (value) => {
        setsearchType(value);
        setdropdownActive(false);
    };
    return (
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
                <div className={styles.dropdown_container}>
                    <div
                        className={styles.selected_value}
                        onClick={() => setdropdownActive((prev) => !prev)}
                    >
                        <p>{searchType.name}</p>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                    <div
                        className={
                            dropdownActive
                                ? styles.option_container + " " + styles.active
                                : styles.option_container
                        }
                    >
                        {dropValues.map((item, i) => (
                            <div className={styles.option} onClick={() => setDropValue(item)}>
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
                {torrents.length?    
                <div className={styles.result_container}>
                        <table>
                            <tr>
                                <th>Provider</th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Seeders</th>
                                <th>Peers</th>
                                <th>Magnet</th>
                            </tr>
                            {torrents?.map((item, i) => (
                                <tr className={styles.torrent_box}>
                                    <td>
                                        <p>{item.provider}</p>
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
                        </table>
                    </div>
                :null
                }
                </>
            )}
        </div>
    );
}

export default TorrentSearch;
