export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] - Tout le monde peut y accéder
["disconnected"] - Seulement les utilisateurs non connectés
["client"] - Seulement les clients
["admin"] - Seulement les administrateurs
["admin","client"] - Les administrateurs OU les clients

*/