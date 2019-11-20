var a, b, finished, action, fn_name, end, quick_i, shuffle_down;
var card, comparisons, swaps, operation;
var interval = 0;
quickstep = new Array(35);


function slider_support()
{
	var i = document.createElement("input");
	i.setAttribute("type", "range");
	return i.type != "text";
}

function validate()
{
	var num = document.querySelectorAll('[type~=text]');
	var i = num.length;
	var all_OK = true;
	while(i--) {
		if(isNaN(num[i].value) || num[i].value == "")
		{
			num[i].focus();
			all_OK = false;
		}
	}
	if(!all_OK) { alert("All of the boxes must contain a number."); }
	return all_OK;
}

function randomise()
{
	var num = document.querySelectorAll('[type~=text]');
	var i = num.length;
	while(i--) {
		num[i].value = Math.floor((Math.random()*1000));
	}
}

function show_explanation()
{
	var divs = document.querySelectorAll('.explanation');
	var i = divs.length;
	while(i--) {
		divs[i].style.display = "none";
	}
	document.getElementById(document.getElementById("sort_type").value).style.display = "block";
}

function change_interval()
{
	if(interval != 0) { clearInterval(interval); }
	
	if(document.getElementById("interval").value != 2500)
	{
		if(fn_name > "") { interval = setInterval(next_step, document.getElementById("interval").value); }
		document.getElementById("next").disabled = true;
	}
	else
	{
		if(b > 0) { document.getElementById("next").disabled = false; }
	}
}

function compare(i, j)
{
	comparisons++;
	for(var n = 0; n < 10; n++)
	{
		if(n == i || n == j) { card[n].style.backgroundColor = "#FFFF99"; } else { card[n].style.backgroundColor = "#FFFFFF"; }
	}
	document.getElementById("commentary").innerHTML = "<p><strong>Comparisons: " + comparisons + "<br>Swaps: " + swaps + "</strong></p><p>Comparing " + card[i].innerHTML + " and " + card[j].innerHTML + "...</p>";
	if(eval(card[j].innerHTML) < eval(card[i].innerHTML))
	{
		document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>" + operation + " required</p>"
		return true;
	}
	else
	{
		document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>" + operation + " not required</p>"
		return false;
	}
}

function shuffle(first, last)
{
	value = new Array(10);
	for(var i = 0; i < 10; i++)
	{
		value[i] = eval(card[i].innerHTML);
	}
	
	if(first < last)
	{
		for(i = first; i < last; i++)
		{
			card[i].innerHTML = value[i+1];
		}
	}
	else
	{
		for(i = first; i > last; i--)
		{
			card[i].innerHTML = value[i-1];
		}
	}
	swaps++;
}

function swap(i, j)
{
	swaps++;
	var temp;
	document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>Swapping " + card[i].innerHTML + " and " + card[j].innerHTML + "</p>";
	temp = eval(card[j].innerHTML);
	card[j].innerHTML = eval(card[i].innerHTML);
	card[i].innerHTML = temp;
}

function insert(n)
{
	swaps++;
	var inserted = false;
	var i = n - 1;
	document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>Inserted " + card[n].innerHTML + " into the correct position.</p>";
	var temp = eval(card[n].innerHTML);
	card[n].innerHTML = eval(card[i].innerHTML);
	card[i].style.backgroundColor = "white";
	while(!inserted)
	{
		comparisons++;
		if(i == 0 || eval(card[i-1].innerHTML) <= temp)
		{
			card[i].innerHTML = temp;
			inserted = true;
			card[i].style.backgroundColor = "#FFFF99";
		}
		else
		{
			card[i].innerHTML = eval(card[i-1].innerHTML);
			i--;
		}
	}
}

function selection()
{
	if(a == 8 && b == 9)
	{
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = true;
		}
		else
		{
			clearInterval(interval);
			interval = 0;
		}
		document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " swaps.</h3>";
		b = 0;
	}
	else
	{
		if(b == 9)
		{
			a++;
			b = a + 1;
		}
		else
		{
			b++;
		}
	}
}

function bubble()
{
	if(a < 8)
	{
		a++;
		b++;
	}
	else
	{
		if(finished)
		{
			if(document.getElementById("interval").value == 2500)
			{
				document.getElementById("next").disabled = true;
			}
			else
			{
				clearInterval(interval);
				interval = 0;
			}
			document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " swaps.</h3>";
			b = 0;
		}
		else
		{
			finished = true;
			a = 0;
			b = 1;
		}
	}
}

function opti_bubble()
{
	if(a < end)
	{
		a++;
		b++;
	}
	else
	{
		if(finished)
		{
			if(document.getElementById("interval").value == 2500)
			{
				document.getElementById("next").disabled = true;
			}
			else
			{
				clearInterval(interval);
				interval = 0;
			}
			document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " swaps.</h3>";
			b = 0;
		}
		else
		{
			finished = true;
			a = 0;
			b = 1;
			end--;
		}
	}
}

function insertion()
{
	if(a < 8)
	{
		a++;
		b++;
	}
	else
	{
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = true;
		}
		else
		{
			clearInterval(interval);
			interval = 0;
		}
		document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " insertions.</h3>";
		b = 0;
	}
}

