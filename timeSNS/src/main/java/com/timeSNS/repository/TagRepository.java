package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long>{

	Optional<Tag> findByTcontent(String tag);
	
}
