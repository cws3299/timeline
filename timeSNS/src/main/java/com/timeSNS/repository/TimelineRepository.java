package com.timeSNS.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Timeline;

public interface TimelineRepository extends JpaRepository<Timeline, Long>{

	Page<Timeline> findByMidxAndTlpubynAndTldelyn(int midx, String tlpubyn, String tldelyn, Pageable pageable);
	int countByMidx(int midx);
	
}
