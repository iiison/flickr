/**
 * Utility funcition to populate the data in container.
 * @param  {String} tplName  -- name of template to be rendered
 * @param  {Object} viewData -- data to be passed through template
 * @param  {Boolean} append   OPTIONAL -- send this as true if need to append
 * the data instead of clear previous.
 * @param  {DOM Element} el -- OPTIONAL -- Container to which data will be appended
 * by default [el] will be $("#images")
 */
window.renderTpl = function(tplName, viewData, append, el){
	var tpl = window.templates[tplName] || window.partials[tplName];
	var targetEl = el ? $(el) : $("#images");
	if(tpl && targetEl ){
		if(!append){
			targetEl.html("").html(tpl(viewData));
		}else{
			targetEl.append(tpl(viewData));
		}
	}
};