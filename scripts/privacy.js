window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "elements": {
            "dismiss": '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss btn btn-success">{{dismiss}}</a>'
        },
        "palette": {
            "popup": {
                "background": "#6b6e70",
                "text": "#ffffff"
            },
            "button": {
                "background": "#e9ecef",
                "text": "#272B30"
            }
        },
        "theme": "classic",
        "content": {
            "message": "This website uses cookies to ensure you get the best experience possible.",
            "dismiss": "Got It!",
            "link": "Learn more",
            "href": "/privacy"
        }
    })
});