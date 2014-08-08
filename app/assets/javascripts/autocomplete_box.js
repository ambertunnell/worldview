$(function() {

  $('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/countries',
    maxHeight: 200,
    minChars: 2,
    dataType: 'text',
    autoSelectFirst: true,
    deferRequestBy: 10,
    // lookupFilter: function (suggestion, query, queryLowerCase) {},
    showNoSuggestionNotice: true,
    onSelect: function (suggestion) {
        console.log(suggestion);
    }
});



});