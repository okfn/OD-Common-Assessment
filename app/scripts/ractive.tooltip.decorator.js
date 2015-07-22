var tooltipDecorator = function ( node, content ) {
  var tooltip, handlers, eventName;
  handlers = {
    mouseover: function () {
      tooltip = document.createElement( tooltipDecorator.element );
      tooltip.className = tooltipDecorator.className;
      tooltip.innerHTML = content;
      tooltip.style.left = node.offsetLeft - (tooltipDecorator.offsetWidth / 2) + (node.offsetWidth / 2) + 'px';
      tooltip.style.bottom = tooltipDecorator.offsetY + 'px';
      tooltip.style.width = tooltipDecorator.offsetWidth + 'px';
      node.parentNode.insertBefore( tooltip, node );
    },

    mouseleave: function () {
      tooltip.parentNode.removeChild( tooltip );
    }
  };

  for ( eventName in handlers ) {
    if ( handlers.hasOwnProperty( eventName ) ) {
      node.addEventListener( eventName, handlers[ eventName ], false );
    }
  }

  return {
    teardown: function () {
      for ( eventName in handlers ) {
        if ( handlers.hasOwnProperty( eventName ) ) {
          node.removeEventListener( eventName, handlers[ eventName ], false );
        }
      }
    }
  }
};

tooltipDecorator.className = 'tooltip';
tooltipDecorator.element = 'div';
tooltipDecorator.offsetX = 0;
tooltipDecorator.offsetY = 10;
tooltipDecorator.offsetWidth = '200';

Ractive.decorators.tooltip = tooltipDecorator;