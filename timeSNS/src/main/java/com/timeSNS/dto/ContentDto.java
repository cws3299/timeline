package com.timeSNS.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.timeSNS.entity.Timelinecontent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public interface ContentDto {

	Long getTlcidx();
	
	int getTlidx();
	
	int getMidx();
	
	String getMid();
	
	String getMnickname();
	
	String getMphoto();
	
	LocalDateTime getTlcregdate();
	
	LocalDate getTlcdate();

	String getTlcplace();
	
	String getTlcimage();
	
	String getTlccontent();
	
	String getTlcemotion();
	
	String getTlcpubyn();
	
	String getTlcdelyn();
	
	String getTlctag();
	
}
