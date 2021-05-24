package com.timeSNS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@Controller
@RequestMapping("/mailbox")
public class MailBoxController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public MailBoxController(UserService userService) {
		this.userService = userService;
	}
	
//----------------------------------------------------------------------------------------------------//
	
	
	public String main() {
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	@PostMapping("/reception")
	public String reception() {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
	public String send() {
		return "send";
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
	public String detail() {
		return "detail";
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
	public String sendingPage() {
		return "sendingPage";
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	편지 보내기
	@PostMapping("sending")
	public String sending() {
		
		
		
		
		return "sending";
	}
}
