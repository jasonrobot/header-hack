var extraHeaders = {};

//listen for the message to add a header to modify
chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {
    console.log('Got a message: ' + message);
    alert('something')
  }
);

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log('Got a message: ' + message);
    alert('something')
  }
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(data) {
    console.log(extraHeaders.length);
    for (var entry in extraHeaders) {
      console.log(entry + ": " + extraHeaders[entry]);
      data.requestHeaders.push({name: entry, value: extraHeaders[entry]});
    }
    console.log('modified!!!');
    return {requestHeaders: data.requestHeaders};
  },
  {urls: ['<all_urls>']},
  ['requestHeaders', 'blocking']
);

chrome.webRequest.onBeforeRequest.addListener(
  function(data) {
    console.log(data.url);
    var regex = /http:\/\/([\w\-]*)\.([\w\-]*)\.example\.com/;
    var result = data.url.match(regex);
    if (result) {
        // extraHeaders.push({name: result[1], value: result[2]});
        extraHeaders[result[1]] = result[2];
        console.log('added a header')
    }
  },
  {urls: ['http://*.example.com/*']},
  ['blocking']
);

// chrome.webRequest.onCompleted.addListener(
//   function(){
//     console.log('Request completed!')
//   },
//   {urls: []}
// )
