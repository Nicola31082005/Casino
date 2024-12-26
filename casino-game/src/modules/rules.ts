import { gsap } from "gsap";

window.onload = () => {
    // Animate the header sliding in from the left
    gsap.from("#rules-header", {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
    });

    // Stagger fade-in for each rule with a bounce effect
    gsap.from("#rules-list li", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: "bounce.out",
    });

    // Subtle hover effect for rules list
    document.querySelectorAll("#rules-list li").forEach((item) => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                scale: 1.1,
                duration: 0.3,
                ease: "power1.out",
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power1.out",
            });
        });
    });

    // Add a glowing effect on the Back to Home button
    gsap.from("button", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
    });
};
