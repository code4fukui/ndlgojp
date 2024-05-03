import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

// https://ndlsearch.ndl.go.jp/books/R100000039-I1313607
const url = "https://dl.ndl.go.jp/contents/1313607/704f12ff-f8fc-4fec-8002-58b60d0d5355/b6c669bd-91c9-4ea5-95cc-1cfeec2c4344/b6c669bd-91c9-4ea5-95cc-1cfeec2c4344_hls.m3u8";
const baseurl = url.substring(0, url.lastIndexOf("/") + 1);
const path = "audio/" + url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
const fn = url.substring(url.lastIndexOf("/") + 1);

const txt = await fetchOrLoad(url);
await Deno.writeTextFile(path + "/" + fn, txt);
const ss = txt.split("\n");
const key = await fetchBin(baseurl + "encrypt.key");
await Deno.writeFile(path + "/encrypt.key", key);
await Deno.mkdir(path, { recursive: true });
for (const s of ss) {
  if (s.length == 0 || s.startsWith("#")) continue;
  console.log(s);
  const bin = await fetchBin(baseurl + s);
  await Deno.writeFile(path + "/" + s, bin);
}
