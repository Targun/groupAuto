(function() {
	'use strict';
	angular
	.module('app')
	.directive('groupAuto', function($timeout){
		return {
	        restrict: 'E',
			templateUrl: '/shared/directives/groupAuto.html',
		    link: function($scope, elem, attrs) {


			    var data = [
			      { label: "Chicago", category: "Cities" },
			      { label: "Northbrook", category: "Cities" },
			      { label: "Evanston", category: "Cities" },
			      { label: "Old Town", category: "Neighborhoods" },  
			      { label: "The Loop", category: "Neighborhoods" },
			      { label: "West Loop", category: "Neighborhoods" },
			      { label: "Alcott Es", category: "Schools" },
			      { label: "Lasalle", category: "Schools" },              
			      { label: "Lincoln", category: "Schools" }
			    ];

			    //widget extension
			    $.widget("custom.catautocomplete", $.ui.autocomplete, {
			        //NOTE: this will process the items in order, so a category could show up multiple times
			        _renderMenu: function (ul, items) {
			            var that = this;
			            var currentCategory = "";
			            $.each(items, function (index, item) {
			                if (item.category != currentCategory) {
			                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
			                    currentCategory = item.category;
			                }
			                that._renderItemData(ul, item);
			            });
			        }
			    });

			    $("#search").catautocomplete({
			        source: function (request, response) {
			            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
			            response($.grep(data, function (value) {
			                return matcher.test(value.label) || matcher.test(normalize(value.label));
			            }));
			        },
			        select: function( event, ui ) {
			            console.log( ui.item ?
			              "Selected: " + ui.item.value:
			              "Nothing selected, input was " + this.value );
			        }
			    });

			    //utilities for accent mapping
			    var accentMap = {
			        "á": "a","ö": "o","é" : "e"
			    };
			    var normalize = function (term) {
			        var ret = "";
			        for (var i = 0; i < term.length; i++) {
			            ret += accentMap[term.charAt(i)] || term.charAt(i);
			    	}
			    	return ret;
			    };

			    // REQUIREMENTS
			    // <link href='//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css' rel='stylesheet' />
			    // <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
	        }
	    };
	});  
})();