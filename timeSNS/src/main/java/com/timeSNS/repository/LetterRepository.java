package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Letter;

public interface LetterRepository extends JpaRepository<Letter, Long>{

}
