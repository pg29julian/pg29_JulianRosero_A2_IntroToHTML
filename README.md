# pg29_JulianRosero_A2_IntroToHTML

Implemented by: PG29 - Julian Rosero
Last Updated -> 10/20/2025

## About HTML Implementation

The page uses a simple structure, contains a header, a main content space and a foteer. Each section is divided in a <div> tag and makes use of its respective tags and classes to diferentiate the page regions.

## About CSS Implementation

The page style is based on Tron Legacy and overall neon style, these are some remarkable designs in the code:

- Background is implemented to appear as "the grid", using two linear-gradients.
- All page boxes and buttons are implemented to appear as classic mineswepper style boxes but make use of the color pallete of Tron.
- Shadows in texts are used to give the sensation of Neon lights.

## About JavaScript Implementation

### Libraries:

- gameEngine: creates instances of all game components, no initialization is needed as the components auto initialize in the beginner difficulty

### Modules:

-  gameLogic: handles level initialization, reset and calls interactions in gameBoard.
-  gameBoard: handles the board creation, set up and logic, is initialized by the gameLogic module.
-  userInput: handles user interaction with the page and the game board.
