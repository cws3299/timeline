package com.timeSNS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Posttag;

public interface PosttagRepository extends JpaRepository<Posttag, Long>{

	List<Posttag> findByTlcidx(int tlcidx);
	
}
