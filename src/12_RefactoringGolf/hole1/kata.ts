/* eslint-disable */

// améliore ce code
export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.checkFirstMove(symbol);
    this.checkPlayerRepeat(symbol);
    this.checkAlreadyPlayed(x, y);

    this.updateLastSymbol(symbol);
    this.addTile(symbol, x, y);
  }

  private addTile(symbol: string, x: number, y: number) {
    this._board.AddTileAt(symbol, x, y);
  }

  private updateLastSymbol(symbol: string) {
    this._lastSymbol = symbol;
  }

  private checkAlreadyPlayed(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
  }

  private checkPlayerRepeat(symbol: string) {
    if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private checkFirstMove(symbol: string) {
    if (this._lastSymbol == ' ') {
      this.checkFirstPlayer(symbol);
    }
  }

  private checkFirstPlayer(symbol: string) {
    if (symbol == 'O') {
      throw new Error('Invalid first player');
    }
  }

  public Winner(): string {
    for (let i of [0, 1, 2]) {
      if (this.isRowFull(i)) {
        if (this.isRowFullAndWithSameSymbol(i)) {
          return this._board.TileAt(i, 0)!.Symbol;
        }
      }
    }
    return ' ';
  }

  private isRowFullAndWithSameSymbol(i: number) {
    return this._board.TileAt(i, 0)!.Symbol == this._board.TileAt(i, 1)!.Symbol &&
        this._board.TileAt(i, 2)!.Symbol == this._board.TileAt(i, 1)!.Symbol;
  }

  private isRowFull(i: number) {
    return this._board.TileAt(i, 0)!.Symbol != ' ' &&
        this._board.TileAt(i, 1)!.Symbol != ' ' &&
        this._board.TileAt(i, 2)!.Symbol != ' ';
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
