package com.timeSNS.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

	private Long tlcidx;
	
	private int tlidx;
	
	private int midx;
	
	private String mid;
	
	private String mnickname;
	
	private String mphoto;
	
	private LocalDateTime tlcregdate;
	
	private LocalDate tlcdate;
	
	private String tlcplace;
	
	private String tlcimage;
	
	private String tlccontent;
	
	private String tlcemotion;
	
	private String tlcpubyn;
	
	private String tlcdelyn;
	
	private EmotionCountDto emotioncountdto;
	
	private List<String> tag;
	
}
