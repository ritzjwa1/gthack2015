// Install necessary modules
// npm install unirest

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

/**
* Initiates connection with extension
* 
*/
  chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.url == blacklistedWebsite)
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      openUrl(request.openUrlInEditor);
  }); 
}

function getTitle (url) {
  // These code snippets use an open-source library.
  var unirest = require('unirest');
var title = unirest.post("https://neutrinoapi-html-extract.p.mashape.com/html-extract-tags")
.header("X-Mashape-Key", "FAwe0YDMHSmsh3yFveT2sNYT86YYp1FqvMEjsn0yT9XGXekjlD")
.header("Content-Type", "application/x-www-form-urlencoded")
.header("Accept", "application/json")
.send("content=http://www.neutrinoapi.com/")
.send("tag=title")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
}

function getHyperlinks(url) {
  var unirest = require('unirest');
  var hyperlinks = unirest.post("https://neutrinoapi-html-extract.p.mashape.com/html-extract-tags")
  .header("X-Mashape-Key", "FAwe0YDMHSmsh3yFveT2sNYT86YYp1FqvMEjsn0yT9XGXekjlD")
  .header("Content-Type", "application/x-www-form-urlencoded")
  .header("Accept", "application/json")
  .send("content=http://www.neutrinoapi.com/")
  .send("tag=a")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });
}