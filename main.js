import { TSV } from "https://js.sabae.cc/TSV.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const txt = await Deno.readTextFile("dataset_202107_t_internet.tsv");
const data = TSV.parse(txt);
for (let i = 0; i < 10; i++) {
  console.log(data[i])
}
const data2 = data.map(d => {
  return {
    pid: d.URL.substring(d.URL.lastIndexOf("/") + 1),
    title: d.タイトル,
  }
});
//await Deno.writeTextFile("ndlgojp_list.csv", CSV.stringify(data2));
await Deno.writeTextFile("ndlgojp_list.tsv", TSV.stringify(data2));
