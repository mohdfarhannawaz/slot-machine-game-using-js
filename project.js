// SETUP
    // enter the npm init command in the terminal and press enter on each question it asks
    // then node_modules and package.json would be visible in the explorer tab
    // enter the command `npm i prompt-sync` and press enter 
    // now begin writting code in the project.js file
/**
 * The Project Consist Of Following functionalities
        * 1. Deposit money from the user
        * 2. Ask the no. of lines, user's gonna bet on
        * 3. Collect a bet amount 
        * 4. Spin the slot machine
        * 5. Checks if the user won
        * 6. If the user won hand-over the winning amount
        * 7. If he loses play-again  */ 


// this function is used to take the input from the user
const prompt = require ("prompt-sync")();

// GLOBAL VARIABLES
const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}

// 1. DEPOSIT MONEY FROM THE USER

// declaring the deposit function for the step 1 
const deposit = () =>{  // new way of declaring functions in js
    // declaring a while loop for the looping of the function so that it runs automatically
    // until the condition fails
    while(true) {
        // asking the user to input the deposit amount
    const depositAmount = prompt("Enter the amount you wanna play with : ");
    // converting the input into the float type using parsefloat function, cause initially its in the string type
    const numberdepositAmount = parseFloat(depositAmount);
    // putting a condition for checking the number is valid float number and is not a string
    // and is not less than 1, so that it is not a negative number
    // isNaN is a function for checking if the depositAmountNumber is NotaNumber 
    if ( isNaN(numberdepositAmount) || numberdepositAmount < 1) {
        // displaying the result, if true
        console.log("Invalid Amount, Please enter a valid number!");
    }
        // else condition 
    else {
        // returning the depositAmountNumber
        return numberdepositAmount;
    }
    }
};

// 2. ASKING NUMBER OF LINES, USER IS GONNA BET ON

// declaring the getNumberOfLines function
const getNumberOfLines = () => {
    while(true) { // looping until its true
         //prompting user to input the number of lines he wanna bet on
        const lines = prompt("Enter the number of lines you wanna bet on (1-3) : "); 
        // converting the user input into float from the string 
        const numberOfLines = parseFloat(lines);
        // checking whether the input is within the range of the no. of lines
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log ("Invalid amount, please fill with the range of 1-3 only!");
        }
        else {
            return numberOfLines;
        }
    }
};

// 3. Collect the amount of bet 
const getBet = (balance , lines) => { // passing the balance and lines parameter such that it and its properties could be utilised
    // within the project 

    // same logic as above functions

    while (true) {
        const bet = prompt("Enter the amount of bet per line : ");
        const numberBet = parseFloat(bet); // converting the string input into float/number data type

        if (isNaN(numberBet) || numberBet > balance/lines || numberBet <= 0 ){
            console.log("Invalid amount, please enter the amount within the scope : ");
        }
        else {
            return numberBet;
        }
    }
};

// 4. SPIN THE SLOT MACHINE
const spin = () => {
    const symbols = []; // array declaration
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) { // for of loop for the object's keys and properties 
        // to iterate 
        for (let i =0; i < count ; i++) { // iterate through the count 
            symbols.push(symbol); // pushing the keys into the symbols array
        }
    }
    // created by Mohd Farhan Nawaz

    const reels = []; // another empty array declaration
    for (let i = 0; i < COLS; i++) { // iterating it through the COL variable
        reels.push([]); // pushing the empty arrays (which are equal to the no. of columns) inside the reels array
        const reelSymbols = [...symbols]; // reelSymbols array consist of all the array elements of symbols
        // created to hold the elements and manipulate them later so that symbols (primary array) does not have any effect
        for (let j = 0; j < ROWS; j++) { // iterating through the rows, for loop within a for loop
            // randomIndex generates a random number using the math.random() function and is product of reelSymbols
            // length and which round off to the lowest positive value such that it does go out of bound
            const randomIndex = Math.floor(Math.random()*reelSymbols.length); 
            const selectedSymbol = reelSymbols[randomIndex]; // selectedSymbol contains the reelSymbols array containing the 
            // randomIndex generated through the loops
            reels[i].push(selectedSymbol); // pushing the selectedSymbol into the reels
            reelSymbols.splice(randomIndex, 1); // now removing the randomIndex such that it doesn't get selected twice
        } 
    }
    return reels;
};

