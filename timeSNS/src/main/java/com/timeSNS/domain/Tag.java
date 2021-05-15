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
@Table(name = "TAG")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TIDX")
	private Long tidx;
	
	@Column(name = "PTIDX")
	private int ptidx;
	
	@Column(name = "TCONTENT")
	private String tcontent;
	
}
