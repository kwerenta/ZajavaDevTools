const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');


const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();


const db = firebase.firestore();

const createItem = document.getElementById('createItem');
const itemsList = document.getElementById('itemsList');

const charactersList = document.getElementById('charactersList');
const questsList = document.getElementById('questsList');
const dialoguesList = document.getElementById('dialoguesList');

let itemsRef;
let charactersRef;
let questsRef;
let dialoguesRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Elo ${user.displayName}!</h3>`

        const questButton = document.getElementById('questButton');
        const itemButton = document.getElementById('itemButton');

        const questsMenu = document.getElementById('quests');
        const itemsMenu = document.getElementById('items');

        const menuButton = document.getElementById('menuButton');

        menuButton.onclick = () => {
            menu.hidden = false;
            itemsMenu.hidden = true;
            questsMenu.hidden = true;
        }

        itemButton.onclick = () => {
            menu.hidden = true;
            itemsMenu.hidden = false;

            itemsRef = db.collection('items');

            createItem.onclick = (e) => {
                e.preventDefault();

                var itemStats = new Map();

                for (let i = 1; i <= statCounter; i++) {
                    const statName = document.getElementById(`itemStatName${i}`).value;
                    const statValue = parseFloat(document.getElementById(`itemStatValue${i}`).value);

                    if (statName && statValue) itemStats.set(statName, statValue);
                }
                const objItemStats = Object.fromEntries(itemStats);

                const itemType = document.getElementById('itemType').value;
                const itemTier = document.getElementById('itemTier').value;
                const itemID = document.getElementById('itemId').value.toUpperCase();
                const itemMaterial = document.getElementById('itemMaterial').value.toUpperCase();
                const itemName = document.getElementById('itemName').value;

                if (itemID && itemMaterial && itemName) {
                    itemsRef.doc(itemID).set({
                        material: itemMaterial,
                        name: itemName,
                        stats: objItemStats,
                        tier: itemTier,
                        type: itemType,
                        CreatedBy: user.uid
                    });
                }
                else {
                    alert('Wszystkie pola muszą być wypełnione!');
                }
            }

            unsubscribe = itemsRef
                .onSnapshot(querySnapshot => {

                    const items = querySnapshot.docs.map(doc => {

                        return `<li>${doc.id}, ${doc.data().name}, ${JSON.stringify(doc.data().stats)}</li>`

                    });

                    itemsList.innerHTML = items.join('');

                });
        }

        questButton.onclick = () => {
            menu.hidden = true;
            questsMenu.hidden = false;

            charactersRef = db.collection('characters');

            //Add character

            unsubscribe = charactersRef
                .get()
                .then(query => {

                    const characters = query.docs.map(doc => {

                        return `<li id='C${doc.id}' class='characterBtn'>${doc.data().name}, ${doc.data().location}</li>`

                    });

                    charactersList.innerHTML = characters.join('');

                });

            charactersList.onclick = (e) => {
                const charID = e.target.getAttribute('id').slice(1);
                charactersList.hidden = true;
                questsList.hidden = false;

                questsRef = charactersRef.doc(charID).collection('quests');

                //Add quests

                unsubscribe = questsRef
                    .get()
                    .then(query => {

                        const quests = query.docs.map(doc => {

                            return `<li id='Q${doc.id}' class='questBtn'>${doc.data().name}, ${doc.data().requirements}</li>`

                        });

                        questsList.innerHTML = quests.join('');

                    });

                questsList.onclick = (e) => {
                    const questID = e.target.getAttribute('id').slice(1);
                    questsList.hidden = true;
                    dialoguesList.hidden = false;

                    dialoguesRef = questsRef.doc(questID).collection('dialogs');

                    //Add dialogues

                    unsubscribe = dialoguesRef
                        .onSnapshot(querySnapshot => {

                            const dialogues = querySnapshot.docs.map(doc => {

                                return `<li id='D${doc.id}' class='dialogueBtn'>${doc.data().order}. ${doc.data().sender}: ${doc.data().text}</li>`

                            });

                            dialoguesList.innerHTML = dialogues.join('') + '<li id="addDialogue">Dodaj kwestię</li>';

                        });
                }

            }

        }
    }
    else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';

        unsubscribe && unsubscribe();
    }
});

const openStats = document.getElementById('itemStatsButton');
const popup = document.getElementById('popup');
let statCounter = 1;

openStats.onclick = () => {
    const closeStats = document.getElementById('closeStats');
    const addStat = document.getElementById('addStat');
    const removeStat = document.getElementById('removeStat');

    const statsNames = document.getElementById('statsNames');
    const statsValues = document.getElementById('statsValues');

    statCounter = document.querySelectorAll('#statsNames > .itemStatInput').length

    popup.hidden = false;

    closeStats.onclick = () => {
        popup.hidden = true;
    }

    addStat.onclick = () => {
        statCounter++;

        const newInputName = document.createElement("input");
        newInputName.setAttribute('id', `itemStatName${statCounter}`);
        newInputName.classList.add('itemStatInput');
        statsNames.insertBefore(newInputName, removeStat);

        const newInputValue = document.createElement("input");
        newInputValue.setAttribute('id', `itemStatValue${statCounter}`);
        newInputValue.classList.add('itemStatInput');
        statsValues.insertBefore(newInputValue, addStat);

    }

    removeStat.onclick = () => {
        if (statCounter > 1) {
            const removeInputName = document.getElementById(`itemStatName${statCounter}`);
            removeInputName.remove();

            const removeInputValue = document.getElementById(`itemStatValue${statCounter}`);
            removeInputValue.remove();

            statCounter--;
        }
    }

}