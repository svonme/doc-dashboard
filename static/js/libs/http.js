/**
 * @file 请求
 */

 define('http', ['$'], function($) {
  const ajax = function(url, query, type, dataType) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        async: true,
        type: type ? type : 'GET',
        dataType: dataType ? dataType : 'json',
        data: query ? query : {}, // 请求参数
        timeout: 1000 * 5, // 超时时间
        success: function(data) {
          resolve(data);
        },
        error: function(e) {
          reject(e);
        }
      })
    })
  }
  const http = {
    ajax: ajax,
    get: function(url, query, dataType) {
      return ajax(url, query, 'GET', dataType);
    },
    post: function(url, query, dataType) {
      return ajax(url, query, 'POST', dataType);
    },
    text: function(url, query) {
      return ajax(url, query, 'GET', 'text');
    },
    jsonp: function(url, query) {
      return ajax(url, query, 'GET', 'jsonp');
    }
  };
  return http;
});