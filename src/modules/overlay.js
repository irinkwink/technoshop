const overlay = document.createElement('div');
overlay.className = 'overlay';

overlay.style.cssText = `
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 333;
`;

export const showOverlay = () => {
  document.body.append(overlay);

  return overlay;
}

export const hideOverlay = () => {
  overlay.remove();
}
