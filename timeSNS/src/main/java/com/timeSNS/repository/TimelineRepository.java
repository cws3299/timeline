package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Timeline;

public interface TimelineRepository extends JpaRepository<Timeline, Long>{

}
