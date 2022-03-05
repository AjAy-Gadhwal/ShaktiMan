window.addEventListener('DOMContentLoaded', event => {
    
    setTimeout(() => { 
        const mainNav = document.body.querySelector('#mainNav');
        if (mainNav) {
            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                offset: 74,
            });
        };
    
        // document.getElementById('loader').style.display = "none";
    }, 1000);
});


