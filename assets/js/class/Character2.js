import { getRandomInteger } from "../utils.js";

class Character{
    constructor(name){
        this.name   = name;
        this.hp     = 100;
        this.mana   = 50;
        this.dmg    = 10;
        this.willpower = 5;  
        
        this.isAlive = true;

    }

    // méthode pour rajouter des valeurs aux propriétés de bases et rendre le personnage plus fort avec la fonction getRandomInteger
    attack(target){

        // target sera l'objet Seraphina si c'est mayzikeen qui attaque et vice versa
        // effectuer l'attaquer -> diminuer les "hp" de la target : les hp de la target MOINS les dmg de THIS objet 
        target.hp -= this.dmg + getRandomInteger(0, 5); // target.hp = target.hp - this.dmg
        if(target.hp <= 0) {
            target.hp = 0;
            target.isAlive = false;
        }
     
    }

}

export default Character;