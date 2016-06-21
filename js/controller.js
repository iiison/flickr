/**
 * [Controller] is middleware between [View] and [Model]
 * if DOM Event needs data from AJAX, then [View] will emit
 * [Controller] Function and [Controller] will call [Model]
 * and Once it gets the data some callback will be invoked
 * to render the data on DOM
 */
 /*global View, Model, SideNav*/
(function(window){
	window.Controller = Stapes.subclass({
		// Initiate [Model] and [View]
		constructor: function () {
			window.controller = this;
			this.view = new View();
			this.model = new Model();

			this.bindViewHandlers();
			this.bindModelHandlers();
		},

		/**
		 * Contails all methods that will be excuted from [View], it will:
		 * 	- Initiate all network calls requested by DOM
		 *  	- A hook which will capture response from AJAX
		 */
		bindViewHandlers : function() {
			var that = this;

			this.view.on({
				/**
				 * [viewName] change will help in page view change,
				 * as soon as [viewName] gets changed from [Routes],
				 * A method will run accordingly, currently we just have 1
				 * route, but new routes will be added later on.
				 */
				'change:viewName': function(viewName){
					if(viewName === 'landing'){
						that.view.emit('renderThumbs');
						that.view.bindEvents();
					}
				},

				/**
				 * Fetches next set of thumbnails from network and
				 * when gets the data, calls a [View]'s method [render]
				 * to populate the data.
				 * For the first time, this will be executed by [Controller],
				 * later on it will be emited by [View], when user scrolls down
				 * @return {[type]} [description]
				 */
				renderThumbs: function () {
					var viewData = that.view.getAll();
					var imagesXHR = that.model.getLandingPageViewData({
						page: viewData.page,
						api: viewData.api,
						count: viewData.pageSize
					});
					that.view.set('newtwork', true);

					$.when(imagesXHR).done(function (response) {
						if(response && response.stat === "ok"){
							that.view.set('page', (response.photos.page + 1));
							that.view.render.call(that.view, response.photos);
						}
					});
				},
			});
		},
		// write model events here.
		bindModelHandlers: function () {
			this.model.on({
			});
		}
	});
})(window);