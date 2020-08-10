/**
 * Salvo!
 * Built on
 * MakeCode Arcade JavaScript Template v. 2.0
 * Template last update: 20 May 2019 ak
 * (C) 2019 Robo Technical Group LLC
 * MIT license - See README.md
 */

/**
 * Enumerations
 */
// Standard palette
enum Color {
    Transparent, // 0
    White, // 1 = RGB(255, 255, 255)
    Red, // 2 = RGB(255, 33, 33)
    Pink, // 3 = RGB(255, 147, 196)
    Orange, // 4 = RGB(255, 129, 53)
    Yellow, // 5 = RGB(255, 246, 9)
    Aqua, // 6 = RGB(36, 156, 163)
    BrightGreen, // 7 = RGB(120, 220, 82)
    Blue, // 8 = RGB(0, 63, 173)
    LightBlue, // 9 = RGB(135, 242, 255)
    Purple, // 10 = RGB(142, 46, 196)
    RoseBouquet, // 11 = RGB(164, 131, 159)
    Wine, // 12 = RGB(92, 64, 108)
    Bone, // 13 = RGB(229, 205, 196)
    Brown, // 14 = RGB(145, 70, 61)
    Black // 15 = RGB(0, 0, 0)
}   // enum Color

// Game modes
enum GameMode {
    Attract,
    EndGame,
    EndGameBoards,
    EndRound,
    Help,
    NotReady,
    PlayerShotSelect,
    PlayerWait,
    Settings,
    Setup,
    Summary
}   // GameMode

/**
 * Constants
 */
// Omit certain features when running on hardware
const HARDWARE: boolean = control.ramSize() < (1024 * 1024)
const VERSION: string = '2.1'

const BOARD_LOCATIONS: Pixel[] =
    [
        { x: 0, y: 0 },
        { x: 65, y: 0 },
        { x: 0, y: screen.height / 2 },
        { x: 65, y: screen.height / 2 }
    ]
const COLOR_HUMAN: Color = Color.Aqua
const COLOR_AI: Color = Color.Pink
const FLEET_STYLE_DEFAULT: FleetType = FleetType.Standard
const GRID_SIZE_LARGE: number = 10
const GRID_SIZE_MEDIUM: number = 7
const GRID_SIZE_SMALL: number = 5
const LEGEND: LegendItem[] = [
    { color: BOARD_COLOR_HIT, style: LegendType.Filled, data: 'Hit' },
    { color: BOARD_COLOR_MISS, style: LegendType.Filled, data: 'Miss' },
    { color: BOARD_COLOR_SHIP, style: LegendType.Outline, data: 'Ship' },
    { color: PLAYER_COLOR_SHOT_PREVIOUS, style: LegendType.Outline, data: 'Prev' },
    { color: Color.Black, style: LegendType.Outline, data: 'Shot' },
    { color: PLAYER_COLOR_SHOT_CURRENT, style: LegendType.Outline, data: 'Curr' },
    { color: Color.Black, style: LegendType.Outline, data: 'Shot' },
]
const LEGEND_Y: number = 12
const NAME_LENGTH_MAX: number = 10
const NUM_SHOTS_LOCATION: Pixel = { x: 150, y: 100 }
const NUM_SHOTS_LABEL_LOCATION: Pixel = { x: 125, y: 80 }
const PLAYERS_MIN: number = 2
const PLAYERS_MAX: number = 4
const SPLASH_STRINGS: string[][] = [
    ['Salvo! is (C) 2020', 'system32 Packager'],
    ['ROM version', 'v1.0.16'],
    ['by', 'sysdl132'],
    ['Artwork by', 't101'],
    ['Program version', VERSION]]
const SPRITE_SPEED: number = 20
const TEXT_AI_PREFIX: string = 'Computer '
const TEXT_END_GAME_BOARDS: string[] = ['Press', 'any', 'button']
const TEXT_NUM_SHOTS: string[] = ['Shots', 'Left:']
const TEXT_OPTIONS_HEADLINES: string[] = ['Options', '']
const TEXT_PLAYER: string = 'Player'
const TEXT_SPLASH_FOOTER: string = 'Press B button to begin'
const TEXT_SUMMARY_HEADING: string = ' Summary'
const TEXT_SUMMARY_HITS: string = 'Hit'
const TEXT_SUMMARY_INSTRUCTIONS: string[] = ['Press B button to begin', 'next round']
const TEXT_SUMMARY_RESTART: string[] = [
    'A = Show boards', 'B = Start new game']
