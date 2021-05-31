package com.timeSNS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timelinecontent;

public interface TimelinecontentRepository extends JpaRepository<Timelinecontent, Long>{
	
//	페이징 처리를 위한 쿼리
	Page<Timelinecontent> findByTlidxAndTlcpubynAndTlcdelyn(int tlidx, String tlcpubyn, String tlcdelyn, Pageable pageable);
	int countByTlidx(int tlidx);
	
//	검색 내역 페이징 처리를 위한 쿼리
	Page<Timelinecontent> findByTlccontentContainingAndTlcpubynAndTlcdelyn(String content, String tlcpubyn, String tlcdelyn, Pageable pageable);
	
//	가장 최근에 등록한 게시글 가져오기
	@Query("SELECT * FROM TIMELINECONTENT ORDER BY TLCREGDATE DESC LIMIT 1")
	Optional<Timelinecontent> findByTlcidxMax();
}
