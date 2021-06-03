package com.timeSNS.entity;

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
@Table(name = "POSTTAG")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Posttag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PTIDX")
	private Long ptidx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
	@Column(name = "TIDX")
	private int tidx;
	
}
