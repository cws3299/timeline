package com.timeSNS.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "STAYMEMORYREVIEW")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Staymemoryreview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SMRIDX")
	private Long smridx;
	
	@Column(name = "SMIDX")
	private int smidx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
	@Column(name = "SMRSTAYDATE")
	private LocalDateTime smrstaydate;
	
}
