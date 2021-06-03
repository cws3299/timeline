package com.timeSNS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Timecapsule;

public interface TimecapsuleRepository extends JpaRepository<Timecapsule, Long>{

	Page<Timecapsule> findByMidx(int midx, Pageable pageable);
	int countByMidx(int midx);
	
}
