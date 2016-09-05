function ShowNumberWithAnimation(i, j, randNumber)
{
	//通过ID获取
	var NumberCell = $('#NumberCell_' + i + '_' + j);
	NumberCell.css('background-color', getNumberBackgroundColor(randNumber));
	NumberCell.css('color', getNumberColor(randNumber));
	NumberCell.text(randNumber);

	//动画部分使用animate函数
	NumberCell.animate({
		width: CellSideLength,
		height: CellSideLength,
		top: getPosTop(i ,j),
		left: getPosLeft(i, j)
	}, 50);
}

function ShowMoveAnimation(fromx, fromy, tox, toy)
{
	var NumberCell = $('#NumberCell_' + fromx + '_' + fromy);
	NumberCell.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
	}, 200);
}