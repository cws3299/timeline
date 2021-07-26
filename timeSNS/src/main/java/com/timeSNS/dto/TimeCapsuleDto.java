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
public class TimeCapsuleDto {

	private Long tcidx;
	
	private int midx;
	
	private String tcterm;
	
	private String tctitle;
	
	private String tccontent;
	
	private String tcimage;
	
	private String tcthink;
	
	private String tccheckyn;
	
	private String tcfeedback;
	
	private String tcregdate;
	
}
