var extraHeaders = {};

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(data) {
    console.log(extraHeaders.length);
    for (var entry in extraHeaders) {
      console.log(entry + ": " + extraHeaders[entry]);
      data.requestHeaders.push({name: entry, value: extraHeaders[entry]});
    }
    console.log('headers were modified');
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
        extraHeaders[result[1]] = result[2];
        console.log('added a header');
    }
  },
  {urls: ['http://*.example.com/*']},
  ['blocking']
);
