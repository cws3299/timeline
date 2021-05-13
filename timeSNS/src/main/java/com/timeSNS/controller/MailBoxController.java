package com.timeSNS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mailbox")
public class MailBoxController {

	public String main() {
		return "main";
	}
	
	public String reception() {
		return "reception";
	}
	
	public String send() {
		return "send";
	}
	
	public String detail() {
		return "detail";
	}
	
	public String sendingPage() {
		return "sendingPage";
	}
	
	public String sending() {
		return "sending";
	}
}
