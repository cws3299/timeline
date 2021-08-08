package com.timeSNS.dto;

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
public class MemberSearchDto {

	private int midx;
	
	private String mid;
	
	private String mnickname;
	
	private String mphoto;
	
	private String mproduce;
	
}
