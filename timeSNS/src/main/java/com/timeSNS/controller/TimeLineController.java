package com.timeSNS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/timeline")
public class TimeLineController {

	public String list() {
		return "list";
	}
	
	public String listAdd() {
		return "listAdd";
	}
	
	public String createTimePage() {
		return "createTimePage";
	}
	
	public String createTime() {
		return "createTime";
	}
	
	public String modifyTimePage() {
		return "modifyTimePage";
	}
	
	public String modifyTime() {
		return "modifyTime";
	}
	
}
