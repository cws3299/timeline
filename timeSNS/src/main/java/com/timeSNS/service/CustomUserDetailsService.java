package com.timeSNS.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.timeSNS.entity.Member;
import com.timeSNS.repository.MemberRepository;

// Spring Security에서 중요한 부분 중 하나인 UserDetailService를 커스텀 구현한 클래스
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService{
//	UserDetailsService를 implements
	private final MemberRepository memberRepository;
//	implements한 뒤, UserRepository를 주입받음
	public CustomUserDetailsService(MemberRepository userRepository) {
		this.memberRepository = userRepository;
	}
	
	@Override
	@Transactional
//	loadUserByUsername 메소드를 오버라이드
	public UserDetails loadUserByUsername(final String mid) {
		
		return memberRepository.findOneWithAuthoritiesByUsername(mid)
				.map(user -> createUser(mid, user))
				.orElseThrow(() -> new UsernameNotFoundException(mid + " -> 데이터베이스에서 찾을 수 없습니다."));
		
//		로그인 시에 DB에서 유저 정보와 권한 정보를 가져오게 됨.
		
	}
	
	private org.springframework.security.core.userdetails.User createUser(String username, Member member){
		if(!member.isActivated()) {
			throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
		}
		List<GrantedAuthority> grantedAuthorities = member.getAuthorities().stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
				.collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(member.getUsername(), 
				member.getMpwd(), 
				grantedAuthorities);

//		위에서 가져온 정보를 기반으로 userdetails.User 객체를 생성해서 리턴
		
	}
}
