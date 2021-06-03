package com.timeSNS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long>{

//	해당 태그와 정확히 일치하는 태그 찾아주기
	Optional<Tag> findByTcontent(String tag);
	
//	해당 태그를 like조건으로 검색해서 찾아주기
	List<Tag> findByTcontentContaining(String tag);
	
//	인덱스 번호를 기준으로 태그 찾아주기
	Optional<Tag> findByTidx(Long tidx);
	
}
