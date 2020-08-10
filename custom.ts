/**
 * Salvo! library
 * (C) 2019 Robo Technical Group LLC
 * MIT license. See README.md.
 */

/**
 * Enumerations
 */
// Ship directions
enum Direction {
    Horizontal,
    Vertical
}   // enum Direction

// Fleet configurations
enum FleetType {
    // Standard Salvo configuration
    Standard,
    // Classic Battleship configuration
    Classic,
    // Modern Battleship configuration
    Modern
}   // enum FleetType

// Legend indicator types
enum LegendType {
    Filled,
    Outline
}   // LegendType

enum PlayerType {
    Computer,
    Human
}   // enum PlayerType

// Indices for the SHIP_IMAGES constant
enum ShipImage {
    Carrier = 0,
    Battleship,
    Cruiser,
    Destroyer,
    Submarine,
    PatrolBoat
}   // ShipImages

// Shot status
enum Status {
    Empty,
    Unknown,
    Miss,
    Hit,
    Occupied
}   // Status

/**
 * Constants
 */
const BOARD_SIZE: number = 10
const BOARD_CURSOR_SPRITE_KIND = 42
const BOARD_COLOR_HIT: number = 2 // Red
const BOARD_COLOR_OCCUPIED: number = 12 // Wine
const BOARD_COLOR_MISS: number = 1 // White
const BOARD_COLOR_SHIP: number = 3 // Pink
const PLAYER_SETUP_GRID_SIZE: number = 8
const PLAYER_COLOR_SHOT_CURRENT: number = 1 // White
const PLAYER_COLOR_SHOT_PREVIOUS: number = 6 // Aqua
const PLAYER_COLOR_SUMMARY_ELIMINATED: number = 5 // Yellow
const PLAYER_COLOR_SUMMARY_HITS: number = 2 // Red
const PLAYER_COLOR_SUMMARY_MISSES: number = 1 // White
const PLAYER_COLOR_SUMMARY_SHIPS: number = 6 // Aqua
const PLAYER_X_COORD_SUMMARY_ELIMINATED: number = 105
const PLAYER_X_COORD_SUMMARY_NAME: number = 1
const PLAYER_X_COORD_SUMMARY_HITS: number = 65
const PLAYER_X_COORD_SUMMARY_MISSES: number = 80
const PLAYER_X_COORD_SUMMARY_SHIPS: number = 95


