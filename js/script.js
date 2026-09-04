// ==========================================================
// AI Workspace
// Partie 3 : Résumé de texte
// Partie 4 : Traduction
// ==========================================================


// ==========================================================
// Récupération des éléments de la page
// ==========================================================

// Zone principale de l'application
const mainContent = document.getElementById("main-content");

// Récupération des liens du menu
const menuLinks = document.querySelectorAll(".sidebar__link");


// ==========================================================
// Partie 3 - Module de résumé de texte
// ==========================================================

// Fonction qui affiche le module de résumé
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

    // Récupération du bouton Résumer
    const boutonResumer = document.getElementById("bouton-resumer");

    // Action lors du clic sur le bouton
    boutonResumer.addEventListener("click", function () {

        // Récupération du texte saisi
        const texte = document.getElementById("texte-a-resumer").value;

        // Zone où le résultat sera affiché
        const resultat = document.getElementById("resultat-resume");

        // Vérification si le champ est vide
        if (texte.trim() === "") {

            resultat.innerHTML = `
                <p>
                    Veuillez entrer un texte à résumer.
                </p>
            `;

            return;
        }

        // Résumé simulé de la Partie 3
        resultat.innerHTML = `
            <h3>Résumé</h3>

            <p>
                Ceci est un résumé simulé du texte saisi.
                Dans une version complète, une API d'intelligence
                artificielle pourrait être utilisée pour générer
                automatiquement le résumé.
            </p>
        `;
    });
}


// ==========================================================
// Partie 4 - Module de traduction
// ==========================================================

// Fonction qui affiche le module de traduction
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

            <option value="en">Anglais</option>

            <option value="fr">Français</option>

            <option value="es">Espagnol</option>

        </select>

        <br><br>

        <button id="bouton-traduire">
            Traduire
        </button>

        <div id="resultat-traduction"></div>
    `;

    // Récupération du bouton Traduire
    const boutonTraduire = document.getElementById("bouton-traduire");

    // Action lors du clic sur le bouton
    boutonTraduire.addEventListener("click", async function () {

        // Récupération du texte saisi
        const texte = document.getElementById("texte-a-traduire").value;

        // Récupération de la langue choisie
        const langue = document.getElementById("langue-cible").value;

        // Zone où le résultat sera affiché
        const resultat = document.getElementById("resultat-traduction");

        // Vérification si le champ est vide
        if (texte.trim() === "") {

            resultat.innerHTML = `
                <p>
                    Veuillez entrer un texte à traduire.
                </p>
            `;

            return;
        }

        // Message affiché pendant la traduction
        resultat.innerHTML = `
            <p>
                Traduction en cours...
            </p>
        `;

        try {

            // Envoi de la demande à l'API LibreTranslate
            const response = await fetch(
                "http://127.0.0.1:5000/translate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        // Texte à traduire
                        q: texte,

                        // Détection automatique de la langue source
                        source: "auto",

                        // Langue choisie par l'utilisateur
                        target: langue,

                        // Type de texte
                        format: "text"
                    })
                }
            );

            // Vérification de la réponse de l'API
            if (!response.ok) {

                throw new Error(
                    "Erreur lors de la traduction."
                );
            }

            // Conversion de la réponse en JSON
            const data = await response.json();

            // Affichage du résultat
            resultat.innerHTML = `
                <h3>Traduction</h3>

                <p>
                    ${data.translatedText}
                </p>
            `;

        } catch (error) {

            // Message affiché si l'API ne répond pas
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
// Gestion du menu
// ==========================================================

// Parcours de tous les liens du menu
menuLinks.forEach(function (link) {

    // Détection du clic sur un lien
    link.addEventListener("click", function (event) {

        // Empêche le comportement par défaut du lien
        event.preventDefault();

        // Suppression de la classe active
        // sur tous les éléments du menu
        menuLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        // Ajout de la classe active
        // sur le lien sélectionné
        link.classList.add("active");

        // Récupération du module sélectionné
        const module = link.getAttribute("data-module");


        // --------------------------------------------------
        // Affichage du module Résumé
        // --------------------------------------------------

        if (module === "resume") {

            afficherResume();

        }


        // --------------------------------------------------
        // Affichage du module Traduction
        // --------------------------------------------------

        if (module === "traduction") {

            afficherTraduction();

        }

    });
});