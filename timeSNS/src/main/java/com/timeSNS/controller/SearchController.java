package com.timeSNS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/search")
public class SearchController {

	public String all() {
		return "all";
	}
	
	public String user() {
		return "user";
	}
	
	public String timeline() {
		return "timeline";
	}
	
	public String post() {
		return "post";
	}
	
	public String tag() {
		return "tag";
	}
	
}
