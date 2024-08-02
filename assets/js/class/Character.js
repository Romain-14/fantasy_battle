import { getRandomInteger } from "../utils.js";

class Character {
	constructor(name) {
        // valeurs de bases
        this.name      = name, // définit à l'instanciation
        this.hp        = 100,
        this.power     = 5,
        this.willpower = 5,
        this.mana      = 50,

        // les 2 suivantes ici sont les propriétés calculés utilisés pour les méthodes lors de l'interaction d'attaque et de soin
        this.damage  = 0;
        this.healing = 0;   

        // une propriété pour connaître le status des personnages (vivant ou mort)
        this.isAlive = true;

        // à l'instanciation de cet objet du coté de la class Program, cela finit avec la mise à jour des données de base
        this.setStats();
	}

    // la méthode pour définir de nouvelles valeurs sur : propriété de base + une valeur aléatoire
    setStats(){
        this.hp        +=  getRandomInteger(0, 40); // this.hp = this.hp + getRandomInteger(0, 40)
        this.mana      +=  getRandomInteger(0, 20);
        this.power     +=  getRandomInteger(0, 10);
        this.willpower +=  getRandomInteger(0, 10);          
    }

    // la méthode d'attaque déclenchée via la méthode attackHandler de la class Program
    // la cible(l'objet) à été transmise afin de modifier l'une de ses valeurs (les HP)
    attack(target) {
        // on prends la propriété damage qui vaudra : power de base + une valeur aléatoire
        // correspondra aux dégâts infligés lors de ce tour 
        this.damage = this.power + getRandomInteger(0, this.power); // 5 + 0~5
        // on prends la propriété hp de l'objet de la target(PLAYER ou COMPUTER), on réduit cette valeur de la valeur this.damage 
		target.hp -= this.damage;
        // on vérifie si après ces dégâts infligés les points de vie de la cible sont en négatif, si c'est le cas on arrondi à 0 et on affecte en ce sens la propriété isAlive
        if(target.hp <= 0){
            target.hp = 0;
            target.isAlive = false;
        }
	}

    // la méthode de soin déclenchée via la méthode attackHandler de la class Program
    // le PLAYER ou COMPUTER va voir son nombre de point de vie augmenté
    heal(){
        // même calcul que pour l'attaque ligne 36, juste la propriété qui est différente
        this.healing = this.willpower + getRandomInteger(0, this.willpower); // 5 + 0~5
        // on ajuste les points de vie en conséquence avec la valeur générée ci-dessus
        this.hp += this.healing;
        // on diminue la réserve de mana de 10 pour éviter que l'un des 2 personnages ne soigne à l'infini
        this.mana -= 10;
    }


}
export default Character;
