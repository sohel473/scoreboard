This is a simple scoreboard application built using Vanilla Redux. It allows the user to:

Add a new match to the scoreboard
Increment or decrement the score of a match
Delete a match from the scoreboard
Reset all matches to a score of zero
The application uses a Redux store to manage the state of the scoreboard. Each match is represented by an object with an id and a score property. The id property is used to uniquely identify each match.

To add a new match, the user can click the "Add Match" button. This will add a new match element to the scoreboard with an initial score of zero.

To increment or decrement the score of a match, the user can enter a value into the corresponding input field and press "Enter". This will dispatch an action to the Redux store to update the score of the selected match.

To delete a match, the user can click the "Delete" button for the corresponding match element. This will dispatch an action to the Redux store to remove the selected match from the scoreboard.

To reset all matches to a score of zero, the user can click the "Reset" button. This will dispatch an action to the Redux store to reset the score of each match to zero.

This application demonstrates the power and flexibility of Redux in managing complex application state.

Deployment: https://scoreboard-sohel47.netlify.app/
