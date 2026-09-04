// ==========================================================
// Partie 3 - Module de résumé de texte
// ==========================================================

// Récupération de la zone principale de l'application
const mainContent = document.getElementById("main-content");

// Récupération des liens du menu
const menuLinks = document.querySelectorAll(".sidebar__link");


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


    // Action effectuée lorsque l'utilisateur clique sur Résumer
    boutonResumer.addEventListener("click", function () {

        const texte = document.getElementById("texte-a-resumer").value;
        const resultat = document.getElementById("resultat-resume");


        // Vérification que l'utilisateur a bien écrit un texte
        if (texte.trim() === "") {

            resultat.innerHTML = "<p>Veuillez entrer un texte à résumer.</p>";

            return;
        }


        // Résumé simulé demandé dans l'atelier
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


// Gestion des clics sur les éléments du menu
menuLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        // Suppression de la classe active sur les autres liens
        menuLinks.forEach(function (item) {
            item.classList.remove("active");
        });


        // Activation du lien sélectionné
        link.classList.add("active");


        // Récupération du module sélectionné
        const module = link.getAttribute("data-module");


        // Affichage du module Résumé de texte
        if (module === "resume") {
            afficherResume();
        }

    });

});