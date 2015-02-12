/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // Initialize solution board to empty array
  var solution = []; //fixme
  // Initialize counter
  var counter = 0;

  var board = new Board({n: n});

  // Initialize recursive function
  var recurse = function(board) {
    // Initialize new board
    var newBoard = board;

    if (counter === n) {
      solution = newBoard.rows().slice();
      return;
    }
    // Base case: counter === n
    //   Set board to solution array
    //   Return
    // Recursive case:
    //   Iterate over new board
    //     If element is open (< 1)
    //       Push element into new board
    //       Test against helper functions
    //         If there are conflicts (true)
    //           Pop out element
    //         If there are no conflicts (false)
    //           Increment counter
    //           Push new board into recursive function
    for (var row = 0; row < n; row++){
      for (var col = 0; col < n; col++){
        if(newBoard.rows()[row][col] < 1){
          newBoard.rows()[row][col] = 1;
          if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
            newBoard.rows()[row][col] = 0; // equivalent to popping out value
          } else {
            // recursive function
            counter++;
            recurse(newBoard);
          }
        }
      }
    }
  };

  // Call recursive function on initial board
  // Return solution
  recurse(board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
