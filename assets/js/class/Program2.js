import Character from "./Character2.js";

class Program {
    constructor(){
        // instancier les personnages
        this.player   = new Character("Seraphina");
        this.computer = new Character("Mayzikeen");

        // installer les écouteurs d'événements (les actions du joueur)
        attack.addEventListener("click", this.attackHandler.bind(this));
        // au lancement de l'application, il faut appliquer le changement de stats dans le DOM
        this.refreshStats(); 
    }

    // méthode pour rafraîchir l'affichage des statistiques des personnages
    refreshStats(){
        // PLAYER
        document.querySelector(`#player .hp`).textContent = this.player.hp;
        document.querySelector(`#player .mp`).textContent = this.player.mana;
        document.querySelector(`#player .attack`).textContent = this.player.dmg;
        document.querySelector(`#player .heal`).textContent = this.player.willpower;

        // COMPUTER
        document.querySelector(`#computer .hp`).textContent = this.computer.hp;
        document.querySelector(`#computer .mp`).textContent = this.computer.mana;
        document.querySelector(`#computer .attack`).textContent = this.computer.dmg;
        document.querySelector(`#computer .heal`).textContent = this.computer.willpower;
    }

    attackHandler() {
        // verifier si les joueurs sont encore en vie pour pouvoir attaquer, sinon on doit désactiver les écouteurs sur les boutons
        this.player.attack(this.computer);// attaque
        this.computer.attack(this.player);// contre-attaque
        this.refreshStats(); // affichage
    }

}

export default Program;