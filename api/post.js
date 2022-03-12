const express = require("express");
const router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */

var adapterFor = (function() {
	var url = require('url'),
	adapters = {
		'http:': require('http'),
		'https:': require('https'),
	};
	return function(inputUrl) {
		return adapters[url.parse(inputUrl).protocol]
	}
}());

 // khai bao link url
var rootURL = "https://aubtu.biz/";


function getData(postID){
	return new Promise(function(resolve, reject){
		var url = rootURL + '?pcs=1&p=' + postID;
		adapterFor(url).get(url, function(res){
		    var body = '';
		    res.on('data', function(chunk){
		        body += chunk;
		    });

		    res.on('end', function(){
		        resolve(body);
		    });
		}).on('error', function(e){
			reject(e);
		});

	})
}

router.get("/:postID",  (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data has successfully: " + req.params.postID,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
