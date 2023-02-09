import { z } from "zod";
import { zodPortfolioItem } from "./zod";

export type PortfolioItem = z.infer<typeof zodPortfolioItem>;