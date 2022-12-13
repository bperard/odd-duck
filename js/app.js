'use strict';

// PROVIDED DATA

const itemDataTrackersArray = [];
const userSessions = [];
let resultsTableElementsArray = [];

const imageFilenamesString = 'bag.jpg banana.jpg bathroom.jpg boots.jpg breakfast.jpg bubblegum.jpg chair.jpg cthulhu.jpg dog-duck.jpg dragon.jpg pen.jpg pet-sweep.jpg scissors.jpg shark.jpg sweep.jpg tauntaun.jpg unicorn.jpg water-can.jpg wine-glass.jpg';

function createImageObjectsArray(filenameString) {
  const imageObjectsArray = [];

  const parsedFilenamesArray = filenameString.split(' ');
  for (let i = 0; i < parsedFilenamesArray.length; i++) {
    const nameExtensionArray = parsedFilenamesArray[i].split('.');
    const newImageObject = {
      name: nameExtensionArray[0],
      extension: nameExtensionArray[1],
    };
    imageObjectsArray.push(newImageObject);
  }

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
  this.currentItemDataTrackersArray = [];


}

// CONSTRUCTOR METHODS

ItemDataTracker.prototype.addView = function () {
  this.views++;
};

ItemDataTracker.prototype.addVote = function () {
  this.votes++;
};



// UserSessionObject.prototype.methods
// usses itemDataTrackersArray and runs each turn
// set rounds & items/rd
// start voting session

// addEvent listener for voting div
// update itemDataTrackers each round
// update rounds
// create
// end voting session & remove event listener
// 

// EVENT HANDLERS

function startOddDuckin(event) {
  event.preventDefault();


  // get totalRounds, itemsPerRound from DOM
  // hide button
  // const currentUserSession = new UserSessionObject(totalRounds, itemsPerRound);
  createResultsTableBody();
  // userSessionObject.runGame();
  // show button
}

// RENDER FUNCTIONS

function createResultsTableBody() {
  const parentEl = document.querySelector('#resultsTablebody');
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
