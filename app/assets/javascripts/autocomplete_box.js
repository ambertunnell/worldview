$(function() {

  $('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/countries',
    maxHeight: 10,
    minChars: 2,
    deferRequestBy: 10,
    showNoSuggestionNotice: true,
    onSelect: function (suggestion) {
        console.log(suggestion);
    }
});



});