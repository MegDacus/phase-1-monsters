document.addEventListener('DOMContentLoaded', initialize)

function initialize () {
let page = 1;
let monsterContainer = document.querySelector('#monster-container');

getMonsters();
createMonsters();

function createMonsters() {
    let formSubmit = document.getElementById('submit');
    let form = document.getElementById('createMonsterForm');
    formSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let formName = document.getElementById('monsterName').value;
        let formAge = document.getElementById('monsterAge').value;
        let formDescrip = document.getElementById('monsterDescrip').value;

        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: formName,
                age:formAge,
                description: formDescrip
            })
        })
    form.reset();
    })
}

function getMonsters() {
    let forwardButton = document.querySelector('#forward');
    
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then (resp => resp.json())
    .then ((monsterArray) => {
        monsterArray.forEach((monster) => {
            let monsterName = monster.name;
            let monsterAge = monster.age;
            let monsterDescrip = monster.description;
            
            let name = document.createElement('h2')
            name.textContent = monsterName;
            let age = document.createElement('h4')
            age.textContent = monsterAge;
            let descrip = document.createElement('p')
            descrip.textContent = monsterDescrip;

            monsterContainer.append(name, age, descrip);
        })

        forwardButton.addEventListener('click', () => {
            page++;
            monsterContainer.innerHTML = '';
            getMonsters();
        })
    })
}}