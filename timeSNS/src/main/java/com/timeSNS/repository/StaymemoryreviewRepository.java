package com.timeSNS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Staymemoryreview;

public interface StaymemoryreviewRepository extends JpaRepository<Staymemoryreview, Long>{

	List<Staymemoryreview> findByTlcidxOrderBySmrstaydateDesc(int tlcidx);
	
}