const TEXT_SUMMARY_MISSES: string = 'Miss'
const TEXT_SUMMARY_ROUND: string = 'Round '
const TEXT_SUMMARY_SHIPS: string = 'Ships Left'
const TEXT_SUMMARY_TURN_ORDER: string = 'Turn order for round '
const TEXT_WAIT_PLAYER: string = "It's your turn!"

/**
 * Global variables
 */
let bg: Image = image.create(screen.width, screen.height)
let currPlayer: number = -1
let currRound: number = 0
let fleetStyle: FleetType = FLEET_STYLE_DEFAULT
let gameMode: GameMode = GameMode.NotReady
let numAi: number = 0
let numHumans: number = 0
let numPlayers: number = 0
let players: Player[] = []
let settingsScreen: OptionScreenCollection
let setupCursor: SetupCursor = {
    player: 0,
    row: 0,
    column: -1,
    size: 1,
    direction: Direction.Horizontal,
    ship: 0
}
let splash: SplashScreens
let turnOrder: number[] = []

/**
 * Main() a.k.a. game.onStart()
 */
startAttractMode()

/**
 * Start game modes
 * 
 * Game mode order:
 * startAttractMode()
 * startSettings()
 * startSetup()
 * startGame()
 * 
 * Game loop:
 *   startSummary()
 *   startRound()
 *   Round loop:
 *     startNextPlayer()
 *     startPlayerShots() - human player only
 */
function startAttractMode(): void {
    buildScreens()
    splash.build()
    gameMode = GameMode.Attract
}   // startAttractMode()

function startEndGame(): void {
    gameMode = GameMode.NotReady
    drawSummary()
    drawEndGame()
    gameMode = GameMode.EndGame
}   // startEndGame()

function startEndGameBoards(): void {
    gameMode = GameMode.NotReady
    drawPlayerBoards()
    gameMode = GameMode.EndGameBoards
}   // startEndGameBoards()

function startGame(): void {
    addOpponents()
    splash.midText.font = image.font8
    splash.footer.data = TEXT_SPLASH_FOOTER
    startSummary()
}   // startGame()

function startNextPlayer(): void {
    currPlayer++
    if (currPlayer >= numPlayers) {
        gameMode = GameMode.EndRound
    } else {
        let player: Player = players[currPlayer]
        if (!player.eliminated && player.playerType === PlayerType.Human) {
            waitForCurrPlayer()
        }   // if (players[currPlayer.playerType === PlayerType.Human])
        gameMode = GameMode.PlayerWait
    }   // if (currPlayer >= numPlayers)
}   // startNextPlayer()

function startPlayerShots(): void {
    gameMode = GameMode.NotReady
    splash.destroySprites()
    Board.destroyCursors()
    drawBoards()
    gameMode = GameMode.PlayerShotSelect
}   // startPlayerShots()

function startRound(): void {
    gameMode = GameMode.NotReady
    for (let player of players) {
        player.startNewRound()
    }   // for (player)
    currRound++
    currPlayer = -1
    startNextPlayer()
}   // startGame()

function startSettings(): void {
    gameMode = GameMode.NotReady
    splash.destroySprites()
    settingsScreen.build()
    gameMode = GameMode.Settings
}   // startSettings()

function startSetup(): void {
    gameMode = GameMode.NotReady
    setupCursor.player = 0
    setupCurrPlayer()
    // Only enter setup mode if there are human players.
    // Otherwise, setupCurrPlayer will automatically send us
    // to summary mode.
    if (numHumans > 0) {
        gameMode = GameMode.Setup
    }   // if (numHumans > 0)
}   // startSetup()

function startSummary(): void {
    gameMode = GameMode.NotReady
    Board.destroyCursors()
    setTurnOrder()
    drawSummary()
    gameMode = GameMode.Summary
}   // startSummary()

/**
 * Game loops
 */
game.onUpdate(function () {
    switch (gameMode) {
        case GameMode.Attract:
            updateSplash()
            break

        case GameMode.EndRound:
            testShots()
            startSummary()
            testEndGame()
            break

        case GameMode.PlayerWait:
            if (players[currPlayer].eliminated) {
                startNextPlayer()
            } else if (players[currPlayer].playerType === PlayerType.Computer) {
                takeAiTurn()
                startNextPlayer()
            } else {
                updateSplash()
            }   // if (players[currPlayer].eliminated)
            break

        case GameMode.Settings:
            if (game.runtime() >= settingsScreen.nextTime) {
                settingsScreen.rotate()
            }   // if (game.runtime() >= settingsScreen.nextTime)
            break
    }   // switch (gameMode)
})  // game.onUpdate()

