package com.timeSNS;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.timeSNS.dto.TimeLineMemberDto;
import com.timeSNS.entity.Member;
import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.TimelineRepository;

@SpringBootTest
class TimeSnsApplicationTests {

	@Test
	void contextLoads() {
		
		TimelineRepository timelineRepository = null;
		Page<Timeline> tlPage = timelineRepository.findByMidxAndTldelyn(2, "Y", PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "tlregdate")));
		
		List<Timeline> tlList_ = tlPage.getContent();
		List<TimeLineMemberDto> tlList = new ArrayList<>();
		
		
		for(int i = 0 ; i < tlList_.size() ; i++) {
			
			TimeLineMemberDto tlmDto = TimeLineMemberDto.builder()
					.tlidx(tlList_.get(i).getTlidx())
					.midx(tlList_.get(i).getMidx())
					.tltitle(tlList_.get(i).getTltitle())
					.tlcategory(tlList_.get(i).getTlcategory())
					.tlintroduce(tlList_.get(i).getTlintroduce())
					.tlregdate(tlList_.get(i).getTlregdate())
					.tlpubyn(tlList_.get(i).getTlpubyn())
					.tldelyn(tlList_.get(i).getTlpubyn())
					.build();
			
			tlList.add(tlmDto);
			
			System.out.println("tlmDto: " + tlmDto.getTlidx());
		}
		
	}

}
