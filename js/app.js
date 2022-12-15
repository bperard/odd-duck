'use strict';

// PROVIDED & LOCAL STORAGE DATA

const userInputForm = document.querySelector('#userInputDiv form');
const oddDuckItemsContainer = document.querySelector('#oddDuckItemsContainer');

const itemDataTrackersArray = [];
const userSessions = [];
let resultsTableElementsArray = [];

const imageFilenamesString = 'bag.jpg banana.jpg bathroom.jpg boots.jpg breakfast.jpg bubblegum.jpg chair.jpg cthulhu.jpg dog-duck.jpg dragon.jpg pen.jpg pet-sweep.jpg scissors.jpg shark.jpg sweep.jpg tauntaun.jpg unicorn.jpg water-can.jpg wine-glass.jpg';

function createImageObjectsArray(filenameString) {
  const imageObjectsArray = [];

  const stringyImageObjectsArray = localStorage.getItem('stringyImageObjectsArray');

  if (!stringyImageObjectsArray) {
    const parsedFilenamesArray = filenameString.split(' ');
    for (let i = 0; i < parsedFilenamesArray.length; i++) {
      const nameExtensionArray = parsedFilenamesArray[i].split('.');
      const newImageObject = {
        name: nameExtensionArray[0],
        extension: nameExtensionArray[1],
      };
      imageObjectsArray.push(newImageObject);
    }

    const stringyImageObjectsArray = JSON.stringify(imageObjectsArray);
    localStorage.setItem('stringyImageObjectsArray', stringyImageObjectsArray);

  } else {
    console.log('LOCAL STORAGE PARSED&STRING ARRAY', JSON.parse(stringyImageObjectsArray), stringyImageObjectsArray);
    return JSON.parse(stringyImageObjectsArray);
  }

  console.log('NEW ARRAY TO LOCAL STORAGE', imageObjectsArray);
  return imageObjectsArray;
}

function createItemDataTrackersArray() {
  const imageObjectsArray = createImageObjectsArray(imageFilenamesString);

  for (let i = 0; i < imageObjectsArray.length; i++) {
    const newItemDataTracker = new ItemDataTracker(imageObjectsArray[i], i);
    itemDataTrackersArray.push(newItemDataTracker);
  }
}

// CONSTRUCTORS

function ItemDataTracker(imageObject, index) {
  this.name = imageObject.name;
  this.extension = imageObject.extension;
  this.views = 0;
  this.votes = 0;
  this.renderPosition = index;
}

function UserSessionObject(totalRounds, itemsPerRound) {
  this.currentRound = 1;
  this.rounds = totalRounds;
  this.itemsPerRound = itemsPerRound;
  this.currentItemDataTrackerIndexArray = [];
}

// CONSTRUCTOR METHODS

ItemDataTracker.prototype.addView = function() {
  this.views++;
};

ItemDataTracker.prototype.addVote = function() {
  this.votes++;
};

UserSessionObject.prototype.generateItemDataTrackerIndex = function() {
  let index = Math.floor(Math.random() * itemDataTrackersArray.length);
  if (this.currentItemDataTrackerIndexArray.includes(index)) {
    index = this.generateItemDataTrackerIndex();
  }
  return index;
};

UserSessionObject.prototype.generateCurrentItemDataTrackerIndexArray = function() {
  for (let i = 0; i < this.itemsPerRound; i++) {
    const newIndex = this.generateItemDataTrackerIndex();
    this.currentItemDataTrackerIndexArray.push(newIndex);
  }
};

UserSessionObject.prototype.renderCurrentItemDataTrackerIndexArray = function() {
  for (let i = 0; i < this.currentItemDataTrackerIndexArray.length; i++) {
    const newItem = itemDataTrackersArray[this.currentItemDataTrackerIndexArray[i]];
    const imgEl = document.createElement('img');
    console.log(newItem);
    imgEl.setAttribute('src', `img/${newItem.name}.${newItem.extension}`);
    imgEl.setAttribute('alt', `${newItem.name}`);
    imgEl.setAttribute('id', newItem.renderPosition);
    oddDuckItemsContainer.appendChild(imgEl);
  }
};


// UserSessionObject.prototype.methods
// start voting session
// addEvent listener for voting div
// update itemDataTrackers each round
// update rounds
// create
// end voting session & remove event listener

// EVENT HANDLERS

function startOddDuckin(event) {
  event.preventDefault();

  const totalRounds = 25; // get totalRoundsInput.value
  const itemsPerRound = 3; // get itemsPerRoundInput.value

  if (event.target.id === 'startOddDuckinButton' && totalRounds > 0 && itemsPerRound > 1) {
    event.target.classList.toggle('hideButton');

    createResultsTableBody();
    const currentUserSession = new UserSessionObject(totalRounds, itemsPerRound);
    currentUserSession.generateCurrentItemDataTrackerIndexArray();
    console.log(currentUserSession.currentItemDataTrackerIndexArray);
    currentUserSession.renderCurrentItemDataTrackerIndexArray();
    // render currentItmeDataTrackersArray data
    // addEvent Listener to voting div
    // refresh array(with varitey controls)
    // receive results
    // track rounds
    // end after final round
    // remove event listener
    // show results


    // event.target.classList.toggle('hideButton');
  }

  // userSessionObject.runGame();
}

function handleOddDuckinRoundsInput(event) {
  event.preventDefault();

  // add views to every item in currentItemDataTrackerIndexArray
  // add vote to ItemDataTracker matching event.target.value
}

// EVENT LISTENERS

userInputForm.addEventListener('click', startOddDuckin);

// RENDER FUNCTIONS

function createResultsTableBody() {
  const parentEl = document.querySelector('#resultsTableBody');
  parentEl.innerHTML = '';

  for (let i = 0; i < itemDataTrackersArray.length; i++) {
    const nameEl = document.createElement('td');
    nameEl.innerText = itemDataTrackersArray[i].name;

    const viewsEl = document.createElement('td');
    viewsEl.innerText = itemDataTrackersArray[i].views;

    const votesEl = document.createElement('td');
    votesEl.innerText = itemDataTrackersArray[i].votes;

    const trEl = document.createElement('tr');
    trEl.append(nameEl, viewsEl, votesEl);
    parentEl.appendChild(trEl);
  }

  document.querySelector('#currentRoundCell').innerText = 1;
  resultsTableElementsArray = document.querySelectorAll('tbody td');
}

// EXECUTABLE CODE

createItemDataTrackersArray();
console.log('createItemDataTrackersArray', itemDataTrackersArray);
