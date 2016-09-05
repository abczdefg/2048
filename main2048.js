var board = new Array();
var hasConflicted = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	PrepareForMobile();
	NewGame();
})

function PrepareForMobile()
{
	//针对较大尺寸的屏幕
	if (documentWidth > 500) 
	{
		GridContainerWidth = 500;
		CellSpace = 20;
		CellSideLength = 100;
	}
	$('#GridContainer').css('width', GridContainerWidth - 2 * CellSpace);
	$('#GridContainer').css('height',  GridContainerWidth - 2 * CellSpace);
	$('#GridContainer').css('padding', CellSpace);
	$('#GridContainer').css('border-radius', 0.02 * GridContainerWidth);

	$('.GridCell').css('width', CellSideLength);
	$('.GridCell').css('height',  CellSideLength);
	$('.GridCell').css('border-radius', 0.02 * CellSideLength);
}

function NewGame()
{
	//初始化棋盘格
	Init();
	//随机在生个格子生成数字2或4
	GenerateOneNumber();
	GenerateOneNumber();
}

function Init()
{
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			var gridCell = $("#GridCell_" + i + "_" + j);
			//jQuery中设置样式的方法
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}

	//初始化board
	for (var i = 0; i < 4; i++) 
	{
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) 
		{
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();

	score = 0;
	updateScore(score);
}

function updateBoardView()
{
	//若原来已经存在，先删除
	$(".NumberCell").remove();

	for (var i = 0; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			//动态添加div
			$("#GridContainer").append('<div class="NumberCell" id="NumberCell_' + i + '_' + j + '"></div>');
			//用变量表达当前NumberCell
			var theNumberCell = $('#NumberCell_' + i + '_' +j);
			if (board[i][j] == 0) 
			{
				//为0不显示
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i ,j) + CellSideLength / 2);
				theNumberCell.css('left', getPosLeft(i ,j) + CellSideLength / 2);
			}
			else
			{
				theNumberCell.css('width', CellSideLength);
				theNumberCell.css('height', CellSideLength);
				theNumberCell.css('top', getPosTop(i ,j));
				theNumberCell.css('left', getPosLeft(i ,j));
				//背景色、前景色与数字有关
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
		$(".NumberCell").css('line-height', CellSideLength + 'px');
		$(".NumberCell").css('font-size', 0.6 * CellSideLength + 'px');
	}
	//重置碰撞区
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			hasConflicted[i][j] = false;
		}
	}
}

function GenerateOneNumber()
{
	SpaceCell = getBoardSpace(board);
	if(SpaceCell)
	{
		//生成随机数
		var len = SpaceCell.length;
		var randIndex = SpaceCell[ Math.floor(Math.random() * len) ];
		var randx = Math.floor(randIndex / 4);
		var randy = randIndex % 4;

		//生成2或4
		var randNumber = Math.random()<0.5 ? 2 : 4;
		board[randx][randy] = randNumber;

		//生成动画
		ShowNumberWithAnimation(randx, randy, randNumber);
	}
}

$(document).keydown(function(event){
	switch(event.keyCode)
	{
		case 37: //左按键
			event.preventDefault();
			if(MoveLeft())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
			break;
		case 38:
			event.preventDefault();
			if(MoveUp())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
			break;
		case 39:
			event.preventDefault();
			if(MoveRight())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
			break;
		case 40:
			event.preventDefault();
			if(MoveDown())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
			break;
		default:
			break;
	}
});


document.addEventListener('touchstart', function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
	event.preventDefault();
});

document.addEventListener('touchend', function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var dx = endx - startx;
	var dy = endy - starty;

	//X方向
	if(Math.abs(dx) >= Math.abs(dy))
	{
		if (dx > 0.15 * documentWidth) 
		{
			//右
			if(MoveRight())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
		}
		else if (dx < -0.15 * documentWidth) 
		{
			//左
			if(MoveLeft())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
		}
	}
	//Y方向
	else
	{
		if (dy > 0.15 * documentWidth) 
		{
			//向下
			if(MoveDown())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
		}
		else if (dy < -0.15 * documentWidth)
		{
			//向上
			if(MoveUp())
			{
				setTimeout(function(){
					GenerateOneNumber();
					setTimeout("IsGameover()",50);
				}, 200);
			}
		}
	}
});

