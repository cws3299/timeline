package com.timeSNS.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class TimeLineMemberDto {

	private Long tlidx;
	
	private int midx;
	
	private String mid;
	
	private String mnickname;
	
	private String mphoto;
	
	private String tltitle;
	
	private String tlcategory;
	
	private String tlintroduce;
	
	private LocalDateTime tlregdate;
	
	private String tlpubyn;
	
	private String tldelyn;
	
}