/**
 * Controller events
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    switch (gameMode) {
        case GameMode.Attract:
            startSettings()
            break

        case GameMode.EndGame:
            startEndGameBoards()
            break

        case GameMode.EndGameBoards:
            startEndGame()
            break

        case GameMode.PlayerShotSelect:
            players[currPlayer].registerShot(bg)
            if (players[currPlayer].shotsRemaining > 0) {
                updateShotsRemaining()
            } else {
                startNextPlayer()
            }   // if (players[currPlayer].shotsRemaining)
            break

        case GameMode.Settings:
            settingsScreen.select()
            if (settingsScreen.done) {
                numHumans = settingsScreen.getSelectionForScreen(0, 0)
                numAi = settingsScreen.getSelectionForScreen(0, 1)
                numPlayers = numHumans + numAi
                if (numPlayers < PLAYERS_MIN || numPlayers > PLAYERS_MAX) {
                    if (numPlayers < PLAYERS_MIN) {
                        game.splash('Must have at least ' + PLAYERS_MIN + ' players.')
                    } else {
                        game.splash('Cannot have more than ' + PLAYERS_MAX + ' players.')
                    }   // if (numPlayers < PLAYERS_MIN)
                    settingsScreen.done = false
                }   // if (numPlayers < PLAYERS_MIN || numPlayers > PLAYERS_MAX)
            }   // if (settingsScreen.done)
            if (settingsScreen.done) {
                startSetup()
            }   // if (settingsScreen.done)
            break

        case GameMode.Setup:
            if (players[setupCursor.player].board.setShip(setupCursor.ship, setupCursor.column,
                setupCursor.row, setupCursor.direction)) {
                setupCursor.ship++
                if (setupCursor.ship >= players[setupCursor.player].board.ships.length) {
                    // No ships left to place; move on to the next player.
                    players[setupCursor.player].board.hideCursor()
                    setupCursor.player++
                    setupCurrPlayer()
                } else {
                    setupCursor.column = 0
                    setupCursor.row = 0
                    setupCursor.direction = Direction.Horizontal
                    setupCursor.size = players[setupCursor.player].board.ships[setupCursor.ship].size
                    players[setupCursor.player].drawSetup(bg)
                }   // if (setupCursor.ship >= players[setupCursor.player].board.ships.length)
            } else {
                game.splash('Ships cannot overlap.')
            }   // if (players[setupCursor.player].board.setShip(...))
            break
    }   // switch (gameMode)
})  // controller.A.onEvent()

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    switch (gameMode) {
        case GameMode.Attract:
            startSettings()
            break

        case GameMode.EndGame:
            game.reset()
            break

        case GameMode.EndGameBoards:
            startEndGame()
            break

        case GameMode.PlayerWait:
            startPlayerShots()
            break

        case GameMode.Setup:
            changeSetupCursorDirection()
            break

        case GameMode.Summary:
            startRound()
            break
    }   // switch (gameMode)
})  // controller.B.onEvent()

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorKeyPress(0, 1)
})  // controller.down.onEvent()

controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    switch (gameMode) {
        case GameMode.PlayerShotSelect:
        case GameMode.Setup:
            cursorKeyPress(0, 1)
            break
    }   // switch (gameMode)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorKeyPress(-1, 0)
})  // controller.left.onEvent()

controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    switch (gameMode) {
        case GameMode.PlayerShotSelect:
        case GameMode.Setup:
            cursorKeyPress(-1, 0)
            break
    }   // switch (gameMode)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorKeyPress(1, 0)
})  // controller.right.onEvent()

controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    switch (gameMode) {
        case GameMode.PlayerShotSelect:
        case GameMode.Setup:
            cursorKeyPress(1, 0)
            break
    }   // switch (gameMode)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorKeyPress(0, -1)
})  // controller.up.onEvent()

controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    switch (gameMode) {
        case GameMode.PlayerShotSelect:
        case GameMode.Setup:
            cursorKeyPress(0, -1)
            break
    }   // switch (gameMode)
})

/**
 * Other functions
 */
/**
 * Add opponent tracking boards to each player.
 */
