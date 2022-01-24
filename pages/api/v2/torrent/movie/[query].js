import TorrentSearchApi from "torrent-search-api";

const providers = ["Yts"];

const providers2 = [
    "Yts",
    "1337x",
    "Eztv",
    "KickassTorrents",
    "Limetorrents",
    "Rarbg",
    "ThePirateBay",
    "TorrentProject",
    "Torrentz2",
];

export default async function handler(req, res) {
    try {
        TorrentSearchApi.enablePublicProviders();
        let result = await TorrentSearchApi.search(
            providers2,
            req.query.query,
            "Movies",
        );
        res.send({
            results: result,
            total_results: result.length,
            url: "https://yify-movies.tv/download/",
        });
    } catch (error) {
        console.log(error);
        res.send({ message: "An error occurred",query:req.query.query, error: error.message });
    }
}
