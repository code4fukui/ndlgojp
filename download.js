import { TSV } from "https://js.sabae.cc/TSV.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const url = "https://dl.ndl.go.jp/static/files/dataset/dataset_202305_r_internet.zip";

const bin = await fetchBin(url);
const zips = unzip(bin);
for (const fn of zips.getFilenames()) {
    console.log(fn);
  if (fn.endsWith(".tsv")) {
    const txt = new TextDecoder().decode(zips.decompress(fn));
    const n = fn.lastIndexOf(".");
    const fn2 = fn.substring(0, n + 1) + "csv";
    await Deno.writeTextFile(fn2, CSV.encode(TSV.decode(txt)));
  } else {
    await Deno.writeFile(fn, zips.decompress(fn));
  }
}
