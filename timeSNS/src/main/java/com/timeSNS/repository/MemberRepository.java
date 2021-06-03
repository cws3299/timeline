package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{
	
	@EntityGraph(attributePaths = "authorities")
	Optional<Member> findOneWithAuthoritiesByUsername(String mid);
	
	Member findByUsername(String mid);
	
//	회원 검색 내역 페이징 처리를 위한 쿼리
	Page<Member> findByUsernameContainingOrMnicknameContainingAndMsecessionyn(String username, String nickname, String msecsssionyn, Pageable pageable);
	int countByUsernameContainingOrMnicknameContaining(String username, String nickname);
	
}
