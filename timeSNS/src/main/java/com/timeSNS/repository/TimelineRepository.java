package com.timeSNS.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Timeline;

public interface TimelineRepository extends JpaRepository<Timeline, Long>{

//	페이징 처리를 위한 쿼리
	Page<Timeline> findByMidxAndTlpubynAndTldelyn(int midx, String tlpubyn, String tldelyn, Pageable pageable);
	int countByMidx(int midx);
	
//	검색 내역 페이징 처리를 위한 쿼리
	Page<Timeline> findByTltitleContainingAndTlpubynAndTldelyn(String tltitle, String tlpubyn, String tldelyn, Pageable pageable);
	
}
