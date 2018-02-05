'use strict';
/**
 * Track the trade one client to another
 * @param {org.acme.mynetwork.Trade} trade - the trade to be processed
 * @transaction
 */
function tradeCommodity(trade) {
  var factory = getFactory();
  trade.lot.owner = trade.client;

  var result = getAssetRegistry('org.acme.mynetwork.Lot')
    .then(function (assetRegistry) {
      return assetRegistry.update(trade.lot);
    });
  if (result) {
    var newTradeEvent = factory.newEvent('org.acme.mynetwork', 'NewTradeEvent');
    newTradeEvent.lot = trade.lot;
    emit(newTradeEvent);
  }

  return result;
}