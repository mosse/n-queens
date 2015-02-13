 // Create nxn chessboard
  // Initialize solutionCount to 0
  var board =  new Board({n: n});
  var startingBoard = new Board({n: n});
  var startingMatrix = startingBoard.rows();
  var solutionCount = 0;
  var fresh = false;  //MM added

  // iterate through each element
  //   run toggle piece
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      startingBoard.togglePiece(row, col);
    }
  }

  // iterate through starting points on board
  //   if startingboard element is valid
  //     declare recurse function
  //       toggle starting point on board
  //       iterate through board
  //       base case:
  //         when count === n
  //         increment solutionCount
  //         return
  //       each element test for placement
  //       for each correct placement
  //         toggle on starting board
  //         increment count
  //       toggle starting point on starting board
  //         recurse

  var recurse = function(board) {
    // Base case - we completed a board
    if (rooksCount === n) {
      solutionCount++;
      console.log('solutionCount: ', solutionCount);
      return;
    }

    // Set newBoard to board
    var newBoard = board;
    var newMatrix = newBoard.rows().slice();

    // Set starting point if n is greater than 1
    // We need to get this out if not on new board
    if (n > 1 && fresh) {
      newBoard.togglePiece(startingRow, startingCol);
      rooksCount++;
      fresh = false; // MM added freshcheck
    }

    // Loop over newBoard
    for (var newRow = 0; newRow < n; newRow++) {
      for (var newCol = 0; newCol < n; newCol++) {
        if (newMatrix[newRow][newCol] === 0) {
          newBoard.togglePiece(newRow, newCol);

          if (newBoard.hasAnyRooksConflicts()) {
            newBoard.togglePiece(newRow, newCol);
          } else {
            rooksCount++;
            startingBoard.togglePiece(startingRow, startingCol);
            startingBoard.togglePiece(newRow, newCol);
            recurse(newBoard);
          }
        }
      }
    }
  };

  var refreshBoard = function(board) {
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (board.get(row)[col] === 1) { // MM changed from board.rows()[col] && === 0
          board.togglePiece(row, col); // MM changed from toggle
          fresh = true; //MM added
        }
      }
    }

    return board;
  }

  // Loop over starting point board
  for (var startingRow = 0; startingRow < n; startingRow++) {
    for (var startingCol = 0; startingCol < n; startingCol++) {
      if (startingMatrix[startingRow][startingCol] === 1) { // MM added === 1
        var rooksCount = 0;
        var refreshedBoard = refreshBoard(board);
        recurse(refreshedBoard);
      }
    }
  }

  // Initialize iterate function
  // var iterate = function(workingBoard, iterator){
  //   //var matrix = workingBoard.rows();
  //   for (var row = 0; row < n; row++){
  //     for (var col = 0; col < n; col++){
  //       iterator(workingBoard.get(row)[col]);
  //     }
  //   }
  // };

  // // Call iterator on each square in board
  // iterate(board, function(startingSquare){
  //   // Place 1 at startingSquare (our starting point)
  //   startingSquare = 1;
  //   console.log(board.rows());

  //   // Initialize rooks count to 0
  //   var rooksCount = 0;

  //   // Initialize recurse function
  //   var recurse = function(board){
  //     // Set newBoard to board
  //     var newBoard = board.slice();

  //     // Base case:
  //     // If we have n rooks on the board
  //     if (rooksCount === n) {
  //       // Board is complete; increment solutionCount
  //       solutionCount++;
  //       return;
  //     }

  //     // Call iterate on newBoard
  //     iterate(newBoard, function(square) {
  //       // If square has a value of 0, set it to 1
  //       if (!square) {
  //         square = 1;

  //         // If there are conflicts, set square back to 0
  //         if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()) {
  //           square = 0;
  //         // Else increment counter and call recurse() again
  //         } else {
  //           rooksCount++;
  //           recurse(newBoard);
  //         }
  //       }
  //     });
  //   };
  // });
