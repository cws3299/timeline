package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{

}
