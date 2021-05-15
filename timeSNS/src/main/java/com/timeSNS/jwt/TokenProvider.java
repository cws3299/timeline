package com.timeSNS.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider implements InitializingBean{
//	InitializingBean을 implements하고, afterPropertiesSet을 Override한 이유
//	Bean이 생성이 되고,TokenProvider를 통해 주입을 받은 후에 주입받은 secret값을 Base64 Decode해서 key변수에 할당하기 위함
	private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
	
	private static final String AUTHORITIES_KEY = "auth";
	
	private final String secret;
	private final long tokenValidityInMilliseconds;
	
	private Key key;
	
	public TokenProvider(
			@Value("${jwt.secret}") String secret, 
			@Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
		this.secret = secret;
		this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
		
	}
	
	@Override
	public void afterPropertiesSet() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}
	
//	Authentication 객체의 권한정보를 이용해서 토큰을 생성하는 createToken 메소드
	public String createToken(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));
		
		long now = (new Date()).getTime();
		Date validity = new Date(now + this.tokenValidityInMilliseconds);
//											application.yml에서 설정했던 만료시간 설정
		
		return Jwts.builder()
				.setSubject(authentication.getName())
				.claim(AUTHORITIES_KEY, authorities)
				.signWith(key, SignatureAlgorithm.HS512)
				.setExpiration(validity)
				.compact();
//				토큰 생성
	}
	
//	Token을 파라미터로 받아서 token에 담겨있는 정보를 이용해 Authentication 객체를 리턴하는 메소드
	public Authentication getAuthentication(String token) {
//		파마리터로 받은 토큰을 이용해 claims 생성
		Claims claims = Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
		
//		claims에서 권한 정보를 빼내는 과정
		Collection<? extends GrantedAuthority> authorities = 
				Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());
		
//		entity 패키지에 생성한 User entity가 아니라 org.springframework.security.core.userdetails.User
//		토큰을 이용해 만든 claims에서 빼낸 권한 정보를 통해 User 객체 생성
		User principal = new User(claims.getSubject(), "", authorities);
		
//		최종적으로 Authentication 객체를 리턴
		return new UsernamePasswordAuthenticationToken(principal, token, authorities);
//														유저객체, 토큰, 권한정보		
	}
	
//	토큰의 유효성 검사를 수행하는 validateToken 메소드
	public boolean validateToken (String token) {
//	토큰을 파라미터로 받아서 발생하는 익셉션들을 캐치, 문제가 있으면 false, 문제가 없으면 true
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			logger.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			logger.info("만료된 JWT 서명입니다.");
		} catch (UnsupportedJwtException e) {
			logger.info("지원되지 않는 JWT 서명입니다.");
		} catch (IllegalArgumentException e) {
			logger.info("JWT 토큰이 잘못되었습니다.");
		}
		return false;
	}
}
