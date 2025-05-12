import { postStatsQuery } from "./raw_queries/queries.js";

async function trial() {
  console.log(postStatsQuery(1))  
}

trial();
