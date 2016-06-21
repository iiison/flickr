/**
 * Using [page.js] for routing
 * This function will initiate and bind routing paths
 * We are using [express] like routing aproach, there will
 * be different function call on route change.
 */
function initRoutes () {
	var routes = {
		landing : function(context, next){
			var viewName = window.controller.view.get('viewName');
			if(viewName === 'landing'){
				window.controller.view.set('viewName', 'home');
			}
			else{
				window.controller.view.set('viewName', 'landing');
			}
		}
		/* -- Create new functions according to page, so that every page will have it's own section of routing -- */
	};

	// Set base URL, all paths will include the base path
	page('/', routes.landing);
	/* add more routes here */
	page();
}