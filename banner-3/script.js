const app = new PIXI.Application({
  width: 300,
  height: 250,
  backgroundColor: 0x000000,
  antialias: true,
});
document.getElementById('banner').appendChild(app.view);

// Background
const bg = PIXI.Sprite.from('./ivana-cajina-asuyh-_ZX54-unsplash.jpg');
bg.width = 300;
bg.height = 250;
app.stage.addChild(bg);

// Player (spaceship)
const ship = PIXI.Sprite.from('./spaceship.png');
ship.anchor.set(0.5);
ship.x = 150;
ship.y = 200;
ship.scale.set(0.5);
app.stage.addChild(ship);

// Score text
let score = 0;
const scoreText = new PIXI.Text('Score: 0', {
  fontFamily: 'Arial',
  fontSize: 14,
  fill: 0xffffff,
});
scoreText.x = 10;
scoreText.y = 10;
app.stage.addChild(scoreText);

// Stars container
const stars = new PIXI.Container();
app.stage.addChild(stars);

function createStar() {
  const star = PIXI.Sprite.from('./icons8-star-48.png');
  star.anchor.set(0.5);
  star.x = Math.random() * 300;
  star.y = -10;
  star.scale.set(0.3 + Math.random() * 0.2);
  star.speed = 2 + Math.random() * 2;
  stars.addChild(star);
}

let spawnInterval = setInterval(createStar, 500);

// Player movement
app.view.addEventListener('mousemove', (e) => {
  const rect = app.view.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  ship.x = mx;
});

// Game loop
app.ticker.add(() => {
  for (let i = stars.children.length - 1; i >= 0; i--) {
    const star = stars.children[i];
    star.y += star.speed;

    // Collision detection
    const dx = ship.x - star.x;
    const dy = ship.y - star.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 25) {
      stars.removeChild(star);
      score++;
      scoreText.text = 'Score: ' + score;
    }

    // Remove stars off screen
    if (star.y > 260) stars.removeChild(star);
  }
});

// End game after 10s
setTimeout(() => {
  clearInterval(spawnInterval);
  showCTA();
}, 10000);

// CTA button
function showCTA() {
  const overlay = new PIXI.Graphics();
  overlay.beginFill(0x000000, 0.7);
  overlay.drawRect(0, 0, 300, 250);
  overlay.endFill();
  app.stage.addChild(overlay);

  const finalText = new PIXI.Text(`Final Score: ${score}`, {
    fontFamily: 'Arial',
    fontSize: 18,
    fill: 0xffffff,
    fontWeight: 'bold',
  });
  finalText.anchor.set(0.5);
  finalText.x = 150;
  finalText.y = 100;
  app.stage.addChild(finalText);

  const cta = new PIXI.Graphics();
  cta.beginFill(0xffffff);
  cta.drawRoundedRect(0, 0, 140, 40, 8);
  cta.endFill();
  cta.x = 80;
  cta.y = 160;
  cta.interactive = true;
  cta.buttonMode = true;

  const ctaText = new PIXI.Text('PLAY AGAIN', {
    fontFamily: 'Arial',
    fontSize: 14,
    fill: 0x000000,
    fontWeight: 'bold',
  });
  ctaText.anchor.set(0.5);
  ctaText.x = 70;
  ctaText.y = 20;
  cta.addChild(ctaText);
  app.stage.addChild(cta);

  gsap.from(cta, { scale: 0, duration: 0.5, ease: 'back.out(1.7)' });

  cta.on('pointerover', () => gsap.to(cta, { scale: 1.1, duration: 0.3 }));
  cta.on('pointerout', () => gsap.to(cta, { scale: 1, duration: 0.3 }));

  cta.on('pointertap', () => {
    window.open('https://example.com', '_blank');
  });
}