package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{
	
	@EntityGraph(attributePaths = "authorities")
	Optional<Member> findOneWithAuthoritiesByUsername(String mid);
	
}
