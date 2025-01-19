import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { Location } from "./types";

function initExpress(
  port: number,
  options: { apiKey: string; data: string[][] }
) {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "../public"));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const locations: Location[] = [];

  options.data.forEach((item) => {
    const location: Location = {
      id: item[0],
      name: item[1],
      description: item[2],
      address: item[3],
      latitude: item[4],
      longtitude: item[5],
      telephoneNumber: item[6],
    };

    locations.push(location);
  });

  app.get("/", (req: Request, res: Response) => {
    res.render("index", { locations });
  });

  app.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params["id"], 10);
    const location = locations[id];

    res.render("map", {
      apiKey: options.apiKey,
      targetLocation: location,
    });
  });

  app.listen(port, () => {
    console.log("Listening on port %s", port);
  });
}

export { initExpress };
