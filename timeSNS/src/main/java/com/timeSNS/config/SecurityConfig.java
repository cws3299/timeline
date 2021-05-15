package com.timeSNS.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import com.timeSNS.jwt.JwtAccessDeniedHandler;
import com.timeSNS.jwt.JwtAuthenticationEntryPoint;
import com.timeSNS.jwt.JwtSecurityConfig;
import com.timeSNS.jwt.TokenProvider;

@EnableWebSecurity
// 기본적인 web 보안을 활성화하겠다는 의미
@EnableGlobalMethodSecurity(prePostEnabled = true)
// @PreAuthorize 어노테이션을 메소드 단위로 추가하기 위하여 적용
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	private final TokenProvider tokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	
	public SecurityConfig(
			TokenProvider tokenProvider,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
			JwtAccessDeniedHandler jwtAccessDeniedHandler
	) {
		
		this.tokenProvider = tokenProvider;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
			.csrf().disable()
			
			.exceptionHandling()
			.authenticationEntryPoint(jwtAuthenticationEntryPoint)
			.accessDeniedHandler(jwtAccessDeniedHandler)
			
//			h2-console을 위한 설정 추가
			.and()
			.headers()
			.frameOptions()
			.sameOrigin()
			
//			session을 사용하지 않기 때문에 세션 설정을 stateless로 설정
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			
//			로그인 api와 회원가입 api는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll() 설정
			.and()
			.authorizeRequests()
			.antMatchers("/test/login").permitAll()
			.antMatchers("/api/hello").permitAll()
			.antMatchers("/api/authenticate").permitAll()
			.antMatchers("/api/signup").permitAll()
			.antMatchers("/static/**").permitAll()
			.anyRequest().authenticated()
			
			.and()
			.apply(new JwtSecurityConfig(tokenProvider));
	}
	
	
	//h2-console 하위 모든 요청들과 파비콘 관련 요청은 Spring Security 로직을 수행하지 않도록 configure 메소드 오버라이드해 내용 추가
	@Override
	public void configure(WebSecurity web){
		web
			.ignoring()
			.antMatchers("/h2-console/**" // /h2-console 하위 모든 요청
						,"/favicon.ico" // 파비콘 요청
			);
//			/h2-console/ 하위 모든 요청과 파비콘 요청은 모두 무시하는 것으로 설정
	}
	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception{
//		http
//			.authorizeRequests()
////			HttpServletRequest를 이용하는 요청들에 대한 접근 제한을 설정하겠다는 의미
//			.antMatchers("/api/hello").permitAll()
////			"/api/hello"에 대한 요청은 인증없이 접근을 허용하겠다
//			.anyRequest().authenticated();
////			나머지 요청들에 대해서는 모두 인증되어야 한다
//	}
//	
}