function addOpponents(): void {
    for (let playerId: number = 0; playerId < players.length; playerId++) {
        for (let opponentId: number = 0; opponentId < players.length; opponentId++) {
            if (playerId !== opponentId) {
                let opponent: Player = players[opponentId]
                players[playerId].addOpponent(opponentId, opponent.name, opponent.playerType,
                    opponent.color)
            }   // if (playerId !== opponentId)
        }   // for (opponent)
    }   // for (player)
}   // addOpponents()

/**
 * Build the splash and settings screens.
 */
function buildScreens(): void {
    // Use common canvas with splash screens, also
    RotatingScreens.canvas = bg
    buildSplashScreen()
    buildSettingsScreen()
}   // buildScreens()

function buildSettingsScreen(): void {
    let headlines: string[][] = []
    headlines.push(TEXT_OPTIONS_HEADLINES)
    for (let s of SPLASH_STRINGS) {
        headlines.push(s)
    }   // for (s)
    settingsScreen = new OptionScreenCollection(
        ['Salvo!'], Color.Yellow,
        headlines, Color.Brown
    )
    settingsScreen.titles.font = image.font8
    settingsScreen.headlines.font = image.font5
    settingsScreen.footer.font = image.font5
    settingsScreen.doneText = 'Start!'
    settingsScreen.addScreen('Players',
        [['Human', '0 players', '1 player', '2 players', '3 players', '4 players'],
        ['Computer', '0 players', '1 player', '2 players', '3 players', '4 players']],
        true)
    // Default settings: two human players, no AI players.
    settingsScreen.setSelectionForScreen(0, 0, 2)
    settingsScreen.setSelectionForScreen(0, 1, 0)
}   // buildSettingsScreen()

function buildSplashScreen(): void {
    splash = new SplashScreens(
        ['Salvo!'], Color.Yellow,
        SPLASH_STRINGS, Color.Brown,
        [['Up to four', 'human or computer', 'players']], Color.LightBlue
    )
    splash.movingSpriteOptions.mode = SpriteMode.BlankSpace
    splash.movingSpriteOptions.speed = SPRITE_SPEED
    splash.movingSpriteOptions.dir = SpriteDirection.PointsLeft
    splash.addMovingSprite(SHIP_IMAGES[ShipImage.Battleship])
    splash.addMovingSprite(SHIP_IMAGES[ShipImage.Carrier])
    splash.sequentialSprites = false
}   // buildSplashScreen()

/**
 * Rotate the cursor when placing ships.
 */
function changeSetupCursorDirection(): void {
    if (setupCursor.direction === Direction.Horizontal) {
        setupCursor.direction = Direction.Vertical
        if (setupCursor.row > BOARD_SIZE - setupCursor.size) {
            setupCursor.row = BOARD_SIZE - setupCursor.size
        }   // if (setupCursor.row > BOARD_SIZE - setupCursor.size)
    } else {
        setupCursor.direction = Direction.Horizontal
        if (setupCursor.column > BOARD_SIZE - setupCursor.size) {
            setupCursor.column = BOARD_SIZE - setupCursor.size
        }   // if (setupCursor.column > BOARD_SIZE - setupCursor.size)
    }   // if (setupCursor.direction === Direction.Horizontal)
    players[setupCursor.player].board.buildCursor(setupCursor.size,
        setupCursor.direction)
    players[setupCursor.player].board.showCursor(setupCursor.column, setupCursor.row)
}   // changeSetupCursorDirection()

/**
 * Common function for handling D-pad keys.
 */
function cursorKeyPress(colChange: number, rowChange: number): void {
    switch (gameMode) {
        case GameMode.Attract:
            startSettings()
            break

        case GameMode.EndGameBoards:
            startEndGame()
            break

        case GameMode.PlayerShotSelect:
            players[currPlayer].moveCursor(colChange, rowChange)
            break

        case GameMode.Settings:
            switch (colChange) {
                case -1:
                    settingsScreen.moveCursorLeft()
                    break

                case 0:
                    if (rowChange === 1) {
                        settingsScreen.moveCursorDown()
                    } else {
                        settingsScreen.moveCursorUp()
                    }   // if (rowChange === 1)
                    break

                case 1:
                    settingsScreen.moveCursorRight()
                    break
            }   // switch colChange
            break

        case GameMode.Setup:
            moveSetupCursor(colChange, rowChange)
            break
    }   // switch (gameMode)
}   // cursorKeyPress()

