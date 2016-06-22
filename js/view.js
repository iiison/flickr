/**
 * View Class will handle view change and attach
 * the appropriate handlers to DOM
 * This will have `Hnadlebars` helper funcitons and
 * Default view data object
 */
var View = new Stapes.subclass({
	// Add Handlebars helpers and setup initial state of the data
	constructor : function(){
		this.setupViewData();
		this.setupHandlebars();
	},
	// setup initial state of application
	setupViewData: function () {
		this.set({
			viewName: undefined,
			api: "8646a19eac46052be355f18b48678972",
			pageSize: 30,
			page: 1,
			images: [],
			newtwork: false,
			tags: {},
			filter: null
		});
	},

	// Handlebar settings, sets helpers and will register partials if needed in future.
	setupHandlebars: function () {

		/**
		 * This will:
		 * 	- Update `controller.view.tags`
		 * 	- Remove special chars from tags, so that it will be easier to filter
		 * 	- Return  tags space seprated
		 */
		Handlebars.registerHelper("makeTags", function(context, options){
			var tags = window.controller.view.get('tags');
			var temp;
			if(context.length > 0){
				temp = (context.replace(/[^A-Z0-9\s]/ig, "")).split(" ");
				for(var i = 0, l = temp.length; i < l; i++){
					if(temp[i].length > 14){
						temp[i] = temp[i].slice(0, 14);
					}
					if(tags[temp[i]]){
						if(tags[temp[i]] < 36)
							tags[temp[i]] +=1;
					}else{
						tags[temp[i]] = 1;
					}
				}

				window.controller.view.set('tags', tags);
				return temp.join(" ");
			}
			return temp;
		});

		// Handles all arithmetical operations.
		Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options){
			lvalue = parseFloat(lvalue);
			rvalue = parseFloat(rvalue);

			return {
				"+": lvalue + rvalue,
				"-": lvalue - rvalue,
				"*": lvalue * rvalue,
				"/": lvalue / rvalue,
				"%": lvalue % rvalue
			}[operator];
		});

		// basically Handlebars way to say if `lvalue` > `rvalue`
		Handlebars.registerHelper("gt", function (lvalue, rvalue, options) {
			if(lvalue > rvalue){
				return options.fn(this);
			}
			return options.inverse(this);
		});
	},

	/**
	 * Appends new thumbnail to images container, also takes care of:
	 * 	- Appending new tags
	 * 	- Showing filtered thumbnails
	 * @param  {Object} data -- photo object returned by flickr API
	 */
	render: function (data) {
		// Don't clean up the image container if page is greater than 1
		var append = (data.page > 1) ? true : false;

		// [renderTpl] is present in `render.js` file, utility to render
		// handlebars template
		renderTpl('thumbnail', {photos: data.photo}, append);

		// Don't send network request if already a network call is in the process
		this.set('newtwork', false);

		// Lazy loading images
		this.loadImg();
		this.updateTags();

		// filter if tag is clicked
		if(!data.isTagSearch){
			this.handleThumbs(this.get('filter'));
		}
	},

	// Binds DOM events
	bindEvents: function(){
		var that = this;
		$(".tags").on("click", "span", function (e) {
			that.set("tags", {});
			that.set("page", 1);
			that.handleThumbs($(this).html());
		});
		$(window).scroll(function () {
			// if thumbs are less than 2000 and no network call is going on
			if(!that.get('newtwork') && that.get('page') < 68){
				// If Second last row  shows up on the screen, AJAX will be Fired
				if(($(window).scrollTop() + $(window).height()) > ($('.tags').outerHeight() + $(".images").outerHeight() - 450)){
					that.emit('renderThumbs', that.get("filter"));
				}
			}
		});
	},

	// Lazy load image and add transtion when image loads
	loadImg: function () {
		[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
			img.setAttribute('src', img.getAttribute('data-src'));
			img.onload = function() {
				img.removeAttribute('data-src');
			};
		});
	},

	// Helper to render new tags
	updateTags: function () {
		renderTpl('tags', {tags: window.controller.view.get('tags')}, false, $(".tags"));
	},

	// Show thumbnails according to filter of tag
	handleThumbs: function(tag){
		var that = this;
		if(tag){
			var $thumbs = $(".thumb");

			$thumbs.hide();
			$thumbs.filter("." + tag).show();
			console.log($thumbs.filter("." + tag).length);
			that.set("filter", tag);
			that.emit('renderThumbs', tag);
		}
	}
});