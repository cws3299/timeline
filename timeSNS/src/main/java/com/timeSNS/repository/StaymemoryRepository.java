package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Staymemory;

public interface StaymemoryRepository extends JpaRepository<Staymemory, Long>{

	Long countByTlcidx(Long tlcidx);
	Optional<Staymemory> findByTlcidx(Long tlcidx);

}