/**
 * Draw the boards on the screen for shot selection.
 */
function drawBoards(): void {
    bg.fill(Color.Black)

    // Draw opponent boards
    let player: Player = players[currPlayer]
    let location: Pixel
    for (let opponent: number = 0; opponent < numPlayers - 1; opponent++) {
        location = BOARD_LOCATIONS[opponent]
        player.drawOpponent(bg, opponent, location.x, location.y, GRID_SIZE_SMALL)
    }   // for (opponent)

    // Draw player board last
    location = BOARD_LOCATIONS[numPlayers - 1]
    player.drawBoard(bg, location.x, location.y, GRID_SIZE_SMALL)
    player.drawPreviousShots(bg)

    // Draw legend
    let currY: number = LEGEND_Y
    for (let item of LEGEND) {
        if (item.style === LegendType.Filled) {
            bg.fillRect(NUM_SHOTS_LABEL_LOCATION.x, currY, 5, 5, item.color)
        } else {
            bg.drawRect(NUM_SHOTS_LABEL_LOCATION.x, currY, 5, 5, item.color)
        }   // if (item.style === LegendType.Filled)
        bg.print(item.data, NUM_SHOTS_LABEL_LOCATION.x + 6, currY, Color.Yellow, image.font5)
        currY += 7
    }   // for (item)

    // Draw shots indicator
    currY = NUM_SHOTS_LABEL_LOCATION.y
    for (let s of TEXT_NUM_SHOTS) {
        bg.print(s, NUM_SHOTS_LABEL_LOCATION.x, currY, Color.Yellow, image.font5)
        currY += 6
    }   // for (s)
    updateShotsRemaining()
    player.showCursor()
}   // drawBoards()

/**
 * Updates the summary screen to indicate it's the end of the game.
 */
function drawEndGame(): void {
    let font: image.Font = image.font8
    let currY: number = screen.height - (TEXT_SUMMARY_RESTART.length * (font.charHeight + 1) + 1)
    bg.fillRect(0, currY, screen.width, screen.height - currY, Color.Black)
    for (let s of TEXT_SUMMARY_RESTART) {
        bg.printCenter(s, currY, Color.White, font)
        currY += font.charHeight + 1
    }   // for (s)
    // Erase the line describing turn order
    bg.fillRect(0, 10, screen.width, 8, Color.Black)
}   // drawEndGame()

/**
 * Draw player boards at the end of the game.
 */
function drawPlayerBoards(): void {
    bg.fill(Color.Black)
    for (let index: number = 0; index < players.length; index++) {
        let player: Player = players[index]
        let location: Pixel = BOARD_LOCATIONS[index]
        player.drawBoard(bg, location.x, location.y, GRID_SIZE_SMALL, player.name)
    }   // for (index)
    let font: image.Font = image.font8
    let currY: number = LEGEND_Y
    for (let s of TEXT_END_GAME_BOARDS) {
        bg.print(s, NUM_SHOTS_LABEL_LOCATION.x, currY, Color.Yellow, font)
        currY += font.charHeight + 1
    }   // for (s)
}   // drawPlayerBoards()

/**
 * Draw the summary screen at the end of a round.
 */
function drawSummary(): void {
    bg.fill(Color.Black)
    bg.printCenter(TEXT_SUMMARY_TURN_ORDER + (currRound + 1) + ":", 10, Color.Brown, image.font8)
    bg.print(TEXT_PLAYER, 0, 28, Color.White, image.font5)
    bg.print(TEXT_SUMMARY_SHIPS, PLAYER_X_COORD_SUMMARY_SHIPS, 28, PLAYER_COLOR_SUMMARY_SHIPS, image.font5)
    if (currRound > 0) {
        bg.printCenter(TEXT_SUMMARY_ROUND + currRound + TEXT_SUMMARY_HEADING, 0, Color.White, image.font8)
        bg.print(TEXT_SUMMARY_HITS, PLAYER_X_COORD_SUMMARY_HITS - 12, 28, PLAYER_COLOR_SUMMARY_HITS, image.font5)
        bg.print(TEXT_SUMMARY_MISSES, PLAYER_X_COORD_SUMMARY_HITS + 7, 28, PLAYER_COLOR_SUMMARY_MISSES, image.font5)
    }   // if (currRound > 0)
    bg.drawLine(0, 37, screen.width, 37, Color.RoseBouquet)
    let currY: number = 40
    for (let playerId of turnOrder) {
        players[playerId].drawSummary(bg, currY, currRound > 0)
        currY += 12
    }   // for (playerId)
    let font: image.Font = image.font8
    currY = screen.height - (TEXT_SUMMARY_INSTRUCTIONS.length * (font.charHeight + 1) + 1)
    for (let s of TEXT_SUMMARY_INSTRUCTIONS) {
        bg.printCenter(s, currY, Color.White, font)
        currY += font.charHeight + 1
    }   // for (s)
}   // drawSummary()

