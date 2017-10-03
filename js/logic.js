let BasicCard = require("./BasicCard.js");
let ClozeCard = require('./ClozeCard.js');
let inquirer = require('inquirer');

let basicCards = [];
let clozeCards = [];
let allCards = [];
let cardCounter = 0;

function createCard() {
  inquirer
  .prompt([
    {
      type :'list',
      message: 'What type of card would you like to create?',
      choices: ['Basic Card', 'Cloze Card'],
      name: 'cardType'
    }
  ]).then(function(response) {
    if (response.cardType === 'Basic Card') {
      basicCard();
    }
    else {
      clozeCard();
    }
  })
}

function userOptions() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do',
      choices: ['Make a card', 'Look at my cards', 'Test my knowledge', 'Exit (All cards will be lost)'],
      name: 'userChoice'
    }
  ]).then(function(response) {
    switch (response.userChoice) {
      case 'Make a card':
        createCard();
        break;
      case 'Look at my cards':
        viewCards();
        break;
      case 'Test my knowledge':
        cardCounter = 0;
        testKnowledge()
        break;
      case 'Exit (All cards will be lost)':
        break;
    }
  });
}
    

function basicCard() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'What will the front of the card say? (The question)',
      name: 'basicFront',
    },
    {
      type: 'input',
      message: 'What will the back of the card say? (The answer)',
      name: 'basicBack',
    }
  ]).then(function(response) {
    newCard = new BasicCard (response.basicFront, response.basicBack);
    basicCards.push(newCard);
    allCards.push(newCard);
    userOptions();
  })
}

function clozeCard() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the full statement or question?',
      name: 'clozeFront',
    },
    {
      type: 'input',
      message: 'What part would you like to omit from the statement or question? (The cloze)',
      name: 'clozeBack',
    }
  ]).then(function(response) {
    newCard = new ClozeCard (response.clozeFront, response.clozeBack);
    if (newCard.verify() === true) {
      clozeCard();
      return;
    }
    console.log('-----------------NEW CARD CREATED------------------------')
    clozeCards.push(newCard);
    allCards.push(newCard);
    userOptions();
  })
}

function viewCards() {
  for (let i = 0; i < allCards.length; i++) {
    console.log('-----------------------Card #' + (i +1) + '---------------------------------')
    if (allCards[i].front) {
        console.log('Front: ' + JSON.stringify(allCards[i].front) + ' Back: ' + JSON.stringify(allCards[i].back));
    }
    else {
      console.log('Full Text: ' + JSON.stringify(allCards[i].fullText) + ' Cloze: ' + JSON.stringify(allCards[i].cloze));
    }
  }
  userOptions();
}

function testKnowledge() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which deck of cards do you want to test yourself on?',
      choices: ['Cloze Cards only', 'Basic Cards only', 'All cards'],
      name: 'userChoice'
    }
  ]).then(function(response) {
    switch(response.userChoice) {
      case 'Cloze Cards only':
      testCloze();
      break;
      case 'Basic Cards only':
      testBasic();
      break;
      case 'All cards':
      testAll();
      break;
    }
  })
}

function testCloze() {
  if (cardCounter < clozeCards.length) {
    console.log('Full Text: ' + clozeCards[cardCounter].fullText);
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the cloze of this card?',
        name: 'userInput',
      }
    ]).then(function(response) {
      if (response.userInput.toLowerCase() === clozeCards[cardCounter].cloze) {
        console.log('Nice Job! That is correct!')
        cardCounter++;
        testCloze();
      }
      else {
        console.log('Not quite! The correct answer is ' + clozeCards[cardCounter].cloze + '.');
        cardCounter++;
        testCloze();
      }
    })
  }
  else {
    console.log('You reached the end of the deck!')
    userOptions();
  }
}


function testBasic() {
    if (cardCounter < basicCards.length) {
      console.log('Full Text: ' + basicCards[cardCounter].front);
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the back of this card?',
          name: 'userInput',
        }
      ]).then(function(response) {
        if (response.userInput === basicCards[cardCounter].back) {
          console.log('Nice Job! That is correct!')
          cardCounter++;
          testBasic();
        }
        else {
          console.log('Not quite! The correct answer is ' + basicCards[cardCounter].back + '.');
          cardCounter++;
          testBasic();
        }
      })
    }
    else {
      console.log('You reached the end of the deck!')
      userOptions();
    }
}

function testAll() {
  if (cardCounter < allCards.length) {
    if (allCards[cardCounter].front){
      console.log('Full Text: ' + allCards[cardCounter].front);
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the back of this card?',
          name: 'userInput',
        }
      ]).then(function(response) {
        if (response.userInput === allCards[cardCounter].back) {
          console.log('Nice Job! That is correct!')
          cardCounter++;
          testAll();
        }
        else {
          console.log('Not quite! The correct answer is ' + allCards[cardCounter].back + '.');
          cardCounter++;
          testAll();
        }
      })
    }
    else if (allCards[cardCounter].cloze) {
      console.log('Full Text: ' + allCards[cardCounter].fullText);
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the cloze of this card?',
          name: 'userInput',
        }
      ]).then(function(response) {
        if (response.userInput === allCards[cardCounter].cloze) {
          console.log('Nice Job! That is correct!')
          cardCounter++;
          testAll();
        }
        else {
          console.log('Not quite! The correct answer is ' + allCards[cardCounter].cloze + '.');
          cardCounter++;
          testAll();
        }
      })
    }
  }
  else {
    console.log('You reached the end of the deck!')
    userOptions();
  }
};
userOptions();

    


