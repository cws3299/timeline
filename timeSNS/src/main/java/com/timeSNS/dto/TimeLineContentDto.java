package com.timeSNS.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

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
public class TimeLineContentDto {

	private String tlcdate;
	
	private String tlcplace;
	
	private MultipartFile tlcimage;
	
	private String tlccontent;
	
	private String tlcemotion;
	
	private String tlcpubyn;
	
	private String tlctag;
	
}
