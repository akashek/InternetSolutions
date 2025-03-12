var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
    let header = document.querySelector(".header");
    if (header) {  
        header.style.height = window.innerHeight + "px";
    }
});

setTimeout(function() {
    $('#demo-modal').modal();
}, 3000);
