import { gsap } from "gsap";
import { getOrCreateUserId } from "../services/authenticationMiddleware";
import { getUserCoins, saveUserCoins } from "../datebaseApi/indexedDB";

const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "💎"];
const reelCount = 3; // Number of reels
const winPatterns = [["🍒", "🍒", "🍒"], ["⭐", "⭐", "⭐"], ["💎", "💎", "💎"]];

let userId: string;
let userCoins: number;

(async () => {
  // Perform async initialization here
  userId = getOrCreateUserId();
  userCoins = (await getUserCoins(userId)) || 0;

  const balanceElement = document.getElementById("balance")!;
  balanceElement.textContent = userCoins!.toString();

  const messageElement = document.getElementById("game-message");
  const resultModal = document.getElementById("result-modal");
  const resultTitle = document.getElementById("result-title");
  const resultDescription = document.getElementById("result-description");
  const closeModal = document.getElementById("close-modal");
  const addCoinsButton = document.querySelector<HTMLButtonElement>("#gather-coins-button");

  let isMoving: boolean = false;

  function updateBalance(change: number) {
    userCoins! += change;
    balanceElement!.textContent = userCoins!.toString();
    saveUserCoins(userId, userCoins!);
  }

  function spinReelsWithGSAP(): Promise<string[]> {
    isMoving = true;

    const reels = document.querySelectorAll<HTMLElement>(".reel");
    const result = Array.from({ length: reelCount }, () =>
      symbols[Math.floor(Math.random() * symbols.length)]
    );
 
    const animationPromises: Promise<void>[] = [];

    reels.forEach((reel, i) => {
      const duration = 1 + i * 0.5; // Incremental spin duration
      const animationPromise = new Promise<void>((resolve) => {
        gsap.to(reel, {
          y: -300,
          repeat: 2,
          duration,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(reel, { y: 0 });
            reel.textContent = result[i];
            resolve();
          },
        });
      });

      animationPromises.push(animationPromise);
    });

    return Promise.all(animationPromises).then(() => result);
  }

  function checkWin(result: string[]): boolean {
    return winPatterns.some((pattern) =>
      pattern.every((symbol, index) => result[index] === symbol)
    );
  }

  document.getElementById("spin-button")?.addEventListener("click", async () => {
    if (userCoins! <= 0) {
      messageElement!.textContent = "You are out of coins!";
      return;
    }

    if (isMoving) return;

    updateBalance(-10); // Deduct 10 coins per spin
    messageElement!.textContent = "Spinning...";

    // Spin reels and wait for result
    const result = await spinReelsWithGSAP();

    // Check result and show appropriate modal
    if (checkWin(result)) {
      updateBalance(50); // Reward for winning
      showModal("You Win!", "Congratulations! You won 50 coins!");
    } else {
      showModal("You Lose", "Better luck next time!");
    }
  });

  function showModal(title: string, description: string) {
    messageElement!.textContent = "Press the Spin button to try your luck!";
    isMoving = false;

    resultTitle!.textContent = title;
    resultDescription!.textContent = description;

    resultModal!.classList.remove("hidden");
    // Ensure modal has the correct style (e.g., centered and on top)
    resultModal!.classList.add("flex");
    gsap.to(resultModal, { opacity: 1, duration: 0.5 }); // Smooth fade-in
  }

  closeModal?.addEventListener("click", () => {
    resultModal!.classList.add("hidden");
    gsap.to(resultModal, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        resultModal!.classList.add("hidden");
        resultModal!.classList.remove("flex");
      },
    });
  });

  addCoinsButton?.addEventListener("click", () => {
    let dialog = window.confirm("Do you want to add coins in your budget?");

    if (!dialog) return;

    updateBalance(50);
  });
})();