function IsGameover()
{
	if(!getBoardSpace(board) & NoMove(board))
	{
		Gameover();
		setTimeout("NewGame()", 50);
	}
}

function Gameover()
{
	alert("Gameover");
}

function MoveLeft()
{
	if(!CanMoveLeft(board)) return false;

	for (var i = 0; i < 4; i++) 
	{
		for (var j = 1; j < 4; j++) 
		{
			if (board[i][j] != 0) 
			{
				//对左侧所有元素处理
				for (var k = 0; k < j; k++)
				{
					if (board[i][k] == 0 && NoBlockHorizontal(i, k, j, board)) 
					{
						//move
						ShowMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if(board[i][k] == board[i][j] && NoBlockHorizontal(i, k, j, board)
						&& !hasConflicted[i][j])
					{
						//set hasConfilcted
						hasConflicted[i][j] = true;
						//move & add
						ShowMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0 ;		
						//add score
						score += board[i][k];
						continue;
					}
				}
			}
		}
	}
	setTimeout(function(){
		updateBoardView();
		updateScore(score);
	}, 200);
	return true;
}

function MoveUp()
{
	if(!CanMoveUp(board)) return false;

	for (var j = 0; j < 4; j++) 
	{
		for (var i = 1; i < 4; i++) 
		{
			if (board[i][j] != 0) 
			{
				//对上侧所有元素处理
				for (var k = 0; k < i; k++)
				{
					if (board[k][j] == 0 && NoBlockVertical(k, i, j, board)) 
					{
						//move
						ShowMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if(board[k][j] == board[i][j] && NoBlockVertical(k, i, j, board)
						&& !hasConflicted[i][j])
					{
						//set hasConfilcted
						hasConflicted[i][j] = true;
						//move & add
						ShowMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0 ;
						//add score
						score += board[k][j];
						continue;
					}
				}
			}
		}
	}
	setTimeout(function(){
		updateBoardView();
		updateScore(score);
	}, 200);
	return true;
}

function MoveRight()
{
	if(!CanMoveRight(board)) return false;

	for (var i = 0; i < 4; i++) 
	{
		for (var j = 2; j >= 0; j--) 
		{
			if (board[i][j] != 0) 
			{
				//对右侧所有元素处理
				for (var k = 3; k > j; k--)
				{
					//此时k > j, 故j为col1
					if (board[i][k] == 0 && NoBlockHorizontal(i, j, k, board)) 
					{
						//move
						ShowMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if(board[i][k] == board[i][j] && NoBlockHorizontal(i, j, k, board)
						&& !hasConflicted[i][j])
					{
						//set hasConfilcted
						hasConflicted[i][j] = true;
						//move & add
						ShowMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0 ;	
						//add score
						score += board[i][k];
						continue;
					}
				}
			}
		}
	}
	setTimeout(function(){
		updateBoardView();
		updateScore(score);
	}, 200);
	return true;
}

function MoveDown()
{
	if(!CanMoveDown(board)) return false;

	for (var j = 0; j < 4; j++) 
	{
		for (var i = 2; i >= 0; i--) 
		{
			if (board[i][j] != 0) 
			{
				//对下侧所有元素处理
				for (var k = 3; k > i; k--)
				{
					if (board[k][j] == 0 && NoBlockVertical(i, k, j, board)) 
					{
						//move
						ShowMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0 ;
						continue;
					}
					else if(board[k][j] == board[i][j] && NoBlockVertical(i, k, j, board)
						&& !hasConflicted[i][j])
					{
						//set hasConfilcted
						hasConflicted[i][j] = true;
						//move & add
						ShowMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0 ;
						//add score
						score += board[k][j];						
						continue;
					}
				}
			}
		}
	}
	setTimeout(function(){
		updateBoardView();
		updateScore(score);
	}, 200);
	return true;
}

function updateScore(score)
{
	$("#score").text(score);
}