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
	Optional<Timelinecontent> findTop1ByTlidxOrderByTlcregdateDesc(int tlidx);
	
//	메인 피드 내용 가져오기
	@Query(value = 
			"SELECT TIMELINECONTENT.TLCIDX, TIMELINECONTENT.TLIDX, TIMELINECONTENT.MIDX, TIMELINECONTENT.TLCREGDATE, "
			+ "TIMELINECONTENT.TLCDATE, TIMELINECONTENT.TLCPLACE, TIMELINECONTENT.TLCIMAGE, TIMELINECONTENT.TLCCONTENT, "
			+ "TIMELINECONTENT.TLCEMOTION, TIMELINECONTENT.TLCPUBYN, TIMELINECONTENT.TLCDELYN, TIMELINECONTENT.TLCTAG "
			+ "FROM TIMELINECONTENT "
			+ "JOIN FOLLOW "
			+ "ON TIMELINECONTENT.TLIDX = FOLLOW.TLIDX "
			+ "WHERE FOLLOW.FLWRMIDX = ?1 "
			+ "AND TIMELINECONTENT.TLCDELYN = 'N' "
			+ "AND TIMELINECONTENT.TLCPUBYN  = 'Y' "
			+ "ORDER BY TIMELINECONTENT.TLCREGDATE DESC", 
			countQuery =
			"SELECT COUNT(*) "
			+ "FROM TIMELINECONTENT "
			+ "JOIN FOLLOW "
			+ "ON TIMELINECONTENT.TLIDX = FOLLOW.TLIDX "
			+ "WHERE FOLLOW.FLWRMIDX = 2 "
			+ "AND TIMELINECONTENT.TLCDELYN = 'N' "
			+ "AND TIMELINECONTENT.TLCPUBYN  = 'Y'",
			nativeQuery = true)
	Page<Timelinecontent> findByTlidx(int midx, Pageable pageable);
	
}
