/* jshint devel:true */
//console.log('\'Allo \'Allo!');

  function calculateCSSWidth(value) {
    return value * 100;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var URL = "1kOOvztwbY1RNm545RKG8Ua6bh2GgX-P_wFadPkdH2ig"
    Tabletop.init( { key: URL, callback: showInfo, simpleSheet: false } )
  })

  function showInfo(data) {
    var countryData = data.Graph.elements;
    console.log(data)
    // Get worksheet named Graph
    cc = {countries: countryData};
    console.log(countryData);
    //$('#fullTable').html(ich.countries(cc));

    var ractive = new Ractive({
      debug: true,
      el: '#graph',
      template: '#template',
      data: {countries: countryData}
    });
console.log(ractive.template)
  }

