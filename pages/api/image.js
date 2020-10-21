import { parse } from "url";

export default async (req, res) => {
    const {
        query: { url },
    } = parse(req.url || "", true);
    const r = await fetch(
        // we get images from notion, but you could get them from AWS etc.
        `${process.env.NEXT_PUBLIC_BACKEND}${url}`,
        {
            headers: {
                // maybe an auth header
            },
        }
    );
    res.setHeader("content-type", r.headers.get("content-type"));
    res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
    r.body.pipe(res);
};