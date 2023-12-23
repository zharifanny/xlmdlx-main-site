document.addEventListener('DOMContentLoaded', function() {
  let cachedVersions = {}; // Cache to store loaded versions

  function loadVersion(url) {
    if (cachedVersions[url]) {
      document.getElementById('content').innerHTML = cachedVersions[url];
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          document.getElementById('content').innerHTML = xhr.responseText;
          cachedVersions[url] = xhr.responseText; // Cache the loaded version
        } else {
          console.error('Error loading the version.');
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  function handleResize() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Load version based on device width
    if (width <= 600) {
      loadVersion('v2.html');
    } else {
      loadVersion('v1.html');
    }
  }

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250); // Debounce resize events
  });

  // Initial load
  handleResize();
});
