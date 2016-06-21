/**
 * Model will fetch data from  server/backend.
 * All funcitons inside this class should be accessed from
 * [Controller] and once the data is fetched, this will emit
 * related [Controller] funcitons.
 */
 /*global BanksViewScript,ContactViewScript,TransactionsViewScript,CardsViewScript,CardsViewScript,BanksViewScript,ContactViewScript,CashViewScript,ProfileViewScript,VirtualCardViewScript*/
var Model = new Stapes.subclass({
	constructor : function () {
		console.log("Loading Models");
	},
	// sends request for next set of phots and returns a promise
	getLandingPageViewData: function (obj) {
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key="+ obj.api +"&per_page="+ obj.count +"&page="+ obj.page +"&format=json&nojsoncallback=1&extras=tags";
		return $.ajax({
			url: url,
			type: 'GET'
		});
	}
});