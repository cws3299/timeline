package com.timeSNS.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;


// JWT를 위한 커스텀 필터를 만드는 클래스
public class JwtFilter extends GenericFilterBean{

	private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
	
	public static final String AUTHORIZATION_HEADER = "Authrization";
	
	private TokenProvider tokenProvider;
	
	public JwtFilter(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	
//	GenericFilterBean의 doFilter를 override, 실제 필터링 로직은 doFilter 내부에 작성
//  doFilter 메소드는 토큰의 인증정보를 SecurityContext에 저장하는 역할 수행
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) 
		throws IOException, ServletException{
		
		HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
		String jwt = resolveToken(httpServletRequest);
		String requestURI = httpServletRequest.getRequestURI();
		
		if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
			Authentication authentication = tokenProvider.getAuthentication(jwt);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
		} else {
			logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
		}
		
		filterChain.doFilter(servletRequest, servletResponse);
	}
	
//	필터링을 하기 위해선 토큰 정보가 필요하기 때문에, Request Header에서 토큰 정보를 꺼내오기 위한 resolveToken 메소드 추가
	private String resolveToken(HttpServletRequest request) {
		//헤더에 AUTHORIZATION_HEADER(=Authrization)값을 키값으로 갖는 value값을 bearerToken 변수에 담는다
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
