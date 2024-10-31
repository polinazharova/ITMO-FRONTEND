(() => {
    const loadStart = performance.now();

    window.addEventListener('load', () => {
        const loadEnd = performance.now();
        const footer = document.getElementsByClassName('footer__loading-info');
        footer[0].innerHTML = `LOAD TIME: ${(loadEnd - loadStart).toFixed(3)} ms`;

        const currentLocation = document.location.href;
        const menuLinks = document.querySelectorAll('.main-navigation__year-link');
        menuLinks.forEach(link => {
           if (link.href === currentLocation) {
               link.classList.add('main-navigation__year-link_active');
           }
       });
    });
})();