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
	res.removeHeader("X-Powered-By");
	res.clearCookie();
	var postID = req.params.postID;
	var slug = postID
	var utm = req.query.utm;
	var utm_source = req.query.utm_source;
	var utm_campaign = req.query.utm_campaign;
	var utm_medium = req.query.utm_medium;
	var fbclid = req.query.fbclid;
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.write(req.get('User-Agent'));
	res.end();
	// https://animalloversblog.netlify.app/.netlify/functions/server/post/19920/?utm_source=NamePartner&utm_campaign=NameAuthor&utm_medium=NameNetlify
		/*
	var showPost = false;
	if (typeof postID == "undefined"){
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.write("Chưa có ID post");
		res.end();
	}
	
	if (!req.get('User-Agent').includes("facebookexternalhit")){ // không phải robot Facebook
		if (typeof req.header('Referer') != "undefined"){
			if (req.header('Referer').includes("facebook")){ // đường dẫn từ Facebook 
				
				if (typeof slug == "undefined"){
					res.write("<script>window.location.href='" +  rootURL + "/" + postID + "'</script>")
					res.writeHead(302, {location: rootURL + "?p=" + postID});
				}else if (typeof utm_source == "undefined"){
					res.write("<script>window.location.href='" +  rootURL + "/" + slug + "&utm_source=" + utm + "&utm_medium=" + utm + "&utm_campaign=" + utm + "</script>")
					res.writeHead(302, {location: rootURL + "/" + slug + "?utm_source=" + utm + "&utm_medium=" + utm + "&utm_campaign=" + utm + ""});
				}else{
					res.write("<script>window.location.href='" +  rootURL + "/" + slug + "&utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign + "</script>")
					res.writeHead(302, {location: rootURL + "/" + slug + "?utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign + ""});
				}
				
				res.end();
			}
		}else{
			showPost = true;
		}
	}else{
		showPost = true;
		res.json({
				status: 200,
				message: "Get data has successfully: " + req.params.postID,
		});
	}*/
	

});

module.exports = router;
