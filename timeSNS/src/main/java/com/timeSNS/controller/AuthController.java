package com.timeSNS.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.timeSNS.dto.MemberModifySignDto;
import com.timeSNS.dto.TokenDto;
import com.timeSNS.dto.UserDto;
import com.timeSNS.entity.Member;
import com.timeSNS.jwt.JwtFilter;
import com.timeSNS.jwt.TokenProvider;
import com.timeSNS.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final TokenProvider tokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final UserService userService;
	
//	AuthController는 TokenProvider, AuthenticationManagerBuilder를 주입받음
	public AuthController(TokenProvider tokenProvider,
						AuthenticationManagerBuilder authenticationManagerBuilder,
						UserService userService) {
		this.tokenProvider = tokenProvider;
		this.authenticationManagerBuilder = authenticationManagerBuilder;
		this.userService = userService;
	}
	
//----------------------------------------------------------------------------------------------------//	

	
//	로그인 경로는 '/api/authenticate'이고 Post요청을 받음
	@PostMapping(path = "/authenticate")
	public ResponseEntity<TokenDto> authorize(@RequestParam String username, @RequestParam String password) {
//		LoginDto의 username, password를 파라미터로 받고 이를 이용해 UsernamePasswordAuthenticationToken을 생성
		UsernamePasswordAuthenticationToken authenticationToken = 
				new UsernamePasswordAuthenticationToken(username, password);
//		authenticationToken을 이용해서 Authentication객체를 생성하고, authenticate 메소드가 실행될 때,
//		CustomUserDetailsService의 loadUserByUsername 메소드가 실행 됨.
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

//		Authentication 객체를 생성하고 이를 SecurityContext에 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);

//		Authentication 객체를 createToken 메소드를 통해서 JWT Token을 생성함		
		String jwt = tokenProvider.createToken(authentication);
		
		HttpHeaders httpHeaders = new HttpHeaders();
//		JWT Token을 ResponseHeader에도 넣어줌
		httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

//		TokenDto를 이용해서 Response Body에도 넣어서 리턴하게 됨
		return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	로그아웃
	@PostMapping()
	public void logout() {
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.remove("Authorization");
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 가입하기
	@PostMapping("/signup")
	public ResponseEntity<Member> signup(@ModelAttribute MemberModifySignDto memberDto,
			HttpServletRequest request) throws Exception {
		
		String savedName = null;
		if(memberDto.getMphoto() != null) {
			
//			UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
			UUID uuid = UUID.randomUUID();
//			이미지 파일 이름 저장(uuid + _ + 파일이름)
			savedName = uuid.toString() + "_" + memberDto.getMphoto().getOriginalFilename();
			
//			기본 파일 저장 장소
			String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
			String filePath = rootPath + "/timelineSNS";
			
//			파일 업로드 작업 수행
			File file = new File(filePath);
			
			if (!file.exists()) {
				try{
				    file.mkdir(); //폴더 없을 시 폴더 생성
				    System.out.println("폴더가 생성되었습니다.");
			        } 
			        catch(Exception e){
				    e.getStackTrace();
				}        
		         }else {
				System.out.println("이미 폴더가 생성되어 있습니다.");
			}
			
			File dest = new File(file + "/" + savedName);
			memberDto.getMphoto().transferTo(dest);
			System.out.println("폴더 경로: " + dest);
		}
		
		
		LocalDate mbirthDay = LocalDate.parse(memberDto.getMbirthday());
		
		UserDto userDto = UserDto.builder()
				.mid(memberDto.getMid())
				.mpwd(memberDto.getMpwd())
				.mnickname(memberDto.getMnickname())
				.mphoto(savedName)
				.mbirthday(mbirthDay)
				.mproduce(memberDto.getMproduce())
				.build();
		
		return ResponseEntity.ok(userService.signup(userDto));
	}
	
}
