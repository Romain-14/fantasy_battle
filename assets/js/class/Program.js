import Character from "./Character.js";

class Program {
	constructor() {
		this.player   = new Character("Seraphina");
		this.computer = new Character("Mayzikeen");

		this.action = ""; // spécifique au type d'action effectué pour le journal de combat méthode displayLog
		this.round  = 1;

		// instructions pour placer les écouteur sur les boutons d'actions
		// on créé une seul référence afin de la lier aux écouteurs pour les retirer lorsque ce sera requis
		// c'est cette référence qu'on passera en callback ligne 21 
		this.actionHandlerBound = this.actionHandler.bind(this);

		// on stock dans une variables tous les boutons d'actions
		this.buttons = document.querySelectorAll(
			".player__actions button"
		);
		// pour chaque bouton, on y place un écouteur d'événement
		for (const btn of this.buttons) {
			btn.addEventListener("click", this.actionHandlerBound);
		}
		// 
		// on va mettre à jour les données (statistiques health et mana) générées par l'instanciation des objets Characters 
		this.refreshStats();
	}

	refreshStats() {
		this.displayStats(this.player, "player");
		this.displayStats(this.computer, "computer");
	}

	displayStats(character, id) {
		// const hpDOM = document.getElementById(` .hp`);
		// console.log(hpDOM)
		// hpDOM.textContent = character.hp; // getElementById ici les autres avec querySelector
		document.querySelector(`#${id} .hp`).textContent = character.hp; // getElementById ici les autres avec querySelector
		document.querySelector(`#${id} .mp`).textContent = character.mana;
		document.querySelector(`#${id} .attack`).textContent = character.power;
		document.querySelector(`#${id} .heal`).textContent = character.willpower;
	}

	actionHandler(e) {
		// stocké la valeur de retour boolean de la fonction (soit true soit false)
		// const isItOver = this.isGameOver();
		// if(isItOver) return; // on s'en sert pour stopper l'execution de la fonction
		// méthode plus courte/rapide 
		if (this.isGameOver()) return; 

		// stocker l'id de l'élément cliqué
		// remonte la chaîne de propriété 
		const action = e.target.id;
        
		// si l'utilisateur à cliquer sur ATTACK, l'objet player utilise sa méthode attack
		if (action === "attack") this.attackHandler(this.player, this.computer);
		// if (action === "attack") this.attackHandlerPlayer();
		// si l'utilisateur à cliquer sur HEAL et qu'il a une valeur numérique insuffisante, on l'averti qu'il ne peut pas effectuer cette action (HEAL) il peut donc effectuer une autre action à la place
		if (action === "heal" && this.player.mana < 10) return alert("Not enough mana");
		// si l'utilisateur à cliquer sur HEAL ici ça veut dire qu'il a suffisamment de MANA pour se soigner (récupérer des points de vie) il va donc executer la méthode heal de l'objet PLAYER
		if (action === "heal") this.healHandler(this.player);
        
		// affichage de l'information du tour, ce qu'a effectué comme action le PLAYER
		this.displayLog(this.player, this.computer );

		// si le computer est encore en vie ( computer.hp > 0 définit dans l'objet computer) il peut contre-attaquer ou se soigner
		if (this.computer.isAlive) this.computerTurn();
		// raffraichir l'affichage des statistiques notamment les points de vie(HP) et la mana des 2 personnages
		this.refreshStats();
		// on vérifie suite à l'action du computer si le jeu doit se terminer car le PLAYER serait KO(mort)
		if (this.isGameOver()) return;
		// affichage du nombre de round dans le bloc "log"
		this.displayRound();
	}

	// juste pour l'exemple (appelé ligne 50)
	// attackHandlerPlayer(){
	// 	this.player.attack(this.computer);
	// 	this.action = "attack";
	// }
	
	// attackHandlerComputer(){
	// 	this.computer.attack(this.player);
	// 	this.action = "attack";
	// }

	attackHandler(attacker, target) { 
		// utilisation de la méthode attack de l'objet (attacker) sur l'objet (target) qui a initié l'attaque en transmettant l'objet qui va subir l'attaque
		attacker.attack(target); // this.player.attack(this.computer) si l'attaquant est le joueur (clic sur bouton)
		// définir le type d'action, va servir pour la méthode displayLog afin de savoir qu'elle information il doit injecter dans le DOM
		this.action = "attack";
	}

	healHandler(healer) {
		// pareil que au-dessus mais en version HEAL
		healer.heal();
		this.action = "heal";
	}

	computerTurn() {
		// le computer a également 2 actions possibles
		// se soigner uniquement si ses points de vie sont inférieur à 30 ET que la MANA et supérieur/égale à 10
		if (this.computer.hp < 30 && this.computer.mana >= 10) {
			this.healHandler(this.computer);
		} else { // sinon il va attaquer le PLAYER
			this.attackHandler(this.computer, this.player);
		}
		// affichage de la ligne d'information dans le LOG
		this.displayLog( this.computer, this.player);
	}

	displayRound() {
		// création d'un élément H3 pour y injecter le nombre de tour
		const h3 = document.createElement("h3");
		// affectation de contenu textuel au H3 créer au dessus, en incrémentant l'expression directement
		h3.textContent = `Round ${this.round++}`;
		// on récupère la balise UL pour ajouter le H3 et son contenu en tant que 1er enfant
		document.querySelector("ul").prepend(h3);
	}

	// les paramètres initiator correspond à celui qui effectue l'action (PLAYER ou COMPUTER), target va servir uniquement si le type d'action est "attack"
	displayLog(initiator, target) {
		// selection de la balise ul et stocké dans une constante
        const ul = document.querySelector("ul");
		// création d'une balise li stockée dans une constante
        const li = document.createElement("li");
		// on se sert de la propriété définie dans les méthodes attackHandler/healHandler pour injecter un text différent en fonction 
        if(this.action === "attack"){
            li.textContent = `${initiator.name} deals ${initiator.damage} damage to ${target.name}`;
        }
        if(this.action === "heal"){
            li.textContent = `${initiator.name} heals herself of ${initiator.healing} hp`;
        }
		// ajout dans le DOM la balise LI
        ul.prepend(li);
	}

	isGameOver() {
		// on vérifie un des 2 personnages est KO(mort) si c'est le cas on veut retirer du DOM les écouteurs
		// et afficher le nom du vainqueur à la place des informations des tours lors du combat
		if (!this.player.isAlive || !this.computer.isAlive) {

			// on boucle sur les boutons pour retirer les écouteurs en spécifiant bien la même référence déclarés lors de l'ajout des écouteur dans le constructor en haut !
			for (const btn of this.buttons) {
				btn.removeEventListener("click", this.actionHandlerBound);
			}

			// une ternaire permet de vérifier si le PLAYER est vivant dans ce cas on retourne son objet(ses infos) sinon on retourne l'objet de computer
			let winner = null;
			if(this.player.isAlive) {
				winner = this.player;	
			} else winner = this.computer;
			// EN VERSION TERNAIRE ->  condition ? true : false 			
			// const winner = this.player.isAlive ? this.player : this.computer;
			// injection dans le DOM du nom du vainqueur, on vide le l'emplacement de la ul
            document.querySelector("#log").innerHTML = "<li>"+ winner.name + " wins!" + "</li>";

			// on retourne un boolean dans le cas de la mort d'un personnage afin de stopper l'execution de la fonction où elle est appelée
			return true;
		}
		// pareil retour boolean false car le jeu n'est pas terminé car aucun mort
		return false;
	}
}

export default Program;