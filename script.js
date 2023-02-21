const addMatchButton = document.querySelector(".lws-addMatch");
const allMatchesContainer = document.querySelector(".all-matches");

const matchElement = document.querySelector(".match");
matchElement.id = "match1";
matchElement.setAttribute("data-id", 1);

const reset = document.querySelector(".lws-reset");
const deleteMatch = document.querySelector(".lws-delete");

// initial state
let initialState = [
  {
    id: 1,
    score: 0,
  },
];

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const ADD_MATCH = "ADD_MATCH";
const RESET = "RESET";
const DELETE_MATCH = "DELETE_MATCH";

// actions
const incrementAction = (matchId, payload) => {
  return {
    type: INCREMENT,
    matchId,
    payload: parseInt(payload),
  };
};

const decrementAction = (matchId, payload) => {
  return {
    type: DECREMENT,
    matchId,
    payload: parseInt(payload),
  };
};

const resetAction = () => {
  return {
    type: RESET,
  };
};

const deleteMatchAction = (matchId) => {
  return {
    type: DELETE_MATCH,
    matchId,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      // console.log(action.payload);
      return state.map((match) => {
        if (match.id == action.matchId) {
          return {
            ...match,
            score: match.score + action.payload,
          };
        } else {
          return match;
        }
      });

    case DECREMENT:
      return state.map((match) => {
        if (match.id == action.matchId) {
          const newScore = Math.max(match.score - action.payload, 0);
          return {
            ...match,
            score: newScore,
          };
        } else {
          return match;
        }
      });

    case ADD_MATCH:
      const newMatch = {
        id: state.length + 1,
        score: 0,
      };
      // console.log(deleteMatch);
      return [...state, newMatch];

    case RESET:
      return state.map((match) => {
        const incrementInput = document.querySelector(
          `#match${match.id} .lws-increment`
        );
        const decrementInput = document.querySelector(
          `#match${match.id} .lws-decrement`
        );
        incrementInput.value = "";
        decrementInput.value = "";
        return {
          ...match,
          score: 0,
        };
      });
    case DELETE_MATCH:
      return state.filter((match) => {
        // console.log(match.id);
        // console.log(action.matchId);
        return match.id != action.matchId;
      });
    default:
      return state;
  }
};

// store
const store = Redux.createStore(reducer);

const render = () => {
  const matches = store.getState();

  matches.forEach((match) => {
    const result = document.querySelector(
      `#match${match.id} .lws-singleResult`
    );
    result.innerHTML = match.score;
  });
};

render();

// subscribe
store.subscribe(render);

// dispatch

// increment on input change
allMatchesContainer.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("lws-increment")) {
    if (e.key === "Enter") {
      e.preventDefault();
      const matchId = e.target.closest(".match").getAttribute("data-id");
      // console.log(e.target.value);
      // console.log(matchId);
      store.dispatch(incrementAction(matchId, e.target.value));
    }
  }
});

// decrement on input change
allMatchesContainer.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("lws-decrement")) {
    if (e.key === "Enter") {
      e.preventDefault();
      const matchId = e.target.closest(".match").getAttribute("data-id");
      store.dispatch(decrementAction(matchId, e.target.value));
    }
  }
});

addMatchButton.addEventListener("click", () => {
  // create a new match element
  const newMatchElement = document.createElement("div");
  const matchId = allMatchesContainer.children.length + 1;
  newMatchElement.setAttribute("id", `match${matchId}`);
  newMatchElement.classList.add("match");
  newMatchElement.setAttribute("data-id", matchId);
  newMatchElement.innerHTML = `
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${matchId}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
      </form>
      <form class="decrementForm">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">0</h2>
    </div>
  `;

  // append the new match element to the container
  allMatchesContainer.appendChild(newMatchElement);

  // dispatch the add match action
  store.dispatch({ type: ADD_MATCH });
  const deleteButton = newMatchElement.querySelector(".lws-delete");

  // delete match on button click
  deleteButton.addEventListener("click", (e) => {
    const matchId = e.target.closest(".match").getAttribute("data-id");
    store.dispatch(deleteMatchAction(matchId));
    e.target.closest(".match").remove();
  });
});

// reset scores on button click
reset.addEventListener("click", () => {
  store.dispatch(resetAction());
});

// delete on button click
deleteMatch.addEventListener("click", (e) => {
  console.log("delete");
  e.preventDefault();
  const matchId = e.target.closest(".match").getAttribute("data-id");
  store.dispatch(deleteMatchAction(matchId));
  e.target.closest(".match").remove();
});
