package com.timeSNS.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class MemberModifySignDto {
	
	private String mid;
	
	private String mpwd;
	
	private LocalDateTime mregdate;
	
	private MultipartFile mphoto;
	
	private String mnickname;
	
	private String mproduce;
	
	private LocalDate mbirthday;
	
}
