(() => {
  const status = document.getElementById('status');
  const open = document.getElementById('open');
  const targets = new URLSearchParams(window.location.search).getAll('url');
  let target;
  try {
    // URLSearchParams decodes the outer query once. Preserve the inner URL's encoding.
    const raw = targets[0];
    if (targets.length !== 1 || !/^protovibe:\/\//i.test(raw) || /[\s\u0000-\u001f\u007f]/.test(raw)) throw new Error();
    target = new URL(raw);
    if (target.protocol !== 'protovibe:' || target.username || target.password || target.port) throw new Error();
  } catch {
    status.textContent = 'This link is missing or invalid. Ask for a new Protovibe link.';
    return;
  }

  open.href = target.href;
  open.hidden = false;
  status.textContent = 'If Protovibe does not open automatically, click below and allow your browser to open the app.';
  try {
    window.location.replace(target.href);
  } catch {
    // The visible link gives browsers that require a user gesture another attempt.
  }
})();
