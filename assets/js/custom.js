// https://io-oi.me/cool-alien-art

const root = document.documentElement;
const canvas = document.createElement('canvas');

function draw() {
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const ctx = canvas.getContext('2d');

  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      if (((x - 128) * 64) % (y - 128)) {
        ctx.fillStyle =
          y < 128
            ? `hsla(${y}, 100%, 50%, ${y / 256 / 2})`
            : `hsla(${y}, 100%, 50%, ${(256 - y) / 256 / 2})`;
        ctx.fillRect(
          x * 4 * (width / 1024),
          y * 4 * (height / 1024),
          4 * (width / 1024),
          4 * (height / 1024)
        );
      }
    }
  }

  root.style.setProperty('--bg-url', `url(${canvas.toDataURL()})`);
}

const pathname = window.location.pathname;
const hasBackgroundPaths = ['/', '/about/', '/en/', '/en/about/'];
const isBlurPaths = ['/about/', '/en/about/'];
const isColdplay = pathname.slice(0, 10) === '/coldplay/';

if (hasBackgroundPaths.includes(pathname) || isColdplay) {
  root.classList.add('has-bg');

  if (isBlurPaths.includes(pathname) || isColdplay) {
    root.classList.add('is-blur');
  }

  window.addEventListener('DOMContentLoaded', () => {
    draw();
  });

  window.addEventListener('resize', () => {
    draw();
  });
}
