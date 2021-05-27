package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Notememory;

public interface NotememoryRepository extends JpaRepository<Notememory, Long>{

	Optional<Notememory> findByNmidx(Long nmidx);
	
}
