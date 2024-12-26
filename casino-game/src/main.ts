import { gsap } from "gsap";

import { openDatabase, saveUserCoins } from "./datebaseApi/indexedDB";
// import { getOrCreateUserId } from "./services/authenticationMiddleware";


const db = await openDatabase("casinoGameDB", 1);

// const userId = getOrCreateUserId()
// saveUserCoins(userId, 10)

