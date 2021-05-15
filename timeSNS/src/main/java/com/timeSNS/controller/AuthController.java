package com.timeSNS.controller;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.domain.Member;
import com.timeSNS.domain.TokenDto;
import com.timeSNS.jwt.JwtFilter;
import com.timeSNS.jwt.TokenProvider;

@RestController
@RequestMapping("/api")
public class AuthController {

	private final TokenProvider tokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	
//	AuthController는 TokenProvider, AuthenticationManagerBuilder를 주입받음
	public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
		this.tokenProvider = tokenProvider;
		this.authenticationManagerBuilder = authenticationManagerBuilder;
	}
	
//	로그인 경로는 '/api/authenticate'이고 Post요청을 받음
	@PostMapping(path = "/authenticate")
	public ResponseEntity<TokenDto> authorize(@Valid @RequestBody String username, @Valid @RequestBody String password) {
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
	
}
