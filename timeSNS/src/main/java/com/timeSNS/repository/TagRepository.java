package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Tag;

public interface TagRepository extends JpaRepository<Tag, Long>{

}