// 5. Check If The Won By displaying The Result

// this function displays the result in the arrays format i.e., [A B D][D A B][B A C]
const transpose = (reels) => { 
    const rows = []; // declared a new array to hold the values
    for (let i = 0; i < ROWS; i++) { // iterating through the rows 
        rows.push([]); // placing a new empty array in each row
        for (let j = 0; j < COLS; j++) { // iterating through the column
            rows[i].push(reels[j][i]); // pushing the elements (column first row second) of the reels in 
            //the i indexing of the row 
        }
    }
    return reels;
}
 // now converting the array into more visually appealing manner as in a slot machine A | B | C 
                                                                                //    C | A | B
                                                                                //    D | C | D


const printRows = (rows) => {
    // iterating using a for of loop 
    for (const row of rows){
        let rowString = ""; // empty string
        for (const [i, symbol] of row.entries()) { // iterating  using the for of loop with the entries attribute
            // to only diplay the value of the keys
            rowString += symbol; // assigning value such that it store the complete row
            if ( i != row.length - 1) { // placing condition such that the last element of the row doesnot have '|' at the end
                rowString += " | "; // and only the elements before could have the '|' mark
            }
        }
        console.log(rowString); // printing the rows
    }
};

// 6. If the user won hand-over the winning amount

const getWinnings = (rows, bet, lines) => {
    let winnings = 0; // initially winning set to zero
    
    // iterating through the rows of each line
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]; 
        let allSame = true; 

        // iterating through the symbols  
        for (const symbol of symbols) {
            // checking if the first and other elements of row are equal. If not then the allSame is false
            if(symbol != symbols[0]) {
                allSame = false; 
                break; // because there is no need to check other elements of the row if the first two are equal 
            } // simply terminate it
        }
        if (allSame) { // if equal then calculate the winning amount as per bet on equal and the symbols's value
            winnings += bet*SYMBOL_VALUE[symbols[0]];
        }
    }
    return winnings;
};

// 7. Combining all functions under single function

const game = () => {
    let balance = deposit();// function call of Deposit()
    while(true) { // iterating it until balance is deposited
        console.log("Current Balance : $ " + balance); // displaying the current balance of the user
        const numberOfLines = getNumberOfLines(); // getNumberofLines function call for prompting number of lines
        const bet = getBet(balance, numberOfLines); // bet function call for applying bet amount 
        balance -= bet * numberOfLines; // updating the user balance and deducting the amount that user has placed
        const reels = spin(); // function for the generation of random arrays of symbols upto 3 elements into 9 arrays - 3 columns and 3 rows
        const rows = transpose(reels); // function for converting the arrays into the visually appealing format just like in a slot machine
        printRows(rows); // displaying the result from the slot machine
        // function for checking if any row has same symbols and then calculating the winning amount if applied
        const winnings = getWinnings(rows, bet, numberOfLines);  
        balance += winnings; // updating the current balance from the winning
        console.log("Dear User You won $ " + winnings.toString()); // displaying the result of the slot machine
        // if the current balance reaches 0 or blow then it terminates with a 'ran out of money' message
        if (balance <= 0) { 
            console.log("You ran out of money!");
            break;
        }

        // After each bet it promts the user if he wants to continue playing the game or want to quit
        const playAgain = prompt("Do you play again? press 'y' for yes and anything else to quit : ");
        // condition for the user input, if input is other than 'y' then the program terminates
        if (playAgain != 'y') break; 
    }
}

game(); // function call of our game function
