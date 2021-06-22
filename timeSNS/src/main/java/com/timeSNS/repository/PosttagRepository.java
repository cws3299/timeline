package com.timeSNS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.timeSNS.entity.Posttag;

public interface PosttagRepository extends JpaRepository<Posttag, Long>{

//	게시글 인덱스 번호 기준으로 태그 엔티티 리스트 받아오기
	List<Posttag> findByTlcidx(int tlcidx);
	
//	태그 인덱스 번호 기준으로 태그 엔티티 리스트 받아오기
	List<Posttag> findByTidx(int tidx);

//	페이징 처리를 위한 쿼리
	int countByTidx(int tidx);
	
//	게시글 인덱스 번호 기준으로 기존 연결 태그 삭제해주기
	@Transactional
	int deleteByTlcidx(int tlcidx);
	
}
