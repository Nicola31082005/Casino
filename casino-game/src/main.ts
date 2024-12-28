
import { getUserCoins, openDatabase, saveUserCoins } from "./datebaseApi/indexedDB";
import { getOrCreateUserId } from "./services/authenticationMiddleware";


const db = await openDatabase("casinoGameDB", 1);

const userId = getOrCreateUserId()
saveUserCoins(userId, 10)
const userCoins = await getUserCoins(userId)
console.log(userCoins);

