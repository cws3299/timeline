package com.timeSNS.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// TokenProvider와 JwtFilter를 SecurityConfig에 적용할 때 사용할 클래스
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity>{
// SecurityConfigurerAdapter를 extends하고 TokenProvider를 주입받아서 JwtFilter를 통해 Security 로직에 필터를 등록
	private TokenProvider tokenProvider;
	
//	TokenProvider를 주입받음
	public JwtSecurityConfig(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	
	@Override
	public void configure(HttpSecurity http) {
//		JwtFilter를 통해
		JwtFilter customFilter = new JwtFilter(tokenProvider);
//		Security 로직에 필터를 등록
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
