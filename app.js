const ask = require('readline-sync')
let isAlive = true;
let hasWon = false;

function Enemy(name, hp, weapon, ap, item) {
    this.name = name
    this.hp = hp
    this.weapon = weapon
    this.ap = ap
    this.item = item
}

const pestControl = new Enemy('The Exterminator', 75, 'rat poison spray', 25, 'a $20 bill')
const oldLady = new Enemy('An Old Woman', 35, 'a broom', 10, 'a loose pearl')
const bigRat = new Enemy('A bigger rat', 50, 'his big boi teeth', 20, 'some stinky cheese')

const enemies = [pestControl, oldLady, bigRat]


function Rat(hp, ap) {
    this.hp = hp
    this.ap = ap
}

const player = new Rat(100, 25)
const inventory = []

console.log(`                                                          
          |__/  | $$                                         | $$    
  /$$$$$$$ /$$ /$$$$$$   /$$   /$$        /$$$$$$  /$$$$$$  /$$$$$$  
 /$$_____/| $$|_  $$_/  | $$  | $$       /$$__  $$|____  $$|_  $$_/  
| $$      | $$  | $$    | $$  | $$      | $$  \__/ /$$$$$$$  | $$    
| $$      | $$  | $$ /$$| $$  | $$      | $$      /$$__  $$  | $$ /$$
|  $$$$$$$| $$  |  $$$$/|  $$$$$$$      | $$     |  $$$$$$$  |  $$$$/
 \_______/|__/   \___/   \____  $$      |__/      \_______/   \___/  
                         /$$  | $$                                   
                        |  $$$$$$/                                   
                         \______/                                    `)
console.log("Hello little rat.")
const name = ask.question("What is your name? ")
console.log(`Thanks ${name}. `)
while(isAlive && !hasWon){
    let choice = ask.keyIn("Walk (w), Check Inventory (i), or Quit (q)? ", {limit: 'wiq'})
    if (choice === 'w') {
        walk()
    } else if (choice === 'q') {
        isAlive = false
        console.log("You were squashed by a passing pedestrian and died!")
    } else if (choice === 'i') {
        console.log(inventory)
    }
}

function walk() {
    let random = Math.floor(Math.random()*4)
    if (random === 3) {
        enemyEncounter()
    } else {
        console.log("You proceed safely.")
    }
}
function enemyEncounter() {
    const currEnemy = selectEnemy()
    let choice = ask.keyIn(`You've been spotted by ${currEnemy.name}! Engage (e), Flee (f), or Quit (q)? `, {limit: 'efq'})
    if (choice === 'e'){
        fight(currEnemy)
    } else if (choice === 'f'){
        fleeAttempt()
    } else {
        isAlive = false
        console.log(" You were squashed by a passing pedestrian and died!")
    }
}

function selectEnemy(){
    let random = Math.floor(Math.random()*enemies.length)
    return enemies[random]
}

function fight(obj) {
    let heroAtt = Math.floor(Math.random()*player.ap) + 5
    let enemyAtt = Math.floor(Math.random()*obj.ap)
    
    while (obj.hp > 0 && player.hp > 0) {
        let choice = ask.keyIn(`What would you like to do? Attack (a) or Flee (f)? `, {limit: 'af'})
        if (choice === 'a') {
            obj.hp = obj.hp - heroAtt
            console.log(`You dealt ${heroAtt} damage. ${obj.name} has ${obj.hp} left. `)
            player.hp = player.hp - enemyAtt
            console.log(`${obj.name} attacks you with ${obj.weapon} and deals ${enemyAtt} damage. You have ${player.hp} left.`)
            if (obj.hp <= 0) {
                console.log(`You've defeated ${obj.name}! They dropped ${obj.item}!`)
                inventory.push(obj.item)
                enemies.splice(enemies.indexOf(obj), 1)
            } else if (player.hp <= 0){
                isAlive = false
                console.log(`You've been defeated by ${obj.name}. :(`)
            } if (enemies.length === 0) {
                hasWon = true
                console.log(`You live to eat another big cheese. Congrats little rat.`)
            }
        } else if (choice === 'f') {
            player.hp = 0
            isAlive = false
            console.log(`Never turn your back in a fight, you're suuuuper dead.`)
        }
    }
}

function fleeAttempt() {
    let randomChance = Math.floor(Math.random()*2)
    const currEnemy = selectEnemy()
    if (randomChance === 1) {
        console.log(`You're unable to escape this fight!`)
        fight(currEnemy)
    } else {
        console.log(`A narrow escape.`)
    }
}