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
public class EmotionCountDto {

	private int tlcidx;
	
	private int egoodyn;
	
	private int efightingyn;
	
	private int econgratulationyn;
	
	private int eexpectyn;
	
	private int esurpriseyn;
	
	private int esadyn;
	
	private int eniceyn;
	
}
