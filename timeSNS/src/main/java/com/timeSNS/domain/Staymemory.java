package com.timeSNS.domain;

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
@Table(name = "STAYMEMORY")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Staymemory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SMIDX")
	private Long smidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
}
