package com.timeSNS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/timecapsule")
public class TimeCapsuleController {

	//"/main"
	public String main() {
		return "main";
	}
	
	public String detail() {
		return "detail";
	}
	
	public String feedback() {
		return "feedback";
	}
}
