function calculatePoints() {
	var score = 0;

	var inputs = document.getElementsByTagName('tr');

	for (var index = 0; index < inputs.length; index++) {
		var innerHTML = inputs[index].innerHTML;
		var lines = innerHTML.split('\n');

		var nothing = lines.shift();
		var taskName = lines.shift();
		var taskPoints = lines.shift();
		var taskExtra = lines.shift();

		taskPoints = parseInt(taskPoints.replace('<th>', '').replace('</th>', ''));
		taskExtra = parseInt(taskExtra.replace('<th>', '').replace('</th>', ''));

		var selects = inputs[index].getElementsByTagName('select');
		if (selects.length != 0) {
			var optionSelected = selects[0].value;
			var multiply = 1;

			if (selects.length > 1) {
				multiply = parseInt(selects[1].value);
			}

			if (optionSelected == '+') {
				score += taskPoints * multiply;
			}
			else if (optionSelected == '++') {
				score += (taskPoints + taskExtra) * multiply;
			}
		}
	}

	var date = new Date(document.getElementById('task-date').value);

	if (date != 'Invalid Date'){
		document.getElementById('sum').innerHTML = 'Sum of tasks (' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '): ' + score;
	} else{
		document.getElementById('sum').innerHTML = 'Sum of tasks: ' + score;
	}

	return score;
}

function onLoad() {
	document.getElementById('task-date').addEventListener('input', function(evt){
		calculatePoints();
	});

	var inputs = document.getElementsByTagName('tr');

	for (var i = 0; i < inputs.length; i++) {
		var selects = inputs[i].getElementsByTagName('select');

		if (selects.length != 0) {
			var implID = '<!-- Impl_ID: ' + i + ' -->';
			selects[0].innerHTML += implID

			selects[0].addEventListener('input', function(evt) {
				var begin = this.innerHTML.search('Impl_ID:') + 8;
				var sub = this.innerHTML.substring(begin, this.innerHTML.length - 4);
				var num = parseInt(sub);

				var input = inputs[num];
				if (this.value == '+' || this.value == '++'){
					input.style = 'background-color: #5c995cff;';
				}
				else {
					input.style = '';
				}

				calculatePoints();
			});

			if (selects.length > 1) {
				selects[1].addEventListener('input', function(evt){
					calculatePoints();
				});
			}
		}
	}
}