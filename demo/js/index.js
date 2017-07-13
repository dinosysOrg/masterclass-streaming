let medias = Array.prototype.slice.apply(document.querySelectorAll('video'));
medias.forEach(function(media) {
  media.addEventListener('loadeddata', function(event) {
    t = parseInt(getCookie('currentTime'));
    medias.forEach(function(media) {
      if (t) {
        media.currentTime = t;
      }
      media.play();
    });
  });
  media.addEventListener('play', function(event) {
    medias.forEach(function(media) {
      media.play();
    });
  });
  media.addEventListener('pause', function(event) {
    setCookie('currentTime', media.currentTime, 5);
    medias.forEach(function(media) {
      media.pause();
    });
  });
  media.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);
});

/**
 * Add three variable.
 * @param {string} cname The variable name.
 * @param {number} cvalue The variable value.
 * @param {number} exdays Time that variable will be expired.
 * Save time to cookie
 */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = 'expires='+d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * @param {string} cname The variable name.
 * @return {string} The value of vairable name that is saved in cookie
 */
function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
