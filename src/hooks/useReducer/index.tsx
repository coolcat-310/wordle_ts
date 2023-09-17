import { ActionKind, Action, State } from '../../types';

export function gameReducer(state: State, action: Action): State {

    const { disabledSet = [], letterPosition, currentAttempt, todaysWord, gameBoard } = state

    switch(action.type) {
        case ActionKind.WORDS_SET: {
            return { ...state, wordSet: action.payload?.wordSet, todaysWord: action.payload?.todaysWord }
        }

        case ActionKind.ON_ENTER: {
            // is row complete
            if(letterPosition !== 5) return {...state};

            // user has used all attempts
            if(currentAttempt === 5) return {...state, gameOver: true, guessWord: false}

            const currentWord = state.gameBoard[state.currentAttempt].reduce((a, v) => a + v, '');


            // TODO: account when the word is not part of the list.
            if (!state.wordSet?.includes(currentWord.toLowerCase())) {
                return { ...state , isError: true };
              }
            
            if (currentWord.toLowerCase() === todaysWord) {
                return { ...state, gameOver: true, guessWord: true };
              } else {
                const nextAttempt = currentAttempt + 1;
                return { ...state, currentAttempt: nextAttempt, letterPosition: 0, gameOver: nextAttempt === 5 };
              }
            
        }

        case ActionKind.CLEAR_ERROR: {
            return {...state, isError: false }
        }

        case ActionKind.ON_BACKSPACE: {
            
            if(state.letterPosition === 0) return {...state};

            const newBoard = [...gameBoard];
            newBoard[currentAttempt][letterPosition - 1] = "";
            return {
                ...state,
                letterPosition: letterPosition - 1,
            }
            
        }

        case ActionKind.ON_CLICK: {

            if ( letterPosition > 4 ) return {...state};

            if (!action.payload?.keyVal) return {...state};

            const newBoard = [...state.gameBoard];
            newBoard[currentAttempt][letterPosition] = action.payload.keyVal;

            return {
                ...state,
                letterPosition: letterPosition + 1,
                gameBoard: [...newBoard]
            }
        }

        case ActionKind.APPEND_DISABLE_LIST: {
            const disabledLetter = action.payload?.disabledLetter;

            if(!disabledLetter) return {...state};

            const updatedArr = Array.from(new Set([...disabledSet, disabledLetter]));

            return {...state, disabledSet: updatedArr}
        }

        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}