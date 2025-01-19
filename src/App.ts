import { initExpress } from "@/Server";
import { getFromDataset, getDataStack } from "@/libs/Serializer";

const { PORT, GOOGLE_MAP_API_KEY } = process.env;
if (!GOOGLE_MAP_API_KEY) {
  throw new Error("Cannot start application without API KEY");
}

if (!PORT) {
  throw new Error("Cannot start application without PORT!");
}

const port = parseInt(PORT, 10);
const opts = getFromDataset("./public/data.csv");

initExpress(port, {
  apiKey: GOOGLE_MAP_API_KEY,
  data: getDataStack(opts),
});