const SHIP_IMAGES: Image[] = [
    // Carrier
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 9 9 9 9 1 9 9 9 9 9 9 1 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f
        9 9 9 9 1 1 9 9 9 9 9 1 1 9 9 9 9 9 9 9 9 9 9 9 b 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 b b 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 b b b 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c c c c c c c 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 1 1 c c 9 9 9 9 9 9 9
        9 9 9 9 9 1 9 9 9 1 9 9 9 9 9 9 9 9 9 9 c c c c c 9 9 9 9 9 9 9
        9 9 9 1 1 9 9 1 1 9 9 9 9 9 c c c c c c c f f f 5 5 f f f b 5 9
        c c f f f 5 f f f 5 f f b c b b f f f f 5 5 f f f f f b b c c 9
        8 8 c b b b b b b b b b c c c b b b b b b b b b b b b c c c c 8
        8 8 8 c c c c c c c c c c c c c c c c c c c c c c c c c c 8 8 8
        8 1 8 8 c c c c c c c c c c c c b b b c c c c c c c c c 1 1 1 1
        8 8 1 8 8 8 8 8 1 1 1 1 1 8 8 8 8 8 8 1 1 1 1 1 1 1 1 1 8 8 8 8
        f 8 8 8 1 1 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `,
    // Battleship
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 5 9 9 9 9 9 9 9 f
        9 9 5 9 9 9 9 9 9 9 9 9 9 9 9 c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 5 9 9 9 9 9 9 9 9 9 c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 5 9 9 9 9 9 9 9 9 9 9 c c c 9 9 9 9 9 5 9 9 9 9 9 9 9 9
        9 9 9 9 9 b 9 9 9 5 9 9 9 9 c 1 1 c 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 b b 9 9 b 9 9 c 1 1 b b c 9 9 9 b 5 b 9 9 9 9 9 9 9
        9 9 c b b b b b b 9 9 b b c c c c b b c 9 c b b b c c c c c 9 9
        9 9 9 c c c c 1 c 1 b b c c c c c c c f c c c f c c c c 9 9 9 9
        9 9 9 9 f f f 1 f 1 f f f f f f f f f f f f f f f f f 9 9 9 9 9
        8 8 8 8 8 8 c c c c c c c c c c c c c c c c c c c 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `,
    // Cruiser
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 5 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 5 9 9 9 9 9 9 9 9 9 c c c 9 9 9 9 c c 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c 9 9 9 9 9 9 c 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 5 9 9 9 9 9 9 9 c c c 9 9 9 9 c c 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 b b b b b 9 9 9 b d c 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 d 9 9 9 9 9 1 1 1 b b b f f b b b d c 9 9 9 9 9 9
        9 9 9 c c c c c c c c b c b b b b b b b b b b b b b c 9 1 1 1 9
        9 9 9 9 9 c c c c c c c c c c c c c c c c c c c c c c 1 9 9 9 9
        8 8 8 8 8 1 1 c c c c c c c 1 1 1 1 1 1 1 1 1 1 1 1 1 8 8 8 8 8
        8 8 8 8 8 8 8 1 1 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 1 1 1 8 8 8
        8 8 8 8 8 8 8 8 8 8 1 1 1 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 1 1 1
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `,
    // Destroyer
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f
        9 9 9 9 9 9 9 9 9 9 9 9 c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 b c b 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 c 9 9 9 9 c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 c b c 9 c c b 1 1 c c b 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 c b b b b b b c c c c c c c c c c c c 9 c c c c 9 9 9 9
        9 9 9 c c b c c c c c c f b b f b b f b b f c c b b b c 9 1 9 9
        8 8 8 c b b 1 1 1 b b b b b b b b b b b b b b b b b c 1 1 8 8 8
        8 1 1 1 1 1 c c c c c c c c c c c c c c c c 1 1 1 1 1 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `,
    // Submarine
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c c c c 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c c 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c c c c 9 9 9 9 9 9 9 9 9 9
        8 8 8 8 8 c b c c c b b b b b c c c c f f c c 8 8 8 8 8 8 8 8 8
        8 8 8 1 c b c c c c c c c c c c c c c c c c c c c 1 8 8 1 8 8 8
        8 8 8 8 1 1 1 1 1 1 8 8 8 8 8 1 1 1 1 1 1 1 8 1 1 8 8 8 1 8 8 8
        8 1 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 1 8 8 8 8
        8 8 1 1 1 8 8 8 8 1 1 1 1 1 1 1 1 1 1 8 8 8 8 8 1 1 1 8 8 8 8 8
        f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `,
    // Patrol Boat
    img`
        f f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f f
        f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 f
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 b b b b 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 b 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 b b b 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 b b 9 9 9 9 9 9 1 1 1 b b 9 b 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 c f f f f f f 9 b b b b b b b f f f 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 c b c b c b f f c f f f f f f b c 9 9 9 9 9 9 9 9 9
        8 8 8 8 8 8 1 1 c c c c c f f c c c c c c c c 1 1 1 1 1 1 8 8 8
        8 8 8 8 8 8 8 8 1 1 1 1 8 8 8 8 8 8 8 1 1 1 1 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 1 1 8 8 8 8 8 8 8 8 1 1 8 1 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f
        f f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 f f
    `
]

/**
 * Interfaces
 */
interface GameCursor {
    column: number
    player: number
    row: number
}   // interface Cursor

interface LegendItem {
    color: number
    data: string
    style: LegendType
}   // interface LegendItem

interface Opponent {
    board: Board
    color: number
    id: number
    kind: PlayerType
    name: string
}   // interface Opponent

interface Pixel {
    x: number
    y: number
}   // interface Pixel

interface SetupCursor extends GameCursor {
    direction: Direction
    ship: number
    size: number
}   // interface SetupCursor

interface Shot {
    column: number
    opponentId: number
    opponentIndex: number
    row: number
    status: Status
}   // Shot

/**
 * Represents a tracking board for the player and opponents.
 */
class Board {
    private static readonly COLOR_CURSOR_BORDER: number = 5 // Yellow
    private static readonly COLOR_CURSOR_FILL: number = 0 // Transparent
    private static readonly COLOR_EMPTY: number = 15 // Black
    private static readonly COLOR_GRID: number = 12 // Wine
    private static readonly TEXT_ELIM: string = 'Defeated'

    private _board: Status[][]
    private _cols: number // Number of columns in board
    private _cursor: Sprite
    private _eliminated: boolean
    private _fleet: Fleet
    private _gridSize: number // Grid size when last drawn
    private _rows: number // Number of rows in board
    private _x: number  // Upper-left horizontal coordinate when last drawn
    private _y: number  // Upper-left vertical coordinate when last drawn

    /**
     * Constructor
     * @param {number} columns - Number of columns in the board
     * @param {number} rows - Number of rows in the board
     */
    constructor(columns: number, rows: number) {
        this._board = []
        this._cols = columns
        this._cursor = null
        this._eliminated = false
        this._fleet = new Fleet()
        this._gridSize = 0
        this._rows = rows
        this._x = 0
        this._y = 0
        for (let row: number = 0; row < rows; row++) {
            let currRow: Status[] = []
            for (let col: number = 0; col < columns; col++) {
                currRow[col] = Status.Empty
            }   // for (col)
            this._board.push(currRow)
        }   // for (row)
    }   // constructor()

    /**
     * Getters / setters
     */
    //% callInDebugger
    public get eliminated(): boolean {
        return this._eliminated
    }   // get eliminated()

    public set eliminated(value: boolean) {
        this._eliminated = value
    }   // set eliminated()

    //% callInDebugger
    public get ships(): Ship[] {
        return this._fleet.ships
    }   // get ships()

    /**
     * Public methods
     */
    /**
     * Add a ship to the fleet.
     */
    public addShip(value: Ship): void {
        this._fleet.ships.push(value)
    }   // addShip()

    /**
     * Create a sprite to represent the cursor to select a cell in the board.
     */
    public buildCursor(cursorSize: number = 1, cursorDir?: Direction): void {
        if (!cursorDir) {
            cursorDir = Direction.Horizontal
        }   // if (! cursorDir)
        let narrow: number = this._gridSize + 1
        let wide: number = this._gridSize * cursorSize + 1
        let cursorImg: Image
        if (cursorDir === Direction.Horizontal) {
            cursorImg = image.create(wide, narrow)
        } else {
            cursorImg = image.create(narrow, wide)
        }   // if (cursorDir === Direction.Horizontal)
        cursorImg.fill(Board.COLOR_CURSOR_FILL)
        cursorImg.drawRect(0, 0, cursorImg.width, cursorImg.height, Board.COLOR_CURSOR_BORDER)
        if (this._cursor) {
            this._cursor.destroy()
        }   // if (cursor)
        this._cursor = sprites.create(cursorImg, BOARD_CURSOR_SPRITE_KIND)
        this._cursor.setFlag(SpriteFlag.Ghost, true)
    }   // buildCursor()

    /**
     * Create a fleet of the given type.
     */
    public buildFleet(style: FleetType): void {
        this._fleet.build(style)
    }   // buildFleet()

    /**
     * Draw a border around a cell to show that it has not been selected.
     */
    public deselectCell(img: Image, column: number, row: number): void {
        this.highlightCell(img, column, row, Board.COLOR_GRID)
    }   // deselectCell()

    /**
     * Destroy all cursor sprites in the game.
     */
    public static destroyCursors(): void {
        sprites.allOfKind(BOARD_CURSOR_SPRITE_KIND).forEach(function (value: Sprite, index: number) {
            value.destroy()
        })
    }   // destroyCursors()

    /**
     * Draw the board on an image.
     * @param {Image} img - Canvas for drawing the board.
     * @param {number} x - Horizontal coordinate where the top-left of the board will be located.
     * @param {number} y - Vertical coordinate where the top-left of the board will be located.
     * @param {number} gridSize - Size of the grid boxes.
     * @param {number} cursorSize - Number of boxes in the grid that the cursor will surround.
     * @param {number} cursorDir - Direction of the cursor (only matters if cursorSize > 1)
     */
    public draw(img: Image, x: number, y: number, gridSize: number,
        cursorSize: number = 1, cursorDir?: Direction): void {
        this.initDraw(img, x, y, gridSize)
        this.drawGrid(img)
        this.fillGrid(img)
        this.drawFleet(img)
        this.drawEliminated(img)
        this.buildCursor(cursorSize, cursorDir)
        this.hideCursor()
    }   // draw()

    /**
     * Draw indicator if player is eliminated.
     */
    public drawEliminated(img: Image): void {
        if (this._eliminated) {
            let font: image.Font = image.font5
            let h: number = this._x + this._cols * this._gridSize / 2 -
                font.charWidth * Board.TEXT_ELIM.length / 2 - 1
            let v: number = this._y + this._rows * this._gridSize / 2 -
                font.charHeight / 2 - 1
            img.fillRect(h, v, font.charWidth * Board.TEXT_ELIM.length + 2,
                font.charHeight + 2, Board.COLOR_EMPTY)
            img.print(Board.TEXT_ELIM, h + 1, v + 1, Board.COLOR_CURSOR_BORDER, font)
        }   // if (this._eliminated)
    }   // drawEliminated()

    /**
     * Highlight ships in fleet.
     */
    public drawFleet(img: Image): void {
        for (let ship of this._fleet.ships) {
            if (ship.location.column > -1 && ship.location.row > -1) {
                let h: number = this._x + ship.location.column * this._gridSize
                let v: number = this._y + ship.location.row * this._gridSize
                let width: number
                let height: number
                if (ship.direction === Direction.Horizontal) {
                    height = this._gridSize + 1
                    width = ship.size * this._gridSize + 1
                } else {
                    width = this._gridSize + 1
                    height = ship.size * this._gridSize + 1
                }   // if (ship.Direction === Direction.Horizontal)
                img.drawRect(h, v, width, height, BOARD_COLOR_SHIP)
            }   // if (ship.location.column > -1 ...)
        }   // for (ship)
    }   // drawFleet()

    /**
     * Draw the grid for the board.
     */
    public drawGrid(img: Image): void {
        for (let h: number = 0; h <= this._cols; h++) {
            img.drawLine(this._x + h * this._gridSize, this._y,
                this._x + h * this._gridSize, this._y + this._rows * this._gridSize,
                Board.COLOR_GRID)
        }   // for (h)

        for (let v: number = 0; v <= this._rows; v++) {
            img.drawLine(this._x, this._y + v * this._gridSize,
                this._x + this._cols * this._gridSize, this._y + v * this._gridSize,
                Board.COLOR_GRID)
        }   // for (v)
    }   // drawGrid()

    /**
     * Fills the cells of the board with the status of each cell.
     */
    public fillGrid(img: Image): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let h: number = this._x + 1 + col * this._gridSize
                let v: number = this._y + 1 + row * this._gridSize
                let color: number = 0
                switch (this.getStatus(col, row)) {
                    case Status.Empty:
                        color = Board.COLOR_EMPTY
                        break

                    case Status.Hit:
                        color = BOARD_COLOR_HIT
                        break

                    case Status.Miss:
                        color = BOARD_COLOR_MISS
                        break

                    case Status.Occupied:
                        color = BOARD_COLOR_OCCUPIED
                        break
                }   // switch (getStatus(col, row))
                img.fillRect(h, v, this._gridSize - 1, this._gridSize - 1, color)
            }   // for (col)
        }   // for (row)
    }   // fillGrid()

    /**
     * Initializes the parameters to draw the board on an image.
     * @param {Image} img - Canvas for drawing the board.
     * @param {number} x - Horizontal coordinate where the top-left of the board will be located.
     * @param {number} y - Vertical coordinate where the top-left of the board will be located.
     * @param {number} gridSize - Size of the grid boxes.
     * @param {number} cursorSize - Number of boxes in the grid that the cursor will surround.
     * @param {number} cursorDir - Direction of the cursor (only matters if cursorSize > 1)
     */
    public initDraw(img: Image, x: number, y: number, gridSize: number): void {
        this._gridSize = gridSize
        this._x = x
        this._y = y
    }   // initDraw()

    /**
     * @return {Status} Status of a location on the board.
     */
    public getStatus(column: number, row: number): Status {
        return this._board[row][column]
    }   // getStatus()

    /**
     * Move the cursor off-screen.
     */
    public hideCursor(): void {
        this._cursor.x = 0 - this._cursor.image.width
        this._cursor.y = 0 - this._cursor.image.height
    }   // hideCursor()

    /**
     * Draw a border around a cell to show that it is highlighted or selected.
     */
    public highlightCell(img: Image, column: number, row: number, color: number): void {
        let x: number = this._x + column * this._gridSize
        let y: number = this._y + row * this._gridSize
        let w: number = this._gridSize + 1
        let h: number = w
        img.drawRect(x, y, w, h, color)
    }   // highlightCell()

    /**
     * Create a random board. Used for testing.
     */
    public randomize(): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                this._board[row][col] = Math.randomRange(0, 3)
            }   // for (col)
        }   // for (row)
        this.randomizeFleet(FleetType.Standard)
    }   // randomize()

    /**
     * Place the fleet at random locations on the board.
     * Used by the AI. Could be used by the player as an option.
     */
    public randomizeFleet(style: FleetType): void {
        this.buildFleet(style)
        let placed: boolean = false
        for (let ship: number = 0; ship < this._fleet.ships.length; ship++) {
            while (!placed) {
                let short: number = Math.randomRange(0, BOARD_SIZE - this._fleet.ships[ship].size - 1)
                let long: number = Math.randomRange(0, BOARD_SIZE - 1)
                if (Math.percentChance(50)) {
                    placed = this.setShip(ship, short, long, Direction.Horizontal)
                } else {
                    placed = this.setShip(ship, long, short, Direction.Vertical)
                }   // if (Math.percentChance(50))
            }   // while (! placed)
            placed = false
        }   // for (ship)
    }   // randomizeFleet()

    /**
     * Places a ship on the board.
     * @return {boolean} true = ship placed, false = ship not placed (would overlap existing ship)
     */
    public setShip(ship: number, column: number, row: number, direction: Direction): boolean {
        let toReturn: boolean = true
        if (direction === Direction.Horizontal) {
            for (let c: number = column; c < column + this._fleet.ships[ship].size; c++) {
                if (this._board[row][c] === Status.Occupied) {
                    toReturn = false
                    break
                }   // if (this._board[row][c] === Status.Occupied)
            }   // for (c)
        } else {
            for (let r: number = row; r < row + this._fleet.ships[ship].size; r++) {
                if (this._board[r][column] === Status.Occupied) {
                    toReturn = false
                    break
                }   // if (this._board[r][column] === Status.Occupied)
            }   // for (r)
        }   // if (direction === Direction.Horizontal)
        if (toReturn) {
            this._fleet.ships[ship].setLocation(column, row)
            this._fleet.ships[ship].direction = direction
            if (direction === Direction.Horizontal) {
                for (let c: number = column; c < column + this._fleet.ships[ship].size; c++) {
                    this._board[row][c] = Status.Occupied
                }   // for (c)
            } else {
                for (let r: number = row; r < row + this._fleet.ships[ship].size; r++) {
                    this._board[r][column] = Status.Occupied
                }   // for (r)
            }   // if (direction === Direction.Horizontal)
        }   // if (toReturn)
        return toReturn
    }   // setShip()

    /**
     * Sets the status of a cell in the board.
     */
    public setStatus(column: number, row: number, value: Status) {
        this._board[row][column] = value
    }   // setStatus()

    /**
     * Move the cursor to a given location on the grid.
     */
    public showCursor(column: number, row: number) {
        this._cursor.x = this._x + column * this._gridSize + this._cursor.image.width / 2
        this._cursor.y = this._y + row * this._gridSize + this._cursor.image.height / 2
    }   // showCursor()
}   // class Board

/**
 * Immutable class representing a location on a board.
 */
class Coordinate {
    private _col: number
    private _row: number

    constructor(column: number, row: number) {
        this._col = column
        this._row = row
    }   // constructor()

    //% callInDebugger
    public get column() {
        return this._col
    }   // get column()

    //% callInDebugger
    public get row() {
        return this._row
    }   // get row()
}   // class Coordinate

/**
 * Collection of ships.
 */
class Fleet {
    private _ships: Ship[]

    constructor() {
        this._ships = []
    }   // constructor()

    /**
     * Getters and setters
     */
    //% callInDebugger
    public get ships(): Ship[] {
        return this._ships
    }   // get ships()

    /**
     * Public methods
     */
    public build(style: FleetType): void {
        switch (style) {
            case FleetType.Classic:
                this.buildClassic()
                break

            case FleetType.Modern:
                this.buildModern()
                break

            case FleetType.Standard:
                this.buildStandard()
                break
        }   // switch (style)
    }   // build()

    /**
     * Private methods
     */
    private buildClassic(): void {
        this._ships = []
        this._ships.push(new Ship('Carrier', 5, -1, -1, Direction.Horizontal, ShipImage.Carrier))
        this._ships.push(new Ship('Battleship', 4, -1, -1, Direction.Horizontal, ShipImage.Battleship))
        this._ships.push(new Ship('Cruiser', 3, -1, -1, Direction.Horizontal, ShipImage.Cruiser))
        this._ships.push(new Ship('Submarine', 3, -1, -1, Direction.Horizontal, ShipImage.Submarine))
        this._ships.push(new Ship('Destroyer', 2, -1, -1, Direction.Horizontal, ShipImage.Destroyer))
    }   // buildClassic()

    private buildModern(): void {
        this._ships = []
        this._ships.push(new Ship('Carrier', 5, -1, -1, Direction.Horizontal, ShipImage.Carrier))
        this._ships.push(new Ship('Battleship', 4, -1, -1, Direction.Horizontal, ShipImage.Battleship))
        this._ships.push(new Ship('Destroyer', 3, -1, -1, Direction.Horizontal, ShipImage.Destroyer))
        this._ships.push(new Ship('Submarine', 3, -1, -1, Direction.Horizontal, ShipImage.Submarine))
        this._ships.push(new Ship('Patrol Boat', 2, -1, -1, Direction.Horizontal, ShipImage.PatrolBoat))
    }   // buildModern()

    private buildStandard(): void {
        this._ships = []
        this._ships.push(new Ship('Aircraft Carrier', 5, -1, -1, Direction.Horizontal, ShipImage.Carrier))
        this._ships.push(new Ship('Battleship', 4, -1, -1, Direction.Horizontal, ShipImage.Battleship))
        this._ships.push(new Ship('Cruiser', 3, -1, -1, Direction.Horizontal, ShipImage.Cruiser))
        this._ships.push(new Ship('Destroyer', 2, -1, -1, Direction.Horizontal, ShipImage.Destroyer))
        this._ships.push(new Ship('Destroyer', 2, -1, -1, Direction.Horizontal, ShipImage.Destroyer))
        this._ships.push(new Ship('Submarine', 1, -1, -1, Direction.Horizontal, ShipImage.Submarine))
        this._ships.push(new Ship('Submarine', 1, -1, -1, Direction.Horizontal, ShipImage.Submarine))
    }   // buildStandard()
}   // class Fleet

/**
 * Represents a player in the game, either human or AI.
 */
class Player {
    private static readonly BG_COLOR: number = 15 // Black
    private static readonly COLOR_SETUP_HEADLINE: number = 1 // White
    private static readonly COLOR_SETUP_INSTRUCTIONS: number = 1 // White
    private static readonly COLOR_SETUP_SHIP_NAME: number = 5 // Yellow
    private static readonly COORD_SETUP_SHIP_IMAGE: Pixel = { x: 15, y: 85 }
    private static readonly FONT_SUMMARY: image.Font = image.font8
    private static readonly TEXT_ME: string = 'Your Board'
    private static readonly TEXT_SETUP_HEADLINE: string = 'Place your ships'
    private static readonly TEXT_SETUP_INSTRUCTIONS_A: string = 'A=Place ship'
    private static readonly TEXT_SETUP_INSTRUCTIONS_B: string = 'B=Rotate'
    private static readonly TEXT_SUMMARY_ELIMINATED: string = 'DEFEATED'

    private _board: Board
    private _color: number
    private _currShots: Shot[]
    private _cursor: GameCursor
    private _eliminated: boolean
    private _fleetSize: number
    private _id: number
    private _name: string
    private _opponents: Opponent[]
    private _prevShots: Shot[]
    private _type: PlayerType
    private _setupShipsY: number

    /**
     * Constructor
     * @param {number} id - Unique identifier of the player
     * @param {string} name - Name of player
     * @param {number} color - Color for player's name
     * @param {PlayerType} kind - Type of player
     */
    constructor(id: number, name: string, color: number, kind: PlayerType = PlayerType.Human) {
        this._board = new Board(BOARD_SIZE, BOARD_SIZE)
        this._color = color
        this._currShots = []
        this._cursor = {
            player: 0,
            row: 0,
            column: 0
        }
        this._eliminated = false
        this._fleetSize = 0
        this._id = id
        this._name = name
        this._opponents = []
        this._prevShots = []
        this._type = kind
    }   // constructor()

    /**
     * Getters / setters
     */
    //% callInDebugger
    public get board(): Board {
        return this._board
    }   // get myBoard()

    //% callInDebugger
    public get color(): number {
        return this._color
    }   // get color()

    public set color(value: number) {
        this._color = value
    }   // set color()

    //% callInDebugger
    public get eliminated(): boolean {
        return this._eliminated
    }   // get eliminated()

    //% callInDebugger
    public get fleetSize(): number {
        return this._fleetSize
    }   // get fleetSize()

    //% callInDebugger
    public get id(): number {
        return this._id
    }   // get id()

    //% callInDebugger
    public get name(): string {
        return this._name
    }   // get name()

    public set name(value: string) {
        this._name = value
    }   // set name()

    //% callInDebugger
    public get opponents(): Opponent[] {
        return this._opponents
    }   // get opponents()

    //% callInDebugger
    public get previousShots(): Shot[] {
        return this._prevShots
    }   // get previousShots()

    //% callInDebugger
    public get playerType(): PlayerType {
        return this._type
    }   // get playerType()

    public set playerType(value: PlayerType) {
        this._type = value
    }   // set playerType()

    //% callInDebugger
    public get shots(): Shot[] {
        return this._currShots
    }   // get shots()

    //% callInDebugger
    public get shotsRemaining(): number {
        return this._fleetSize - this._currShots.length
    }   // get shotsRemaining()

    /**
     * Assesses the current state of the fleet.
     * Marks any sunken ships and returns them for declaration to the other players.
     * Side effect: Ships that have just been sunk are marked as destroyed.
     */
    public get sunkenShips(): Ship[] {
        let toReturn: Ship[] = []
        for (let ship of this._board.ships) {
            if (ship.destroyed) {
                continue
            }   // if (ship.destroyed)
            let hits: number = 0
            let col: number = ship.location.column
            let row: number = ship.location.row
            for (let delta: number = 0; delta < ship.size; delta++) {
                if (ship.direction === Direction.Horizontal) {
                    if (this._board.getStatus(col + delta, row) === Status.Hit) {
                        hits++
                    }   // if (this._board.getStatus(col + delta, row)...)
                } else {
                    if (this._board.getStatus(col, row + delta) === Status.Hit) {
                        hits++
                    }   // if (this._board.getStatus(col, row + delta)...)
                }   // if (ship.direction === Direction.Horizontal)
            }   // for (delta)
            if (hits === ship.size) {
                ship.destroyed = true
                toReturn.push(ship)
            }   // if (hits === ship.size)
        }   // for (ship)
        this.updateFleetSize()
        return toReturn
    }   // get sunkenShips()

    /**
     * Public methods
     */
    public addAiShot(index: number, column: number, row: number) {
        if (this._type !== PlayerType.Computer) {
            return
        }   // if (this._type !== PlayerType.Computer)
        let opponent: Opponent = this._opponents[index]
        if (opponent.board.getStatus(column, row) !== Status.Empty) {
            return
        }   // if (opponent.board.getStatus(column, row)...)
        let shot: Shot = {
            opponentId: opponent.id,
            opponentIndex: index,
            column: column,
            row: row,
            status: Status.Unknown
        }
        let found: number = this.findShot(shot)
        if (found > -1) {
            return
        }   // if (found > -1)
        this._currShots.push(shot)
    }   // addAiShot()

    public addOpponent(id: number, name: string, kind: PlayerType, color: number): void {
        this._opponents.push({
            board: new Board(BOARD_SIZE, BOARD_SIZE),
            color: color,
            id: id,
            kind: kind,
            name: name
        })
    }   // addOpponent()

    public drawBoard(img: Image, x: number, y: number, gridSize: number, nameOverride: string = null): void {
        if (!nameOverride) {
            img.print(Player.TEXT_ME, x, y, this._color, image.font5)
        } else {
            img.print(nameOverride, x, y, this._color, image.font5)
        }   // if (! nameOverride)
        this._board.draw(img, x, y + 6, gridSize, 1, Direction.Horizontal)
    }   // drawBoard() 

    public drawOpponent(img: Image, index: number, x: number, y: number, gridSize: number): void {
        let o: Opponent = this._opponents[index]
        img.print(o.name, x, y, o.color, image.font5)
        // o.board.draw(img, x, y + 6, gridSize, 1, Direction.Horizontal)
        // Draw the actual board later.
        // For now, just initialize the settings for later use.
        o.board.initDraw(img, x, y + 6, gridSize)
    }   // drawOpponent()

    public drawPreviousShots(img: Image): void {
        // Before drawing the previous shots, partially draw the opponent boards.
        for (let opponent of this._opponents) {
            opponent.board.drawGrid(img)
            opponent.board.fillGrid(img)
        }   // for (opponent)
        for (let shot of this._prevShots) {
            this._opponents[shot.opponentIndex].board.highlightCell(img, shot.column, shot.row,
                PLAYER_COLOR_SHOT_PREVIOUS)
        }   // for (shot)
        // Finish drawing the opponent boards.
        // We want the ships, in particular, to draw over the previous shot indicators.
        for (let opponent of this._opponents) {
            opponent.board.drawFleet(img)
            opponent.board.drawEliminated(img)
            opponent.board.buildCursor(1, Direction.Horizontal)
            opponent.board.hideCursor()
        }   // for (opponent)
    }   // drawPreviousShots

    /**
     * Draws the setup image for player to place a ship.
     */
    public drawSetup(img: Image): void {
        img.fill(Player.BG_COLOR)
        let font: image.Font = image.font8
        img.printCenter(this._name, 1, this._color, font)
        img.printCenter(Player.TEXT_SETUP_HEADLINE, font.charHeight + 2, Player.COLOR_SETUP_HEADLINE, font)
        this._setupShipsY = (font.charHeight + 1) * 2 + 1
        let currY: number = this._setupShipsY
        font = image.font5
        let firstShip: number = -1
        let currShip: number = -1
        for (let ship of this._board.ships) {
            currShip++
            img.print(ship.name, 1, currY + 1, Player.COLOR_SETUP_SHIP_NAME, font)
            if (ship.location.column > -1) {
                // Ship has been placed; draw a line through name
                img.drawLine(0, currY + font.charHeight / 2,
                    font.charWidth * ship.name.length, currY + 1 + font.charHeight / 2,
                    Player.COLOR_SETUP_SHIP_NAME)
            } else {
                if (firstShip === -1) {
                    firstShip = currShip
                    // Highlight ship name
                    img.drawRect(0, currY, ship.name.length * font.charWidth + 2, font.charHeight + 2,
                        Player.COLOR_SETUP_SHIP_NAME)
                    // Draw ship
                    let shipImg: Image = SHIP_IMAGES[ship.image]
                    for (let x: number = 0; x < shipImg.width; x++) {
                        for (let y: number = 0; y < shipImg.height; y++) {
                            img.setPixel(Player.COORD_SETUP_SHIP_IMAGE.x + x,
                                Player.COORD_SETUP_SHIP_IMAGE.y + y,
                                shipImg.getPixel(x, y))
                        }   // for (y)
                    }   // for (x)
                }   // if (firstShip === -1)
            }   // if (shipt.location.column > -1)
            currY += font.charHeight + 4
        }   // for (ship)
        currY = screen.height - (font.charHeight * 2 + 4)
        img.print(Player.TEXT_SETUP_INSTRUCTIONS_A, 0, currY, Player.COLOR_SETUP_INSTRUCTIONS, font)
        currY += font.charHeight + 1
        img.print(Player.TEXT_SETUP_INSTRUCTIONS_B, 0, currY, Player.COLOR_SETUP_INSTRUCTIONS, font)
        let x = screen.width - PLAYER_SETUP_GRID_SIZE * BOARD_SIZE - 1
        let y = screen.height - PLAYER_SETUP_GRID_SIZE * BOARD_SIZE - 1
        this._board.draw(img, x, y, PLAYER_SETUP_GRID_SIZE)
        if (firstShip > -1) {
            this.selectSetupShip(firstShip)
        }   // if (firstShip > -1)
    }   // drawSetup()

    /**
     * Prints the player's summary information on the given image.
     * @param {Image} img: Canvas for printing summary.
     * @param {number} y: Vertical coordinate for printing summary.
     * @param {boolean} showShots: Whether to include hits and misses in summary.
     */
    public drawSummary(img: Image, y: number, showShots: boolean = true) {
        let font: image.Font = Player.FONT_SUMMARY
        img.print(this._name, PLAYER_X_COORD_SUMMARY_NAME, y, this._color, font)
        let hits: number = 0
        let misses: number = 0
        for (let shot of this._currShots) {
            if (shot.status === Status.Hit) {
                hits++
            } else {
                misses++
            }   // if (shot.status === Status.Hit)
        }   // for (index)
        if (showShots) {
            img.print('' + hits, PLAYER_X_COORD_SUMMARY_HITS, y, PLAYER_COLOR_SUMMARY_HITS, font)
            img.print('' + misses, PLAYER_X_COORD_SUMMARY_MISSES, y, PLAYER_COLOR_SUMMARY_MISSES, font)
        }   // if (showShots)
        img.print('' + this._fleetSize, PLAYER_X_COORD_SUMMARY_SHIPS, y, PLAYER_COLOR_SUMMARY_SHIPS, font)
        if (this._eliminated) {
            img.print(Player.TEXT_SUMMARY_ELIMINATED, PLAYER_X_COORD_SUMMARY_ELIMINATED, y,
                PLAYER_COLOR_SUMMARY_ELIMINATED, font)
        }   // if (this._eliminated)
    }   // drawSummary()

    public hideCursor(): void {
        for (let opponent of this._opponents) {
            opponent.board.hideCursor()
        }   // for (opponent)
    }   // hideCursor()

    public getStatus(column: number, row: number): Status {
        return this._board.getStatus(column, row)
    }   // getStatus()

    /** 
     * List the opponent IDs. Used for debugging.
     */
    public listOpponents(): void {
        let msg: string = 'Player ID: ' + this._id + ' Opponents IDs: '
        for (let o of this._opponents) {
            msg += o.id + ' '
        }   // for (o)
        game.splash(msg)
    }   // listOpponents()

    public moveCursor(columnChange: number, rowChange: number) {
        let cursor: GameCursor = this._cursor
        cursor.column += columnChange
        cursor.row += rowChange
        let newPlayer: number = cursor.player
        if (cursor.row < 0 || cursor.column < 0 || cursor.row >= BOARD_SIZE || cursor.column >= BOARD_SIZE) {
            if (cursor.row < 0 || cursor.row >= BOARD_SIZE) {
                if (cursor.row < 0) {
                    cursor.row += BOARD_SIZE
                } else {
                    cursor.row -= BOARD_SIZE
                }   // if (cursor.row < 0)
                switch (cursor.player) {
                    case 0:
                        newPlayer = 2
                        break

                    case 1:
                        newPlayer = 3
                        break

                    case 2:
                        newPlayer = 0
                        break

                    case 3:
                        newPlayer = 1
                        break
                }   // switch (cursor.player)
            } else {
                if (cursor.column < 0) {
                    cursor.column += BOARD_SIZE
                } else {
                    cursor.column -= BOARD_SIZE
                }   // if (cursor.column < 0)
                switch (cursor.player) {
                    case 0:
                        newPlayer = 1
                        break

                    case 1:
                        newPlayer = 0
                        break

                    case 2:
                        newPlayer = 3
                        break

                    case 3:
                        newPlayer = 2
                        break
                }   // switch (cursor.player)
            }   // if (cursor.row < 0)
        }   // if (cursor.row < 0 || cursor.column < 0)

        if (newPlayer != cursor.player && this._opponents[newPlayer]) {
            this._opponents[cursor.player].board.hideCursor()
            cursor.player = newPlayer
        }   // if (newPlayer != cursor.player ...)
        this.showCursor()
    }   // moveCursor()

    /**
     * Register a defeated player in the tracking boards.
     */
    public registerDefeat(id: number): void {
        if (id !== this._id) {
            let index: number = this.findOpponent(id)
            if (index === -1) {
                // Shouldn't happen - Warn
                game.splash('Player ID: ' + this._id
                    + ' Defeated ID: ' + id)
            } else {
                this._opponents[index].board.eliminated = true
            }   // if (index === -1)
        }   // if (id !== this._id)
    }   // registerDefeat()

    /**
     * Register a hit in the tracking boards.
     */
    public registerHit(shot: Shot): void {
        if (shot.opponentId === this._id) {
            // Hit is on this player
            this._board.setStatus(
                shot.column, shot.row, Status.Hit
            )
        } else {
            // Hit is on an opponent
            let index: number = this.findOpponent(shot.opponentId)
            if (index === -1) {
                // Shouldn't happen - Warn
                game.splash('Player ID: ' + this._id
                    + ' Shot.OpponentID: ' + shot.opponentId)
            } else {
                this._opponents[index].board.setStatus(
                    shot.column, shot.row, Status.Hit
                )
            }   // if (index === -1)
        }   // if (shot.opponentId === this._id)
    }   // registerHit()

    /**
     * Register a sunken ship in the tracking boards.
     */
    public registerShip(opponentId: number, ship: Ship): void {
        if (opponentId === this._id) {
            return
        }   // if (opponentId === this._id)
        let index: number = this.findOpponent(opponentId)
        if (index === -1) {
            // Shouldn't happen - Warn
            game.splash('PlayerID: ' + this._id
                + ' Ship opponent ID: ' + opponentId)
        } else {
            this._opponents[index].board.addShip(ship)
        }   // if (index === -1)
    }   // registerShip()

    /**
     * Add a selected cell to the current round's shots.
     * If the shot was already added this round, then remove it.
     * @param {Image} img - Image to update with selected or removed shot.
     */
    public registerShot(img: Image): void {
        // Search current shots to see if it already exists
        let cursor: GameCursor = this._cursor
        let found: number = this.findShot({
            opponentId: -1,
            opponentIndex: cursor.player,
            column: cursor.column,
            row: cursor.row,
            status: Status.Unknown
        })

        let opponent: Opponent = this._opponents[cursor.player]
        if (found > -1) {
            // Remove shot
            this._currShots.removeAt(found)
            opponent.board.deselectCell(img, cursor.column, cursor.row)
        } else {
            // Add shot
            this._currShots.push({
                column: cursor.column,
                row: cursor.row,
                opponentId: opponent.id,
                opponentIndex: cursor.player,
                status: Status.Unknown
            })
            opponent.board.highlightCell(img, cursor.column, cursor.row, PLAYER_COLOR_SHOT_CURRENT)
        }   // if (found)
    }   // registerShot()

    /**
     * During fleet setup, build an appropriate cursor for the given ship and place it on the board.
     */
    public selectSetupShip(ship: number): void {
        let currShip: Ship = this.board.ships[ship]
        if (currShip && currShip.location.column === -1) {
            this.board.buildCursor(currShip.size, Direction.Horizontal)
            this.board.showCursor(0, 0)
        }   // if (currShip)
    }   // selectSetupShip()

    public showCursor(): void {
        this._opponents[this._cursor.player].board.showCursor(this._cursor.column, this._cursor.row)
    }   // showCursor()

    /**
     * Start a new round by resetting current and previous rounds' shots.
     */
    public startNewRound(): void {
        this._prevShots = this._currShots.slice(0)
        this._currShots = []
    }   // startNewRound()

    /**
     * Update the tracking boards with their status after a round has ended.
     */
    public updateBoards(): void {
        for (let shot of this._currShots) {
            this._opponents[shot.opponentIndex].board.setStatus(
                shot.column, shot.row, shot.status
            )
        }   // for (shot)
    }   // updateBoards()

    public updateFleetSize(): void {
        let ships: number = 0
        for (let ship of this._board.ships) {
            if (!ship.destroyed) {
                ships++
            }   // if (! ship.destroyed)
        }   // for (ship)
        if (ships === 0) {
            this._eliminated = true
        }   // if (ships === 0)
        this._fleetSize = ships
    }   // updateFleetSize()

    /**
     * Private methods
     */
    private findOpponent(id: number): number {
        let toReturn: number = -1
        for (let index: number = 0; index < this._opponents.length; index++) {
            if (this._opponents[index].id === id) {
                toReturn = index
                break
            }   // if (this._opponents[index].id === id)
        }   // for (index)
        return toReturn
    }   // findOpponent()

    private findShot(shot: Shot): number {
        let toReturn: number = -1
        for (let index: number = 0; index < this._currShots.length; index++) {
            let test: Shot = this._currShots[index]
            if (test.opponentIndex === shot.opponentIndex
                && test.column === shot.column
                && test.row === shot.row) {
                toReturn = index
                break
            }   // if (shot === cursor)
        }   // for (index)
        return toReturn
    }   // findShot()
}   // class Player

/**
 * Represents a ship in a fleet.
 */
class Ship {
    private _coord: Coordinate
    private _destroyed: boolean
    private _dir: Direction
    private _img: ShipImage
    private _name: string
    private _size: number

    /**
     * Constructor
     * @param {string} name - Display name for ship.
     * @param {number} size - Number of cells that the ship occupies.
     * @param {number} column - Column on board where ship is located.
     * @param {number} row - Row on board where ship is located.
     * @param {Direction} direction - Direction in which ship is oriented.
     * @param {ShipImage} image - Image related to the ship.
     */
    constructor(name: string, size: number, column: number, row: number,
        direction: Direction, image: ShipImage) {
        this._coord = new Coordinate(column, row)
        this._destroyed = false
        this._dir = direction
        this._img = image
        this._name = name
        this._size = size
    }   // constructor()

    // Getters / setters
    //% callInDebugger
    public get destroyed(): boolean {
        return this._destroyed
    }   // get destroyed()

    //% callInDebugger
    public set destroyed(value: boolean) {
        this._destroyed = value
    }   // set destroyed()

    //% callInDebugger
    public get direction(): Direction {
        return this._dir
    }   // get direction()

    public set direction(value: Direction) {
        this._dir = value
    }   // set direction()

    //% callInDebugger
    public get image(): ShipImage {
        return this._img
    }   // get imate()

    //% callInDebugger
    public get location(): Coordinate {
        return this._coord
    }   // get location()

    //% callInDebugger
    public get name(): string {
        return this._name
    }   // get name()

    //% callInDebugger
    public get size(): number {
        return this._size
    }   // get size()

    // Public methods
    public setLocation(column: number, row: number): void {
        this._coord = new Coordinate(column, row)
    }   // setLocation()
}   // class Ship