/**
 * Move the cursor when placing ships.
 */
function moveSetupCursor(column: number = 0, row: number = 0): void {
    setupCursor.column += column
    setupCursor.row += row
    if (setupCursor.column < 0) {
        if (setupCursor.direction === Direction.Horizontal) {
            setupCursor.column = BOARD_SIZE - setupCursor.size
        } else {
            setupCursor.column = BOARD_SIZE - 1
        }   // if (setupCursor.direction === Direction.Horizontal)
    }   // if (setupCursor.column < -1)
    if (setupCursor.column >= BOARD_SIZE
        || (setupCursor.direction === Direction.Horizontal && setupCursor.column > BOARD_SIZE - setupCursor.size)) {
        setupCursor.column = 0
    }   // if (setupCursor.column >= BOARD_SIZE)
    if (setupCursor.row < 0) {
        if (setupCursor.direction === Direction.Vertical) {

        } else {
            setupCursor.row = BOARD_SIZE - 1
        }   // if (setupCursor.direction === Direction.Vertical)
    }   // if (setupCursor.row < 0)
    if (setupCursor.row >= BOARD_SIZE) {
        setupCursor.row = 0
    }   // if (setupCursor.row >= BOARD_SIZE
    players[setupCursor.player].board.showCursor(setupCursor.column, setupCursor.row)
}   // moveSetupCursor()

/**
 * Register a defeated player to all players.
 */
function registerDefeat(id: number): void {
    for (let player of players) {
        player.registerDefeat(id)
    }   // for (player)
}   // registerDefeat()

/**
 * Register a hit to all players.
 */
function registerHit(shot: Shot): void {
    for (let player of players) {
        player.registerHit(shot)
    }   // for (player)
}   // registerHit()

/**
 * Register a sunken ship to all players.
 */
function registerShip(id: number, ship: Ship): void {
    for (let player of players) {
        player.registerShip(id, ship)
    }   // for (player)
}   // registerShip()

/**
 * Initialize a player object.
 */
function setupCurrPlayer(): void {
    if (setupCursor.player < numHumans) {
        // Setup a human player
        let name: string =
            HARDWARE
                ? TEXT_PLAYER + ' ' + (setupCursor.player + 1)
                : game.askForString(TEXT_PLAYER + ' ' + (setupCursor.player + 1) +
                    ': Enter your name', NAME_LENGTH_MAX)
        let player: Player = new Player(setupCursor.player, name, COLOR_HUMAN, PlayerType.Human)
        player.board.buildFleet(fleetStyle)
        player.updateFleetSize()
        players.push(player)
        player.drawSetup(bg)
        setupCursor.column = 0
        setupCursor.row = 0
        setupCursor.direction = Direction.Horizontal
        setupCursor.size = player.board.ships[0].size
        setupCursor.ship = 0
    } else {
        // Setup AI players
        for (let ai: number = 0; ai < numAi; ai++) {
            let aiPlayer: Player = new Player(
                setupCursor.player, TEXT_AI_PREFIX + (ai + 1), COLOR_AI, PlayerType.Computer)
            aiPlayer.board.randomizeFleet(fleetStyle)
            aiPlayer.updateFleetSize()
            players.push(aiPlayer)
            setupCursor.player++
        }   // for (ai)
        startGame()
    }   // if (player < numHumans)
}   // setupPlayer()

/**
 * Set the turn order for the next round.
 * Currently just lists the players in the order created.
 * Could change to randomize each round.
 */
function setTurnOrder(): void {
    turnOrder = []
    for (let id: number = 0; id < players.length; id++) {
        turnOrder.push(id)
    }   // for (id)
}   // setTurnOrder()

