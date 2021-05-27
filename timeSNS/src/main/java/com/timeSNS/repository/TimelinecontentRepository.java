package com.timeSNS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timelinecontent;

public interface TimelinecontentRepository extends JpaRepository<Timelinecontent, Long>{
	
}
