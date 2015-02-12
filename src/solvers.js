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
    var matrix = newBoard.rows();

    if (counter === n) {
      solution = matrix.slice();
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
        if(matrix[row][col] < 1){
          matrix[row][col] = 1;
          if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
            matrix[row][col] = 0; // equivalent to popping out value
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
  // Create nxn chessboard
  // Initialize solutionCount to 0
  var board =  new Board({n: n});
  var solutionCount = 0;

  // Initialize iterate function
  var iterate = function(workingBoard, iterator){
    var matrix = workingBoard.rows();
    for (var row = 0; row < n; row++){
      for (var col = 0; col < n; col++){
        iterator(matrix[row][col]);
      }
    }
  };

  // Call iterator on each square in board
  iterate(board, function(startingSquare){
    // Place 1 at startingSquare (our starting point)
    startingSquare = 1;
    console.log(board.rows());

    // Initialize rooks count to 0
    var rooksCount = 0;

    // Initialize recurse function
    var recurse = function(board){
      // Set newBoard to board
      var newBoard = board.slice();

      // Base case:
      // If we have n rooks on the board
      if (rooksCount === n) {
        // Board is complete; increment solutionCount
        solutionCount++;
        return;
      }

      // Call iterate on newBoard
      iterate(newBoard, function(square) {
        // If square has a value of 0, set it to 1
        if (!square) {
          square = 1;

          // If there are conflicts, set square back to 0
          if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
            square = 0;
          // Else increment counter and call recurse() again
          } else {
            rooksCount++;
            recurse(newBoard);
          }
        }
      });
    };
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var counter = 0;
  var board = new Board({n: n});

  var recurse = function(board){
    var newBoard = board;
    var matrix = newBoard.rows();
    if (counter === n){
      solution = matrix.slice();
      return;
    }
    for (var row = 0 ; row < n ; row++){
      for (var col = 0 ; col < n ; col++){
        if(matrix[row][col] < 1){
          matrix[row][col] = 1;
          if (newBoard.hasAnyRowConflicts() ||
            newBoard.hasAnyColConflicts() ||
            newBoard.hasAnyMajorDiagonalConflicts() ||
            newBoard.hasAnyMinorDiagonalConflicts()){
            matrix[row][col] = 0;
          } else {
            counter++;
            recurse(newBoard);
          }
        }
      }
    }
  };

  recurse(board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
