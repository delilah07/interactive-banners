// Create Pixi application
const app = new PIXI.Application({
  width: 300,
  height: 250,
  backgroundColor: 0x000000,
  antialias: true,
});
document.getElementById('banner').appendChild(app.view);

// Add background image
const bg = PIXI.Sprite.from('./ivana-cajina-asuyh-_ZX54-unsplash.jpg');
bg.width = 300;
bg.height = 250;
app.stage.addChild(bg);

// Add particle stars
const stars = new PIXI.Container();
app.stage.addChild(stars);

for (let i = 0; i < 50; i++) {
  const star = PIXI.Sprite.from('./icons8-star-48.png');
  star.x = Math.random() * 300;
  star.y = Math.random() * 250;
  star.alpha = Math.random();
  star.scale.set(0.1 + Math.random() * 0.2);
  stars.addChild(star);
}

app.ticker.add(() => {
  stars.children.forEach(star => {
    star.y -= 0.2;
    if (star.y < 0) star.y = 250;
  });
});

// Add title text
const title = new PIXI.Text('DISCOVER THE GALAXY', {
  fontFamily: 'Arial',
  fontSize: 20,
  fill: 0xffffff,
  fontWeight: 'bold',
  align: 'center'
});
title.anchor.set(0.5);
title.x = 150;
title.y = 120;
title.alpha = 0;
app.stage.addChild(title);

// Add CTA button
const cta = new PIXI.Graphics();
cta.beginFill(0xffffff);
cta.drawRoundedRect(0, 0, 120, 35, 6);
cta.endFill();
cta.x = 90;
cta.y = 180;
cta.alpha = 0;

const ctaText = new PIXI.Text('EXPLORE NOW', {
  fontFamily: 'Arial',
  fontSize: 14,
  fill: 0x000000,
  fontWeight: 'bold'
});
ctaText.anchor.set(0.5);
ctaText.x = 60;
ctaText.y = 18;
cta.addChild(ctaText);
app.stage.addChild(cta);

// Animation sequence
gsap.timeline({ delay: 0.5 })
  .to(title, { alpha: 1, y: 110, duration: 1, ease: 'power2.out' }, '-=2')
  .to(cta, { alpha: 1, duration: 0.8, ease: 'power2.out' }, '-=1');

// Hover animation
cta.interactive = true;
cta.buttonMode = true;
cta.on('pointerover', () => {
  gsap.to(cta, { scale: 1.1, duration: 0.3, ease: 'power1.out' });
});
cta.on('pointerout', () => {
  gsap.to(cta, { scale: 1, duration: 0.3, ease: 'power1.out' });
});

// Click-through
app.view.addEventListener('click', () => {
  window.open('https://example.com', '_blank');
});