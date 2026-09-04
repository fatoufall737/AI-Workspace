// ==========================================================
// AI Workspace
// Partie 3 : Résumé de texte
// Partie 4 : Traduction
// Partie 5 : Chat IA
// Navigation entre les modules
// ==========================================================


// ==========================================================
// Récupération des éléments de la page
// ==========================================================

const mainContent = document.getElementById("main-content");

const menuLinks = document.querySelectorAll(".sidebar__link");

// On garde le contenu du tableau de bord
// pour pouvoir le réafficher après avoir ouvert un autre module.
const dashboardContent = mainContent.innerHTML;


// ==========================================================
// Fonction pour afficher le tableau de bord
// ==========================================================

function afficherDashboard() {

    mainContent.innerHTML = dashboardContent;
}


// ==========================================================
// Partie 3 - Module de résumé de texte
// ==========================================================

function afficherResume() {

    mainContent.innerHTML = `
        <h2>Résumé de texte</h2>

        <p>
            Entrez un texte puis cliquez sur le bouton "Résumer".
        </p>

        <textarea
            id="texte-a-resumer"
            rows="10"
            placeholder="Entrez votre texte ici..."
        ></textarea>

        <br><br>

        <button id="bouton-resumer">
            Résumer
        </button>

        <div id="resultat-resume"></div>
    `;

    const boutonResumer = document.getElementById("bouton-resumer");

    boutonResumer.addEventListener("click", function () {

        const texte = document.getElementById("texte-a-resumer").value;
        const resultat = document.getElementById("resultat-resume");

        if (texte.trim() === "") {

            resultat.innerHTML = `
                <p>
                    Veuillez entrer un texte à résumer.
                </p>
            `;

            return;
        }

        resultat.innerHTML = `
            <h3>Résumé</h3>

            <p>
                Ceci est un résumé simulé du texte saisi.
                Dans une version complète, une API d'intelligence
                artificielle pourra être utilisée.
            </p>
        `;
    });
}


// ==========================================================
// Partie 4 - Module de traduction
// ==========================================================

function afficherTraduction() {

    mainContent.innerHTML = `
        <h2>Traduction</h2>

        <p>
            Entrez un texte, choisissez une langue puis cliquez
            sur le bouton "Traduire".
        </p>

        <textarea
            id="texte-a-traduire"
            rows="10"
            placeholder="Entrez votre texte ici..."
        ></textarea>

        <br><br>

        <label for="langue-cible">
            Langue cible :
        </label>

        <select id="langue-cible">

            <option value="en">
                Anglais
            </option>

            <option value="fr">
                Français
            </option>

            <option value="es">
                Espagnol
            </option>

        </select>

        <br><br>

        <button id="bouton-traduire">
            Traduire
        </button>

        <div id="resultat-traduction"></div>
    `;

    const boutonTraduire =
        document.getElementById("bouton-traduire");

    boutonTraduire.addEventListener("click", async function () {

        const texte =
            document.getElementById("texte-a-traduire").value;

        const langue =
            document.getElementById("langue-cible").value;

        const resultat =
            document.getElementById("resultat-traduction");


        if (texte.trim() === "") {

            resultat.innerHTML = `
                <p>
                    Veuillez entrer un texte à traduire.
                </p>
            `;

            return;
        }


        resultat.innerHTML = `
            <p>
                Traduction en cours...
            </p>
        `;


        try {

            const response = await fetch(
                "http://127.0.0.1:5000/translate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        q: texte,
                        source: "auto",
                        target: langue,
                        format: "text"
                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Erreur lors de la traduction."
                );
            }


            const data = await response.json();


            resultat.innerHTML = `
                <h3>Traduction</h3>

                <p>
                    ${data.translatedText}
                </p>
            `;

        } catch (error) {

            resultat.innerHTML = `
                <p>
                    Impossible de contacter le service de traduction.
                    Vérifiez que LibreTranslate est bien démarré.
                </p>
            `;
        }
    });
}


// ==========================================================
// Partie 5 - Module Chat IA
// ==========================================================

function afficherChat() {

    mainContent.innerHTML = `
        <h2>Chat IA</h2>

        <p>
            Posez une question au Chat IA.
        </p>

        <textarea
            id="message-chat"
            rows="6"
            placeholder="Écrivez votre message ici..."
        ></textarea>

        <br><br>

        <button id="bouton-chat">
            Envoyer
        </button>

        <div id="reponse-chat"></div>
    `;


    const boutonChat =
        document.getElementById("bouton-chat");


    boutonChat.addEventListener("click", function () {

        const message =
            document.getElementById("message-chat").value;

        const reponse =
            document.getElementById("reponse-chat");


        if (message.trim() === "") {

            reponse.innerHTML = `
                <p>
                    Veuillez écrire un message.
                </p>
            `;

            return;
        }


        reponse.innerHTML = `
            <h3>Réponse du Chat IA</h3>

            <p>
                Bonjour ! Ceci est une réponse simulée du Chat IA.
                Dans une version complète, une API d'intelligence
                artificielle pourra être utilisée.
            </p>
        `;
    });
}


// ==========================================================
// Gestion de la navigation
// ==========================================================

menuLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        // Retire la classe active de tous les liens
        menuLinks.forEach(function (item) {

            item.classList.remove("active");

        });


        // Ajoute la classe active au lien sélectionné
        link.classList.add("active");


        // Récupère le module demandé
        const module =
            link.getAttribute("data-module");


        // Affichage du tableau de bord
        if (module === "dashboard") {

            afficherDashboard();
        }


        // Affichage du chat
        if (module === "chat") {

            afficherChat();
        }


        // Affichage du résumé
        if (module === "resume") {

            afficherResume();
        }


        // Affichage de la traduction
        if (module === "traduction") {

            afficherTraduction();
        }

    });

});