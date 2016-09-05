documentWidth = window.screen.availWidth;
GridContainerWidth = 0.92 * documentWidth;
CellSideLength = 0.18 * documentWidth;
CellSpace = 0.04 * documentWidth;

function getPosTop(i, j)
{
	return CellSpace + i * (CellSpace + CellSideLength);
}

function getPosLeft(i, j)
{
	return CellSpace + j * (CellSpace + CellSideLength);
}

function getNumberBackgroundColor(number)
{
    switch(number){
    	case 2:return "#eee4da";
    	break;
    	case 4:return "#ede0c8";
    	break;
    	case 8:return "#f2b179";
    	break;
    	case 16:return "#f59563";
    	break;
    	case 32:return "#f67c5f";
    	break;
    	case 64:return "#f65e3b";
    	break;
    	case 128:return "#edcf72";
    	break;
    	case 258:return "#edcc61";
    	break;
    	case 512:return "#9c0";
    	break;
    	case 1024:return "#33b5e5";
    	break;
    	case 2048:return "#09c";
    	break;
    	case 4096:return "#a6c";
    	break;
    	case 8192:return "#93c";
    	break;
    }
    return "black";
}

function getNumberColor(number)
{
	if (number <= 4) return "#776E650";
	return "white";
}

function getBoardSpace(board)
{
	var SpaceCell = new Array();
	var k = 0;
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if (board[i][j] == 0) 
			{
				SpaceCell[k++] = i * 4 + j;
			}
		}
	}
	return (k==0)? false : SpaceCell;
}

function CanMoveLeft(board)
{
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 1; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{
				//左侧游戏为0或和自己相等
				if(board[i][j-1] == 0 || board[i][j] ==board[i][j-1])
					return true;
			}
		}
	}
	return false;
}

function CanMoveUp(board)
{
	for (var i = 1; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{
				//上侧游戏为0或和自己相等
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j])
					return true;
			}
		}
	}
	return false;
}

function CanMoveRight(board)
{
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 3; j >= 0; j--) 
		{
			if (board[i][j] != 0) 
			{
				//上侧游戏为0或和自己相等
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1])
					return true;
			}
		}
	}
	return false;
}

function CanMoveDown(board)
{
	for (var i = 2; i >= 0; i--) 
	{
		for (var j = 0; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{
				//下侧游戏为0或和自己相等
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j])
					return true;
			}
		}
	}
	return false;
}

function NoBlockHorizontal(row, col1, col2, board)
{
	for(var i = col1 + 1; i < col2; i++)
	{
		if (board[row][i] != 0) 
		{
			return false;
		}
	}
	return true;
}

function NoBlockVertical(row1, row2, col, board)
{
	for(var i = row1 + 1; i < row2; i++)
	{
		if (board[i][col] != 0) 
		{
			return false;
		}
	}
	return true;
}

function NoMove(board)
{
	if(CanMoveDown(board) || CanMoveUp(board) || 
		CanMoveRight(board) || CanMoveLeft(board))
	{
		return false;
	}
	return true;
}