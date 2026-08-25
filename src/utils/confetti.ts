import confetti from 'canvas-confetti';

/**
 * Festive Onam Flower Petal & Gold Confetti Shower
 */
export const triggerOnamPetals = () => {
  // Flower petal colors (Marigold yellow, orange, jasmine white, rose red, lotus pink, emerald leaf green)
  const onamColors = ['#f59e0b', '#fbbf24', '#ea580c', '#e11d48', '#ec4899', '#ffffff', '#10b981'];

  confetti({
    particleCount: 50,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors: onamColors,
    shapes: ['circle'],
    scalar: 1.2,
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors: onamColors,
    shapes: ['circle'],
    scalar: 1.2,
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#f59e0b', '#fcd34d', '#f43f5e', '#ffffff'],
      ticks: 200,
    });
  }, 200);
};
