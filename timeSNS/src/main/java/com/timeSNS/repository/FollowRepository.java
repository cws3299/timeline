package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long>{

}
