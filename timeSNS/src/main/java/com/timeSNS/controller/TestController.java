package com.timeSNS.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.timeSNS.dto.UserDto;
import com.timeSNS.entity.Member;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@Controller
@RequestMapping("/test")
public class TestController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	private final UserService userService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public TestController(UserService userService) {
		this.userService = userService;
	}
	
	
	@GetMapping("/login")
	public String login() {
		return "Login";
	}
	
	@PostMapping("/signup")
	public ResponseEntity<Member> signup(@Valid @RequestBody UserDto userDto){
		System.out.println(userDto);
		return ResponseEntity.ok(userService.signup(userDto));
	}

	@PostMapping("/id")
	public String idTest() {
		
		Long midx = (memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx();
		
		System.out.println("midx: " + midx);
		
		return "Main";
	}
	
}
