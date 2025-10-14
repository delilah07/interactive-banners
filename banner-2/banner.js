// Create Pixi application
const app = new PIXI.Application({
  width: 300,
  height: 250,
  backgroundColor: 0x000000,
  antialias: true,
});
document.getElementById('banner').appendChild(app.view);

// Background layers for parallax
const bgFar = PIXI.Sprite.from('./ivana-cajina-asuyh-_ZX54-unsplash.jpg');
bgFar.width = 320;
bgFar.height = 260;
bgFar.x = -10;
bgFar.y = -5;
app.stage.addChild(bgFar);

const bgMid = PIXI.Sprite.from('./planet.png');
bgMid.anchor.set(0.5);
bgMid.x = 150;
bgMid.y = 125;
bgMid.scale.set(0.2);
app.stage.addChild(bgMid);

// Product (phone)
const phone = PIXI.Sprite.from('./phone1.webp');
phone.anchor.set(0.5);
phone.x = 150;
phone.y = 140;
phone.scale.set(0.05);
app.stage.addChild(phone);

// Title text
const title = new PIXI.Text('NEXT-GEN DEVICE', {
  fontFamily: 'Arial',
  fontSize: 20,
  fill: 0xffffff,
  fontWeight: 'bold',
  align: 'center',
});
title.anchor.set(0.5);
title.x = 150;
title.y = 40;
title.alpha = 0;
app.stage.addChild(title);

// CTA button
const cta = new PIXI.Graphics();
cta.beginFill(0xffffff);
cta.drawRoundedRect(0, 0, 120, 35, 6);
cta.endFill();
cta.x = 90;
cta.y = 190;
cta.alpha = 0;

const ctaText = new PIXI.Text('LEARN MORE', {
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

// Intro animation
gsap.timeline()
  .from(phone.scale, { x: 0.6, y: 0.6, duration: 1.5, ease: 'power2.out' })
  .to(title, { alpha: 1, duration: 0.8 }, '-=0.5')
  .to(cta, { alpha: 1, duration: 0.8 }, '-=0.4');

// Parallax mouse movement
app.view.addEventListener('mousemove', (e) => {
  const rect = app.view.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const cx = mx / 300 - 0.5;
  const cy = my / 250 - 0.5;

  // Background moves slower
  bgFar.x = -10 + cx * 10;
  bgFar.y = -5 + cy * 10;
  bgMid.x = 150 + cx * 15;
  bgMid.y = 125 + cy * 10;

  // Product moves more
  gsap.to(phone, {
    x: 150 + cx * 25,
    y: 140 + cy * 15,
    rotation: cx * 0.2,
    duration: 0.4,
    ease: 'power2.out'
  });
});

// Hover effect on CTA
cta.interactive = true;
cta.buttonMode = true;
cta.on('pointerover', () => {
  gsap.to(cta, { scale: 1.1, duration: 0.3 });
});
cta.on('pointerout', () => {
  gsap.to(cta, { scale: 1, duration: 0.3 });
});

// Click through
app.view.addEventListener('click', () => {
  window.open('https://example.com', '_blank');
});