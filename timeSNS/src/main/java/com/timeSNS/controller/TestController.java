package com.timeSNS.controller;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.timeSNS.dto.LetterDto;
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
	
	
	@GetMapping("/image")
	public String login() {
		return "ImageTest";
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
	
	@PostMapping("/imageup")
	public String imageTest(@RequestParam("image") MultipartFile image, 
							@RequestParam String username,
							HttpServletRequest request) throws Exception {
		
		String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
	    String basePath = rootPath + "/" + "single";
//	    UUID 생성 (Universal Unique IDentifier, 범용 고유 식별자)
	    UUID uuid = UUID.randomUUID();
	    
	    String savedName = uuid.toString() + "_" + image.getOriginalFilename();
	    String filePath = rootPath + "/" + savedName;
	    
	    File file = new File(filePath);
	    if(file.exists()) {
	      file = new File(basePath + "/" + "[새로운 파일 이름]");
	    }
	    File dest = file;
	    
	    image.transferTo(dest); // 파일 업로드 작업 수행
	    
	    System.out.println("rootPath: " + rootPath);
	    System.out.println("basePath: " + basePath);
	    System.out.println("filePath: " + filePath);
	    
		System.out.println("image가 뭐지?: " + image.getOriginalFilename());
		System.out.println("username이 뭐지?: " + username);
		
		return "Main";
	}
	
	@PostMapping("/imageup2")
	public String imageTest2(@ModelAttribute LetterDto letterDto) throws Exception {
		
		String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
	    String basePath = rootPath + "/" + "single";
//	    UUID 생성 (Universal Unique IDentifier, 범용 고유 식별자)
	    UUID uuid = UUID.randomUUID();
	    
	    String savedName = uuid.toString() + "_" + letterDto.getLphoto().getOriginalFilename();
	    String filePath = rootPath + "/" + savedName;
	    
	    File file = new File(filePath);
	    if(file.exists()) {
	      file = new File(basePath + "/" + "[새로운 파일 이름]");
	    }
	    File dest = file;
	    
	    letterDto.getLphoto().transferTo(dest); // 파일 업로드 작업 수행
	    
	    System.out.println("rootPath: " + rootPath);
	    System.out.println("basePath: " + basePath);
	    System.out.println("filePath: " + filePath);
	    
		System.out.println("image가 뭐지?: " + letterDto.getLphoto().getOriginalFilename());
		System.out.println("username이 뭐지?: " + letterDto.getLcontent());
		
		return "Main";
	}
	
}
