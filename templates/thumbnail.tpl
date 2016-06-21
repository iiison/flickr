{{#each photos}}
	<li class="thumb {{makeTags tags}}">
		<div class="image">
			<img data-src="https://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_t.jpg" src="" alt="">
		</div>
		<div class="details">{{title}}</div>
	</li>
{{/each}}