/**
 * The AI currently takes random shots.
 * Could be altered to be more intelligent.
 * Properties that might be useful:
 *   - ai.opponents - Array of Opponent objects
 *     - ai.opponents[index].board - Tracking board for opponent
 *     - ai.opponents[index].board.getStatus(column, row) - Status of a cell in the tracking board
 *   - ai.previousShots - Array of Shot objects from the previous round
 */
function takeAiTurn(): void {
    let ai: Player = players[currPlayer]
    while (ai.shotsRemaining > 0) {
        // Just take random shots
        ai.addAiShot(
            Math.randomRange(0, numPlayers - 2),
            Math.randomRange(0, BOARD_SIZE - 1),
            Math.randomRange(0, BOARD_SIZE - 1)
        )
    }   // while (ai.shotsRemaining)
}   // takeAiTurn()

/**
 * Test for end of game.
 */
function testEndGame(): void {
    let survivors: number = 0
    for (let player of players) {
        if (!player.eliminated) {
            survivors++
        }   // if (! player.eliminated)
    }   // for (player)

    if (survivors < 2) {
        if (survivors === 1) {
            music.powerUp.play()
            effects.confetti.startScreenEffect(1000)
        } else {
            music.wawawawaa.play()
        }   // if (survivors === 1)
        drawEndGame()
        gameMode = GameMode.EndGame
    }   // if (survivors < 2)
}   // testEndGame()

/**
 * Check the shots at the end of the round and update player trackers.
 */
function testShots(): void {
    for (let player of players) {
        for (let shot of player.shots) {
            switch (players[shot.opponentId].getStatus(shot.column, shot.row)) {
                case Status.Hit:
                case Status.Occupied:
                    shot.status = Status.Hit
                    registerHit(shot)
                    break

                default:
                    shot.status = Status.Miss
                    break
            }   // switch (players[shot.opponentId]...)
        }   // for (shot)
        player.updateBoards()
    }   // for (player)

    for (let player of players) {
        let sunkenShips: Ship[] = player.sunkenShips
        for (let ship of sunkenShips) {
            registerShip(player.id, ship)
        }   // for (ship)
        if (player.eliminated) {
            registerDefeat(player.id)
        }   // if (player.eliminated)
    }   // for (player)
}   // testShots()

/**
 * Update the Shots Remaining indicator when firing shots.
 */
function updateShotsRemaining(): void {
    let x: number = NUM_SHOTS_LOCATION.x
    let y: number = NUM_SHOTS_LOCATION.y
    let w: number = 10
    let h: number = 10
    bg.fillRect(x, y, w, h, Color.Black)
    bg.print('' + players[currPlayer].shotsRemaining, x, y, Color.Yellow, image.font8)
}   // updateShotsRemaining()

/**
 * Update the splash screen.
 */
function updateSplash(): void {
    if (game.runtime() >= splash.nextTime) {
        splash.rotate()
    }   // if (game.runtime() >= splash.nextTime)
    if (sprites.allOfKind(SpriteType.Moving).length === 0) {
        splash.showScrollingSprite()
    }   // if (sprites.allOfKind(...))
}   // updateSplash()

/**
 * Show the splash screen before a player's turn.
 */
function waitForCurrPlayer(): void {
    let p: Player = players[currPlayer]
    splash.instructions = [[p.name, TEXT_WAIT_PLAYER]]
    splash.build()
}   // waitForCurrPlayer()

loops.forever(function () {
    loops.pause(100)
    console.log("I info system Modify eeprom...")
    console.log("I info system Done with 0")
    loops.pause(1000)
    console.log("S system system Start from read...")
})
music.magicWand.play()
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 . . . 7 . . . 5 5 . . 
    . . 5 . . . . . . 7 . . 8 . 5 . 
    . . 5 . . 7 7 7 7 7 7 . . . 5 . 
    . 5 . . . . . . . 7 . . 8 . . 5 
    . 5 . . . . . . 7 . . . 8 . . 5 
    . 5 . . . 1 . . . . . . . . . 5 
    . 5 . . 1 . 1 . 5 5 5 5 5 5 . 5 
    . 5 . 1 . . . 1 . 2 2 2 2 . . 5 
    . 5 . 1 . . . 1 . . 2 2 . . . 5 
    . 5 . 1 1 1 1 1 . . e e 7 . . 5 
    . . 5 1 . . . 1 . 7 e e . . 5 . 
    . . 5 . . . . . . . e e . . 5 . 
    . . . 5 5 . . . . . e e 5 5 . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    `)
music.setVolume(128)
effects.bubbles.startScreenEffect(2500)