function quick()
{
	if(quickstep[quick_i] != "end")
	{
		var args = quickstep[quick_i].split(",");
		finished = false;
		a = eval(args[0]);
		b = eval(args[1]);
		if(eval(args[4]) == 1) { var p = eval(args[0]); } else { var p = eval(args[1]); }
		for(var i = 0; i <= 9; i++)
		{
			if(i >= eval(args[2]) && i <= eval(args[3])) { card[i].style.fontStyle = "italic"; } else { card[i].style.fontStyle = "normal"; }
			if(i == p) { card[i].style.color = "red"; } else { card[i].style.color = "black"; }
		}
		if(eval(args[4]) == 1) { shuffle_down = true; } else { shuffle_down = false; }
	}

	if(finished || quickstep[quick_i] == "end")
	{
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = true;
		}
		else
		{
			clearInterval(interval);
			interval = 0;
		}
		document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " shifts.</h3>";
		b = 0;
	}

	quick_i++;
}

function quicksort(lower, upper)
{
	if(upper - lower > 0)
	{
		var i, temp;
		var pivot = Math.round((upper + lower)/2);

		for(i = lower; i < pivot; i++)
		{
			quickstep[quick_i] = i+","+pivot+","+lower+","+upper+","+"-1";
			if(eval(card[pivot].innerHTML) < eval(card[i].innerHTML))
			{
				temp = eval(card[i].innerHTML);
				shuffle(i, pivot);
				card[pivot].innerHTML = temp;
				pivot--;
				i--;
			}
			quick_i++;
		}
		
		for(i = Math.round((upper + lower)/2) + 1; i <= upper; i++)
		{
			quickstep[quick_i] = pivot+","+i+","+lower+","+upper+","+"1";
			if(eval(card[i].innerHTML) < eval(card[pivot].innerHTML))
			{
				temp = eval(card[i].innerHTML);
				shuffle(i, pivot);
				card[pivot].innerHTML = temp;
				pivot++;
			}
			quick_i++;
		}
		
		quicksort(lower, pivot - 1);
		quicksort(pivot + 1, upper)
	}	
}

function next_step()
{
	if(action == 1)
	{
		if(compare(a, b))
		{ action = -1; }
		else
		{
			window[fn_name]();
		}
	}
	else
	{
		action = 1;
		if(fn_name == "insertion") { insert(b); }
		if(fn_name == "selection" || fn_name == "bubble" || fn_name == "opti_bubble") { swap(a, b); }
		if(fn_name == "quick") 
		{
			if(shuffle_down)
			{
				var temp = eval(card[b].innerHTML);
				shuffle(b, a);
				card[a].innerHTML = temp;
				document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>"+temp+" shifted to the left of the pivot.</p>";
			}
			else
			{
				var temp = eval(card[a].innerHTML);
				shuffle(a, b);
				card[b].innerHTML = temp;
				document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>"+temp+" shifted to the right of the pivot.</p>";
			}
			card[a].style.backgroundColor = "white";
			card[b].style.backgroundColor = "white";
		}
		finished = false;
		window[fn_name]();
	}
}

function start_sort()
{
	if(validate()) {
		var num = document.querySelectorAll('[type~=text]');
		card = document.querySelectorAll('.card');
		for(var i=0;i<10;i++)
		{
			card[i].innerHTML = num[i].value;
			card[i].style.fontStyle = "normal";
			card[i].style.color = "black";
		}
		if(interval != 0) { clearInterval(interval); interval = 0; }
		action = 1;
		finished = true;
		comparisons = 0;
		swaps = 0;
		fn_name = document.getElementById("sort_type").value;
		switch(document.getElementById("sort_type").value)
		{
		case "bubble":
			a = 0;
			b = 1;
			operation = "Swap";
			next_step();
			break;
		case "opti_bubble":
			a = 0;
			b = 1;
			end = 8;
			operation = "Swap";
			next_step();
			break;
		case "selection":
			a = 0;
			b = 1;
			operation = "Swap";
			next_step();
			break;
		case "insertion":
			a = 0;
			b = 1;
			operation = "Insertion";
			next_step();
			break;
		case "quick":
			a = 0;
			b = 5;
			operation = "Shift";
			quick_i = 0;
			quicksort(0, 9);
			quickstep[quick_i] = "end";
			for(var i=0;i<10;i++)
			{
				card[i].innerHTML = num[i].value;
			}
			quick_i = 1;
			action = 1;
			swaps = 0;
			for(var i = 0; i <= 9; i++)
			{
				card[i].style.fontStyle = "italic";
				if(i == 5) { card[i].style.color = "red"; }
			}
			next_step();
			break;
		default:
			operation = "";
			alert("Sorry - that option hasn't been coded yet.");
		}
		document.getElementById("next").onclick = function() { next_step(); };
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = false;
		}
		else
		{
			document.getElementById("next").disabled = true;
			if(interval == 0)
			{ 
				interval = setInterval(next_step, document.getElementById("interval").value);
			}
			else
			{
				clearInterval(interval);
				interval = 0;
			}
		}
    }
    
}